# FIFA World Cup 2026 — Interactive MatchCenter

A fully static, interactive dashboard for the FIFA World Cup 2026 (Canada, Mexico & USA). Built for GitHub Pages with an optional Supabase backend for the Fantasy Game feature.

## Live Demo

Deploy to GitHub Pages and open `index.html`.

## Features

### 1. Scores & Fixtures
- All **104 matches** — 72 group stage + 32 knockout (Round of 32 → Final)
- **Live scores** from Football-Data.org API — auto-refreshes every 60 seconds
- Read-only scoreboard with LIVE / FT / SCHEDULED status badges
- Filter by stage, group, or search by team name

### 2. Team Players of Each Country
- All **48 qualified nations** with projected core squads (8 key players each)
- Dropdown selector or browse all teams in a responsive grid
- Filter teams by group

### 3. Match Venues
- All **16 host stadiums** across USA, Mexico, and Canada
- City and country info per venue
- One-click Google Maps link for each stadium
- Match count per venue

### 4. Live Standings
- Fetched from Football-Data.org API (official group tables)
- Falls back to local calculation from match scores
- Sorted by points → goal difference → goals for
- Updates every 60 seconds during live matches

### 5. Knockout Bracket Visualization
- Visual 5-column bracket: R32 → R16 → QF → SF → Final
- Team names and scores update from API as knockout rounds progress
- Horizontally scrollable on mobile

### 6. Top 10 Tweets Per Match
- In-page social buzz list (10 curated fan-pulse items per fixture)
- Direct link to **X (Twitter) live search** for each match — opens real-time conversation

### 7. ⚽ Fantasy World Cup (NEW)
- **Classic fantasy game**: Build a 15-player squad within a $100M budget
- Squad rules: 2 GK, 5 DEF, 5 MID, 3 FWD — max 3 from same country
- Points system: Goals, Assists, Clean Sheets, Cards, MOTM
- **Supabase backend**: User auth (email/password), real-time leaderboard, persistent squads
- **Offline mode**: Works with localStorage if Supabase isn't configured
- Star players priced higher (Messi $12.5M, Mbappé $12M, Haaland $11.5M, etc.)

### 8. Local Storage Persistence
- All scores, statuses, and match states auto-save to browser localStorage
- Revisit or refresh without losing data

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Semantic HTML5 |
| Styling | Vanilla CSS3 (custom properties, grid, flexbox) |
| Logic | Vanilla JavaScript (ES6+, no frameworks) || Live Data | Football-Data.org API (free tier) || Backend | Supabase (PostgreSQL + Auth + RLS) |
| Fonts | Google Fonts — Bebas Neue + Space Grotesk |
| Hosting | GitHub Pages (static) |

## File Structure

```
fifa-2026/
├── index.html          # Main page structure
├── styles.css          # All styles (light theme)
├── script.js           # Core data, rendering, interactivity
├── fantasy.js          # Fantasy game logic + Supabase integration
├── supabase-setup.sql  # Database schema (run in Supabase SQL editor)
├── .nojekyll           # Prevents Jekyll processing on GitHub Pages
└── README.md           # This file
```

## Football-Data.org API Setup (Live Scores)

The site uses [Football-Data.org](https://www.football-data.org/) for real-time match scores, standings, and bracket updates.

1. Register for a free API key at [football-data.org/client/register](https://www.football-data.org/client/register)
2. Open `script.js` and paste your key at the top:
   ```js
   const FOOTBALL_DATA_API_KEY = "your-api-key-here";
   ```
3. Deploy — scores, standings, and bracket will auto-update every 60 seconds

**Free tier limits**: 10 requests/minute. The site uses ~1 req/min (matches + standings).

**Without an API key**: All matches display as SCHEDULED with no scores. Add your key to activate live data.

## Supabase Setup (for Fantasy Game)

The Fantasy tab works in **offline mode** (localStorage) by default. To enable multiplayer with auth and leaderboard:

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **SQL Editor** and run the contents of `supabase-setup.sql`
4. Go to **Settings → API** and copy:
   - Project URL (e.g., `https://abcdefg.supabase.co`)
   - `anon` public key
5. Edit `fantasy.js` and replace the placeholder values:
   ```js
   const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
   const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";
   ```
6. Go to **Authentication → Settings** and enable Email provider
7. Deploy — users can now sign up and compete!

### Awarding Points (Admin)

After each matchday, insert rows into the `player_points` table via the Supabase dashboard or API:

```sql
INSERT INTO player_points (player_name, team, matchday, appearance, goals, assists, clean_sheet, yellow_cards, red_cards, motm, total_points)
VALUES ('Kylian Mbappe', 'France', 1, 1, 2, 1, 0, 0, 0, 1, 16);
-- total_points = 1(app) + 2×4(fwd goals) + 1×3(assist) + 1×3(motm) = 15
```

## Deployment on GitHub Pages

1. Create a new GitHub repository
2. Push the contents of this folder to the repo root (or a `docs/` folder)
3. Go to **Settings → Pages**
4. Select branch and folder, then Save
5. Your site will be live at `https://<username>.github.io/<repo-name>/`

## Data Sources

- **Live scores, standings, bracket**: [Football-Data.org](https://www.football-data.org/) REST API (v4)
- **Match schedule, groups, venues**: Official FIFA website:  
  https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/match-schedule-fixtures-results-teams-stadiums
- **Player lists**: Projected core squads — update once official final squads are announced

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). Uses ES6 features and CSS Grid.

## License

For personal/fan use. FIFA World Cup is a trademark of FIFA. This project is not affiliated with or endorsed by FIFA.
