-- ═══════════════════════════════════════════════════════════════
-- FIFA 2026 Fantasy Game — Supabase Database Setup
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ═══════════════════════════════════════════════════════════════

-- 1. PROFILES (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT NOT NULL DEFAULT 'Manager',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. FANTASY SQUADS (each user's selected players)
CREATE TABLE IF NOT EXISTS fantasy_squads (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  player_name TEXT NOT NULL,
  team TEXT NOT NULL,
  position TEXT NOT NULL CHECK (position IN ('GK','DEF','MID','FWD')),
  price NUMERIC(4,1) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, player_name, team)
);

-- 3. PLAYER POINTS (admin-populated after each matchday)
CREATE TABLE IF NOT EXISTS player_points (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  player_name TEXT NOT NULL,
  team TEXT NOT NULL,
  matchday INT NOT NULL,
  appearance INT DEFAULT 0,
  goals INT DEFAULT 0,
  assists INT DEFAULT 0,
  clean_sheet INT DEFAULT 0,
  yellow_cards INT DEFAULT 0,
  red_cards INT DEFAULT 0,
  motm INT DEFAULT 0,
  total_points INT DEFAULT 0,
  UNIQUE(player_name, team, matchday)
);

-- 4. LEADERBOARD (aggregated scores per user)
CREATE TABLE IF NOT EXISTS leaderboard (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  total_points INT DEFAULT 0,
  squad_count INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE fantasy_squads ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- PROFILES: users can read all profiles, update only their own
CREATE POLICY "Profiles: anyone can read" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Profiles: users can insert own" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Profiles: users can update own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- FANTASY_SQUADS: users can CRUD their own, read all for leaderboard calc
CREATE POLICY "Squads: users can read own" ON fantasy_squads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Squads: users can insert own" ON fantasy_squads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Squads: users can delete own" ON fantasy_squads
  FOR DELETE USING (auth.uid() = user_id);

-- PLAYER_POINTS: anyone can read (public data), only service_role can write
CREATE POLICY "Points: anyone can read" ON player_points
  FOR SELECT USING (true);

-- LEADERBOARD: anyone can read, users can upsert their own entry
CREATE POLICY "Leaderboard: anyone can read" ON leaderboard
  FOR SELECT USING (true);

CREATE POLICY "Leaderboard: users can insert own" ON leaderboard
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Leaderboard: users can update own" ON leaderboard
  FOR UPDATE USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════════
-- INDEXES
-- ═══════════════════════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_squads_user ON fantasy_squads(user_id);
CREATE INDEX IF NOT EXISTS idx_points_player ON player_points(player_name, team);
CREATE INDEX IF NOT EXISTS idx_leaderboard_points ON leaderboard(total_points DESC);

-- ═══════════════════════════════════════════════════════════════
-- OPTIONAL: Function to recalculate a user's total points
-- Call via: SELECT recalculate_user_points('user-uuid-here');
-- ═══════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION recalculate_user_points(p_user_id UUID)
RETURNS INT AS $$
DECLARE
  pts INT := 0;
BEGIN
  SELECT COALESCE(SUM(pp.total_points), 0) INTO pts
  FROM fantasy_squads fs
  JOIN player_points pp ON pp.player_name = fs.player_name AND pp.team = fs.team
  WHERE fs.user_id = p_user_id;

  UPDATE leaderboard
  SET total_points = pts, updated_at = NOW()
  WHERE user_id = p_user_id;

  RETURN pts;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
