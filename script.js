/* ===== FOOTBALL-DATA.ORG API CONFIG ===== */
// Get your free API key at https://www.football-data.org/client/register
const FOOTBALL_DATA_API_KEY = ""; // Paste your key here
const FOOTBALL_DATA_BASE = "https://api.football-data.org/v4";
const WC_COMPETITION_CODE = "WC"; // FIFA World Cup

/* ===== FLAG IMAGE MAP (ISO codes for flagcdn.com) ===== */
const countryFlags = {
  "Mexico": "mx", "South Africa": "za", "Korea Republic": "kr",
  "Czechia": "cz", "Canada": "ca", "Bosnia and Herzegovina": "ba",
  "Qatar": "qa", "Switzerland": "ch", "Haiti": "ht",
  "Scotland": "gb-sct", "Brazil": "br", "Morocco": "ma",
  "USA": "us", "Paraguay": "py", "Australia": "au",
  "Turkiye": "tr", "Cote d'Ivoire": "ci", "Ecuador": "ec",
  "Germany": "de", "Curacao": "cw", "Netherlands": "nl",
  "Japan": "jp", "Sweden": "se", "Tunisia": "tn",
  "Belgium": "be", "Egypt": "eg", "IR Iran": "ir",
  "New Zealand": "nz", "Saudi Arabia": "sa", "Uruguay": "uy",
  "Spain": "es", "Cabo Verde": "cv", "France": "fr",
  "Senegal": "sn", "Iraq": "iq", "Norway": "no",
  "Argentina": "ar", "Algeria": "dz", "Austria": "at",
  "Jordan": "jo", "Portugal": "pt", "Congo DR": "cd",
  "Uzbekistan": "uz", "Colombia": "co", "England": "gb-eng",
  "Croatia": "hr", "Ghana": "gh", "Panama": "pa"
};

function flag(team) {
  const code = countryFlags[team];
  if (!code) return "";
  return `<img class="flag" src="https://flagcdn.com/24x18/${code}.png" alt="${team}" width="24" height="18" loading="lazy" />`;
}

const groups = {
  A: ["Mexico", "South Africa", "Korea Republic", "Czechia"],
  B: ["Canada", "Bosnia and Herzegovina", "Qatar", "Switzerland"],
  C: ["Haiti", "Scotland", "Brazil", "Morocco"],
  D: ["USA", "Paraguay", "Australia", "Turkiye"],
  E: ["Cote d'Ivoire", "Ecuador", "Germany", "Curacao"],
  F: ["Netherlands", "Japan", "Sweden", "Tunisia"],
  G: ["Belgium", "Egypt", "IR Iran", "New Zealand"],
  H: ["Saudi Arabia", "Uruguay", "Spain", "Cabo Verde"],
  I: ["France", "Senegal", "Iraq", "Norway"],
  J: ["Argentina", "Algeria", "Austria", "Jordan"],
  K: ["Portugal", "Congo DR", "Uzbekistan", "Colombia"],
  L: ["England", "Croatia", "Ghana", "Panama"]
};

const teamPlayers = {
  "Mexico": ["Guillermo Ochoa", "Luis Malagon", "Carlos Acevedo", "Jorge Sanchez", "Johan Vasquez", "Cesar Montes", "Jesus Gallardo", "Kevin Alvarez", "Gerardo Arteaga", "Edson Alvarez", "Luis Chavez", "Luis Romo", "Orbelin Pineda", "Carlos Rodriguez", "Erick Sanchez", "Roberto Alvarado", "Diego Lainez", "Cesar Huerta", "Hirving Lozano", "Santiago Gimenez", "Raul Jimenez", "Henry Martin", "Alexis Vega", "Julian Quinones", "Uriel Antuna", "Guillermo Martinez"],
  "South Africa": ["Ronwen Williams", "Veli Mothwa", "Bruce Bvuma", "Siyanda Xulu", "Grant Kekana", "Nkosinathi Sibisi", "Khuliso Mudau", "Aubrey Modiba", "Terrence Mashego", "Mothobi Mvala", "Teboho Mokoena", "Sphephelo Sithole", "Bathusi Aubaas", "Thapelo Morena", "Luke Le Roux", "Sipho Mbule", "Themba Zwane", "Percy Tau", "Lyle Foster", "Iqraam Rayners", "Elias Mokwana", "Oswin Appollis", "Patrick Maswanganyi", "Tshegofatso Mabasa", "Relebohile Mofokeng", "Evidence Makgopa"],
  "Korea Republic": ["Kim Seung-gyu", "Jo Hyeon-woo", "Song Bum-keun", "Kim Min-jae", "Kim Young-gwon", "Kim Jin-su", "Cho Yu-min", "Park Ji-su", "Lee Ki-je", "Hwang In-beom", "Lee Jae-sung", "Jung Woo-young", "Lee Kang-in", "Paik Seung-ho", "Kwon Chang-hoon", "Park Yong-woo", "Na Sang-ho", "Son Heung-min", "Hwang Hee-chan", "Cho Gue-sung", "Oh Hyeon-gyu", "Joo Min-kyu", "Song Min-kyu", "Lee Dong-gyeong", "Jeong Sang-bin", "Hwang Ui-jo"],
  "Czechia": ["Jindrich Stanek", "Vitezslav Jaros", "Matej Kovar", "Vladimir Coufal", "Ladislav Krejci", "Robin Hranac", "David Zima", "Martin Vitik", "Tomas Holes", "Tomas Soucek", "Antonin Barak", "Vaclav Cerny", "Alex Kral", "Lukáš Provod", "David Jurásek", "Pavel Sulc", "Ondrej Lingr", "Jan Kuchta", "Adam Hlozek", "Patrik Schick", "Mojmir Chytil", "Tomas Chory", "Matej Jurasek", "Adam Vlkanova", "Jan Sykora", "Filip Novák"],
  "Canada": ["Milan Borjan", "Maxime Crepeau", "Dayne St. Clair", "Alistair Johnston", "Kamal Miller", "Moise Bombito", "Derek Cornelius", "Sam Adekugbe", "Richie Laryea", "Alphonso Davies", "Stephen Eustaquio", "Ismael Kone", "Mark-Anthony Kaye", "Samuel Piette", "Liam Fraser", "Ali Ahmed", "Tajon Buchanan", "Jonathan David", "Cyle Larin", "Jonathan Osorio", "Liam Millar", "Junior Hoilett", "Theo Corbeanu", "Jacen Russell-Rowe", "Tani Oluwaseyi", "Jacob Shaffelburg"],
  "Bosnia and Herzegovina": ["Ibrahim Sehic", "Nikola Vasilj", "Kenan Piric", "Anel Ahmedhodzic", "Amar Dedic", "Sead Kolasinac", "Dennis Hadzikadunic", "Eldar Civic", "Ermin Bicakcic", "Rade Krunic", "Haris Hajradinovic", "Ivan Basic", "Benjamin Tahirovic", "Armin Gigovic", "Stjepan Loncar", "Smail Prevljak", "Edin Dzeko", "Ermedin Demirovic", "Luka Menalo", "Denis Huseinbasic", "Edin Visca", "Amer Gojak", "Kenan Kodro", "Antonio Zlomislic", "Dino Besirovic", "Amar Rahmanovic"],
  "Qatar": ["Saad Al Sheeb", "Meshaal Barsham", "Yousuf Hassan", "Bassam Al Rawi", "Pedro Miguel", "Tarek Salman", "Homam Ahmed", "Musaab Khidir", "Jassem Gaber", "Assim Madibo", "Karim Boudiaf", "Abdulaziz Hatem", "Mohammed Waad", "Sultan Al Brake", "Ismaeel Mohammad", "Hasan Al Haydos", "Akram Afif", "Almoez Ali", "Ahmed Al Rawi", "Yusuf Abdurisag", "Naif Al Hadhrami", "Khalid Muneer", "Abdullah Al-Ahrak", "Ali Asad", "Hashim Ali", "Mubarak Shannan"],
  "Switzerland": ["Yann Sommer", "Gregor Kobel", "Yvon Mvogo", "Manuel Akanji", "Nico Elvedi", "Ricardo Rodriguez", "Fabian Schar", "Silvan Widmer", "Ulisses Garcia", "Leonidas Stergiou", "Granit Xhaka", "Remo Freuler", "Denis Zakaria", "Xherdan Shaqiri", "Djibril Sow", "Fabian Rieder", "Michel Aebischer", "Vincent Sierro", "Dan Ndoye", "Breel Embolo", "Noah Okafor", "Ruben Vargas", "Zeki Amdouni", "Renato Steffen", "Andi Zeqiri", "Joel Monteiro"],
  "Haiti": ["Alexandre Pierre", "Josue Duverger", "Remingson Beaubrun", "Ricardo Ade", "Carlens Arcus", "Alex Junior Christian", "Stephane Lambese", "Makenley Brennan", "Frantzdy Pierrot", "Duckens Nazon", "Derrick Etienne Jr", "Danley Jean Jacques", "Leverton Pierre", "Richecarde Charles", "Djimy Alexis", "Christiano Francois", "Bryan Alceus", "Kevin Lafrance", "Fafa Picault", "Wilde-Donald Guerrier", "Mechak Jerome", "Steeven Saba", "Jean-Ricner Bellegarde", "Harold Cozier", "Jonel Desire", "Obed Vargas"],
  "Scotland": ["Angus Gunn", "Craig Gordon", "Zander Clark", "Andrew Robertson", "Kieran Tierney", "Scott McKenna", "Grant Hanley", "Jack Hendry", "Anthony Ralston", "Greg Taylor", "Aaron Hickey", "John McGinn", "Scott McTominay", "Billy Gilmour", "Callum McGregor", "Ryan Christie", "Kenny McLean", "Stuart Armstrong", "James Forrest", "Che Adams", "Lyndon Dykes", "Lawrence Shankland", "Ryan Fraser", "Lewis Morgan", "Ben Doak", "Tommy Conway"],
  "Brazil": ["Alisson", "Ederson", "Bento", "Marquinhos", "Eder Militao", "Gabriel Magalhaes", "Danilo", "Alex Telles", "Wendell", "Yan Couto", "Bruno Guimaraes", "Lucas Paqueta", "Casemiro", "Andre", "Gerson", "Andreas Pereira", "Joao Gomes", "Vinicius Junior", "Rodrygo", "Raphinha", "Endrick", "Savinho", "Gabriel Martinelli", "Luiz Henrique", "Igor Jesus", "Estevao"],
  "Morocco": ["Yassine Bounou", "Munir El Kajoui", "Anas Zniti", "Achraf Hakimi", "Noussair Mazraoui", "Romain Saiss", "Nayef Aguerd", "Jawad El Yamiq", "Adam Masina", "Achraf Dari", "Sofyan Amrabat", "Azzedine Ounahi", "Ilias Chair", "Bilal El Khannouss", "Abdelhamid Sabiri", "Selim Amallah", "Oussama Tannane", "Hakim Ziyech", "Youssef En-Nesyri", "Abde Ezzalzouli", "Brahim Diaz", "Ayoub El Kaabi", "Sofiane Boufal", "Zakaria Aboukhlal", "Amine Harit", "Eliesse Ben Seghir"],
  "USA": ["Matt Turner", "Ethan Horvath", "Patrick Schulte", "Antonee Robinson", "Sergino Dest", "Chris Richards", "Tim Ream", "Mark McKenzie", "Miles Robinson", "Joe Scally", "Tyler Adams", "Weston McKennie", "Yunus Musah", "Johnny Cardoso", "Gio Reyna", "Luca de la Torre", "Aidan Morris", "Malik Tillman", "Christian Pulisic", "Folarin Balogun", "Timothy Weah", "Brenden Aaronson", "Josh Sargent", "Haji Wright", "Ricardo Pepi", "Cade Cowell"],
  "Paraguay": ["Carlos Coronel", "Alfaro Herrera", "Antony Silva", "Gustavo Gomez", "Junior Alonso", "Fabián Balbuena", "Omar Alderete", "Robert Rojas", "Blas Riveros", "Juan Escobar", "Andres Cubas", "Mathias Villasanti", "Diego Gomez", "Matias Rojas", "Oscar Romero", "Richard Sanchez", "Hernan Perez", "Ivan Ramirez", "Miguel Almiron", "Julio Enciso", "Antonio Sanabria", "Adam Bareiro", "Ramon Sosa", "Derlis Gonzalez", "Alex Arce", "Isidro Pitta"],
  "Australia": ["Mat Ryan", "Andrew Redmayne", "Joe Gauci", "Harry Souttar", "Milos Degenek", "Kye Rowles", "Aziz Behich", "Nathaniel Atkinson", "Lewis Miller", "Joel King", "Jackson Irvine", "Ajdin Hrustic", "Aaron Mooy", "Connor Metcalfe", "Keanu Baccus", "Cameron Devlin", "Aiden O'Neill", "Riley McGree", "Craig Goodwin", "Mathew Leckie", "Martin Boyle", "Jamie Maclaren", "Mitchell Duke", "Awer Mabil", "Kusini Yengi", "Nestory Irankunda"],
  "Turkiye": ["Mert Gunok", "Altay Bayindir", "Ugurcan Cakir", "Ferdi Kadioglu", "Caglar Soyuncu", "Merih Demiral", "Samet Akaydin", "Abdulkerim Bardakci", "Zeki Celik", "Ridvan Yilmaz", "Hakan Calhanoglu", "Orkun Kokcu", "Salih Ozcan", "Kaan Ayhan", "Ismail Yuksek", "Okay Yokuslu", "Arda Guler", "Kenan Yildiz", "Baris Alper Yilmaz", "Yusuf Yazici", "Irfan Can Kahveci", "Yunus Akgun", "Oguz Aydin", "Cenk Tosun", "Enes Unal", "Kerem Akturkoglu"],
  "Cote d'Ivoire": ["Yahia Fofana", "Badra Ali Sangare", "Ira Tape", "Serge Aurier", "Odilon Kossounou", "Evan Ndicka", "Willy Boly", "Ghislain Konan", "Simon Adingra", "Seko Fofana", "Franck Kessie", "Jean-Daniel Akpa Akpro", "Ibrahim Sangare", "Hamed Traore", "Jeremie Boga", "Max-Alain Gradel", "Nicolas Pepe", "Sebastien Haller", "Christian Kouame", "Wilfried Zaha", "Karim Konate", "Oumar Diakite", "Kramo Boli", "Jean-Philippe Krasso", "Daouda Diallo", "Emmanuel Agbadou"],
  "Ecuador": ["Hernan Galindez", "Alexander Dominguez", "Moises Ramirez", "Piero Hincapie", "Pervis Estupinan", "Felix Torres", "Robert Arboleda", "Angelo Preciado", "Diego Palacios", "Xavier Arreaga", "Moises Caicedo", "Carlos Gruezo", "Jhegson Mendez", "Alan Franco", "Kendry Paez", "Jeremy Sarmiento", "Angel Mena", "Gonzalo Plata", "Enner Valencia", "Michael Estrada", "Djorkaeff Reasco", "Kevin Rodriguez", "John Yeboah", "Jordy Caicedo", "Leonardo Campana", "Jackson Porozo"],
  "Germany": ["Marc-Andre ter Stegen", "Oliver Baumann", "Alexander Nubel", "Antonio Rudiger", "Jonathan Tah", "Nico Schlotterbeck", "Waldemar Anton", "David Raum", "Benjamin Henrichs", "Maximilian Mittelstädt", "Joshua Kimmich", "Ilkay Gundogan", "Robert Andrich", "Pascal Gross", "Emre Can", "Chris Fuhrich", "Jamal Musiala", "Florian Wirtz", "Kai Havertz", "Leroy Sane", "Serge Gnabry", "Niclas Fullkrug", "Deniz Undav", "Tim Kleindienst", "Maximilian Beier", "Aleksandar Pavlovic"],
  "Curacao": ["Eloy Room", "Jairzinho Pieter", "Ziggy Zariculeta", "Cuco Martina", "Jurien Gaari", "Darryl Lachman", "Shermaine Martina", "Sherel Floranus", "Gianni Zuiverloon", "Leandro Bacuna", "Juninho Bacuna", "Michaël Maria", "Kenji Gorre", "Brandley Kuwas", "Elson Hooi", "Charlison Benschop", "Rangelo Janga", "Jearl Margaritha", "Gervane Kastaneer", "Vurnon Anita", "Shanon Carmelia", "Virgil Misidjan", "Gevaro Nepomuceno", "Quenten Martinus", "Jeredy Hilterman", "Darryl Boekaerts"],
  "Netherlands": ["Bart Verbruggen", "Mark Flekken", "Justin Bijlow", "Virgil van Dijk", "Nathan Ake", "Stefan de Vrij", "Matthijs de Ligt", "Denzel Dumfries", "Jurrien Timber", "Ian Maatsen", "Lutsharel Geertruida", "Frenkie de Jong", "Teun Koopmeiners", "Ryan Gravenberch", "Jerdy Schouten", "Quinten Timber", "Tijjani Reijnders", "Xavi Simons", "Cody Gakpo", "Memphis Depay", "Wout Weghorst", "Donyell Malen", "Joshua Zirkzee", "Steven Bergwijn", "Brian Brobbey", "Noa Lang"],
  "Japan": ["Zion Suzuki", "Shuichi Gonda", "Daniel Schmidt", "Takehiro Tomiyasu", "Ko Itakura", "Shogo Taniguchi", "Miki Yamane", "Hiroki Ito", "Yuto Nagatomo", "Wataru Endo", "Hidemasa Morita", "Daichi Kamada", "Ao Tanaka", "Takumi Minamino", "Junya Ito", "Ritsu Doan", "Takefusa Kubo", "Kaoru Mitoma", "Ayase Ueda", "Kyogo Furuhashi", "Daizen Maeda", "Yukinari Sugawara", "Keito Nakamura", "Reo Hatate", "Koki Ogawa", "Bryce Bafford"],
  "Sweden": ["Robin Olsen", "Kristoffer Nordfeldt", "Jacob Widell Zetterström", "Victor Lindelof", "Ludwig Augustinsson", "Emil Krafth", "Carl Starfelt", "Hjalmar Ekdal", "Gabriel Gudmundsson", "Alexander Milosevic", "Dejan Kulusevski", "Emil Forsberg", "Jesper Karlstrom", "Mattias Svanberg", "Jens Cajuste", "Hugo Larsson", "Viktor Claesson", "Yasin Ayari", "Alexander Isak", "Viktor Gyokeres", "Anthony Elanga", "Robin Quaison", "Jordan Larsson", "Samuel Dahl", "Sebastian Nanasi", "Patrik Schick"],
  "Tunisia": ["Aymen Dahmen", "Mouez Hassen", "Bechir Ben Said", "Dylan Bronn", "Montassar Talbi", "Mohamed Drager", "Ali Abdi", "Nader Ghandri", "Wajdi Kechrida", "Bilel Ifa", "Aissa Laidouni", "Ellyes Skhiri", "Hannibal Mejbri", "Anis Ben Slimane", "Mohamed Ali Ben Romdhane", "Ferjani Sassi", "Naim Sliti", "Youssef Msakni", "Seifeddine Jaziri", "Wahbi Khazri", "Issam Jebali", "Anis Ben Slimane", "Taha Yassine Khenissi", "Hamza Rafia", "Elias Achouri", "Sayfallah Ltaief"],
  "Belgium": ["Koen Casteels", "Thibaut Courtois", "Matz Sels", "Jan Vertonghen", "Arthur Theate", "Wout Faes", "Zeno Debast", "Timothy Castagne", "Thomas Meunier", "Axel Witsel", "Amadou Onana", "Youri Tielemans", "Kevin De Bruyne", "Orel Mangala", "Aster Vranckx", "Arthur Vermeeren", "Charles De Ketelaere", "Jeremy Doku", "Leandro Trossard", "Romelu Lukaku", "Johan Bakayoko", "Lois Openda", "Dodi Lukebakio", "Yannick Carrasco", "Loïs Openda", "Julien Duranville"],
  "Egypt": ["Mohamed El Shenawy", "Mohamed Sobhy", "Ahmed El Shennawy", "Ahmed Hegazi", "Mohamed Abdelmonem", "Mahmoud Hamdy", "Omar Gaber", "Ahmed Fatouh", "Ali Gabr", "Emam Ashour", "Marwan Attia", "Tarek Hamed", "Nabil Emad", "Amr El Sulaya", "Ibrahim Adel", "Ahmed Sayed Zizo", "Trezeguet", "Mohamed Salah", "Omar Marmoush", "Mostafa Mohamed", "Ahmed Kouka", "Marwan Hamdy", "Mohamed Sherif", "Mahmoud Hassan Trezeguet", "Ramadan Sobhi", "Ahmed Refaat"],
  "IR Iran": ["Alireza Beiranvand", "Amir Abedzadeh", "Hossein Hosseini", "Hossein Kanaanizadegan", "Morteza Pouraliganji", "Shojae Khalilzadeh", "Sadegh Moharrami", "Milad Mohammadi", "Ehsan Hajisafi", "Saeid Ezatolahi", "Ahmad Nourollahi", "Alireza Jahanbakhsh", "Ali Gholizadeh", "Mehdi Ghayedi", "Saman Ghoddos", "Omid Ebrahimi", "Ali Karimi", "Vahid Amiri", "Sardar Azmoun", "Mehdi Taremi", "Karim Ansarifard", "Allahyar Sayyadmanesh", "Shahab Zahedi", "Reza Asadi", "Shoja Khalilzadeh", "Kaveh Rezaei"],
  "New Zealand": ["Max Crocombe", "Oliver Sail", "Alex Paulsen", "Liberato Cacace", "Tommy Smith", "Tim Payne", "Michael Boxall", "Nando Pijnaker", "Storm Roux", "Bill Tuiloma", "Marko Stamenic", "Joe Bell", "Matt Garbett", "Sarpreet Singh", "Clayton Lewis", "Cameron Brown", "Elijah Just", "Ben Waine", "Chris Wood", "Kosta Barbarouses", "Alex Greive", "Matthew Garbett", "Andre de Jong", "Logan Rogerson", "Jesse Randall", "Oskar van Hattum"],
  "Saudi Arabia": ["Ahmed Al-Kassar", "Mohammed Al-Owais", "Nawaf Al-Aqidi", "Ali Lajami", "Saud Abdulhamid", "Yasser Al-Shahrani", "Abdullah Madu", "Hassan Tambakti", "Sultan Al-Ghanam", "Abdulelah Al-Malki", "Mohammed Kanno", "Nasser Al-Dawsari", "Abdulrahman Ghareeb", "Nawaf Al-Abed", "Sami Al-Najei", "Ali Al-Hassan", "Firas Al-Buraikan", "Salem Al-Dawsari", "Saleh Al-Shehri", "Abdullah Al-Hamdan", "Fahad Al-Muwallad", "Hattan Bahebri", "Ayman Yahya", "Abdulrahman Al-Obaid", "Sultan Al-Ghanam", "Mohammed Al-Burayk"],
  "Uruguay": ["Sergio Rochet", "Fernando Muslera", "Santiago Mele", "Ronald Araujo", "Jose Maria Gimenez", "Sebastian Coates", "Mathias Olivera", "Guillermo Varela", "Matias Vina", "Lucas Olaza", "Santiago Bueno", "Federico Valverde", "Manuel Ugarte", "Rodrigo Bentancur", "Nicolas de la Cruz", "Giorgian De Arrascaeta", "Lucas Torreira", "Facundo Pellistri", "Darwin Nunez", "Luis Suarez", "Maxi Gomez", "Agustin Canobbio", "Brian Rodriguez", "Cristian Olivera", "Agustin Alvarez Martinez", "Nicolas Fonseca"],
  "Spain": ["Unai Simon", "David Raya", "Alex Remiro", "Dani Carvajal", "Aymeric Laporte", "Robin Le Normand", "Pau Cubarsi", "Marc Cucurella", "Alejandro Grimaldo", "Dani Vivian", "Jesus Navas", "Rodri", "Pedri", "Gavi", "Fabian Ruiz", "Dani Olmo", "Mikel Merino", "Alex Baena", "Fermin Lopez", "Nico Williams", "Lamine Yamal", "Alvaro Morata", "Joselu", "Ferran Torres", "Ayoze Perez", "Mikel Oyarzabal"],
  "Cabo Verde": ["Vozinha", "Dylan Silva", "Maximo Cange", "Steven Moreira", "Logan Costa", "Roberto Lopes", "Stopira", "Dylan Tavares", "Jeffry Fortes", "Diney Borges", "Kenny Rocha", "Jamiro Monteiro", "Nuno Borges", "Patrick Andrade", "Nene", "Leandro Brito", "Kevin Pina", "Gilson Tavares", "Ryan Mendes", "Garry Rodrigues", "Julio Tavares", "Lisandro Semedo", "Djaniny", "Jovane Cabral", "Willis Furtado", "Kikas"],
  "France": ["Mike Maignan", "Brice Samba", "Alphonse Areola", "Theo Hernandez", "William Saliba", "Dayot Upamecano", "Jules Kounde", "Ibrahima Konate", "Ferland Mendy", "Benjamin Pavard", "Wesley Fofana", "Aurelien Tchouameni", "N'Golo Kante", "Adrien Rabiot", "Eduardo Camavinga", "Youssouf Fofana", "Warren Zaire-Emery", "Antoine Griezmann", "Ousmane Dembele", "Kylian Mbappe", "Marcus Thuram", "Randal Kolo Muani", "Olivier Giroud", "Kingsley Coman", "Bradley Barcola", "Michael Olise"],
  "Senegal": ["Edouard Mendy", "Alfred Gomis", "Seny Dieng", "Kalidou Koulibaly", "Abdou Diallo", "Pape Abou Cisse", "Youssouf Sabaly", "Formose Mendy", "Ismail Jakobs", "Moussa Ndiaye", "Idrissa Gueye", "Nampalys Mendy", "Pape Matar Sarr", "Cheikhou Kouyate", "Krepin Diatta", "Pape Gueye", "Pathé Ciss", "Ismaila Sarr", "Sadio Mane", "Nicolas Jackson", "Boulaye Dia", "Iliman Ndiaye", "Habib Diallo", "Famara Diedhiou", "Abdallah Sima", "Lamine Camara"],
  "Iraq": ["Jalal Hassan", "Mohammed Hameed", "Fahad Talib", "Frans Putros", "Rebin Sulaka", "Ahmed Ibrahim", "Ali Adnan", "Saad Natiq", "Mohammad Qasim", "Safaa Hadi", "Ahmed Yahya", "Amir Al Ammari", "Ibrahim Bayesh", "Amjad Attwan", "Hussein Ali", "Ali Jasim", "Mohannad Ali", "Aymen Hussein", "Alaa Abbas", "Mohammed Dawood", "Bashar Resan", "Justin Meram", "Ali Faez", "Manaf Younis", "Dhurgham Ismail", "Suad Jassem"],
  "Norway": ["Orjan Nyland", "Sten Grytebust", "Mads Hermansen", "Kristoffer Ajer", "Leo Ostigard", "Stian Gregersen", "Birger Meling", "Julian Ryerson", "Andreas Hanche-Olsen", "David Moller Wolfe", "Martin Odegaard", "Sander Berge", "Fredrik Aursnes", "Patrick Berg", "Morten Thorsby", "Mathias Normann", "Antonio Nusa", "Erling Haaland", "Alexander Sorloth", "Joshua King", "Jens Petter Hauge", "Mohamed Elyounoussi", "Ola Solbakken", "Oscar Bobb", "Jorgen Strand Larsen", "Aron Donnum"],
  "Argentina": ["Emiliano Martinez", "Franco Armani", "Geronimo Rulli", "Cristian Romero", "Nicolas Otamendi", "Lisandro Martinez", "Marcos Acuna", "Gonzalo Montiel", "Nahuel Molina", "Nicolas Tagliafico", "German Pezzella", "Enzo Fernandez", "Alexis Mac Allister", "Rodrigo De Paul", "Leandro Paredes", "Exequiel Palacios", "Giovani Lo Celso", "Enzo Barrenechea", "Lionel Messi", "Julian Alvarez", "Lautaro Martinez", "Angel Di Maria", "Nicolas Gonzalez", "Paulo Dybala", "Alejandro Garnacho", "Valentin Castellanos"],
  "Algeria": ["Anthony Mandrea", "Alexandre Oukidja", "Moustapha Zeghba", "Aissa Mandi", "Ramy Bensebaini", "Djamel Benlamri", "Hicham Boudaoui", "Mehdi Tahrat", "Youcef Atal", "Ilyes Chetti", "Ismael Bennacer", "Nabil Bentaleb", "Ramiz Zerrouki", "Houssem Aouar", "Hicham Boudaoui", "Yacine Brahimi", "Said Benrahma", "Riyad Mahrez", "Amine Gouiri", "Islam Slimani", "Baghdad Bounedjah", "Adam Ounas", "Youcef Belaili", "Mohamed Amoura", "Amine Amoura", "Farès Chaïbi"],
  "Austria": ["Alexander Schlager", "Patrick Pentz", "Heinz Linder", "Kevin Danso", "Stefan Posch", "Maximilian Wober", "Gernot Trauner", "Philipp Lienhart", "Flavius Daniliuc", "Phillipp Mwene", "Konrad Laimer", "Marcel Sabitzer", "Florian Grillitsch", "Nicolas Seiwald", "Xaver Schlager", "Christoph Baumgartner", "Patrick Wimmer", "Romano Schmid", "Michael Gregoritsch", "Marko Arnautovic", "Marcel Sabitzer", "Andreas Weimann", "Junior Adamu", "Guido Burgstaller", "Maximilian Entrup", "Thierno Ballo"],
  "Jordan": ["Yazeed Abulaila", "Ahmed Abu-Amara", "Mohammad Al-Basha", "Yazan Al Arab", "Abdallah Nasib", "Anas Bani-Yaseen", "Salem Al-Ajalin", "Ehsan Haddad", "Mohammad Abu Zuraiq", "Nizar Al Rashdan", "Noor Al Rawabdeh", "Baha Faisal", "Yazan Al Naimat", "Mousa Al Tamari", "Ali Olwan", "Mahmoud Maraaba", "Faris Al Rawashdeh", "Musa Al-Taamari", "Ahmad Ersan", "Hamza Al-Dardour", "Yousef Al-Rawashdeh", "Oday Dabbagh", "Laith Al Bashtawi", "Amer Shafi", "Mohammad Al-Dmeiri", "Ali Al-Naimat"],
  "Portugal": ["Diogo Costa", "Rui Patricio", "Jose Sa", "Ruben Dias", "Pepe", "Joao Cancelo", "Nuno Mendes", "Nelson Semedo", "Danilo Pereira", "Goncalo Inacio", "Antonio Silva", "Bruno Fernandes", "Bernardo Silva", "Vitinha", "Joao Palhinha", "Ruben Neves", "Otavio", "Joao Neves", "Rafael Leao", "Cristiano Ronaldo", "Diogo Jota", "Goncalo Ramos", "Pedro Neto", "Francisco Conceicao", "Joao Felix", "Matheus Nunes"],
  "Congo DR": ["Dimitry Bertaud", "Lionel Mpasi", "Joel Kiassumbua", "Chancel Mbemba", "Arthur Masuaku", "Christian Luyindama", "Dylan Batubinsika", "Glody Ngonda", "Dorian Ngemi", "Samuel Moutoussamy", "Edo Kayembe", "Gael Kakuta", "Merveille Bope Bokadi", "Neeskens Kebano", "Theo Bongonda", "Arthur Masuaku", "Dieumerci Mbokani", "Meschack Elia", "Yoane Wissa", "Cedric Bakambu", "Ben Malango", "Silas Wamangituka", "Fiston Mayele", "Jonathan Bamba", "David Okereke", "Mukoko Tonombe"],
  "Uzbekistan": ["Utkir Yusupov", "Botirali Ergashev", "Sanjar Kuvvatov", "Rustam Ashurmatov", "Abdukodir Khusanov", "Husniddin Aliqulov", "Akmal Mozgovoy", "Davronbek Khashimov", "Odiljon Hamrobekov", "Sherzod Nasrullaev", "Jaloliddin Masharipov", "Oston Urunov", "Abbosek Fayzullaev", "Otabek Shukurov", "Jamshid Iskanderov", "Bobir Abdikholikov", "Khojimat Erkinov", "Azizbek Turgunboyev", "Eldor Shomurodov", "Igor Sergeev", "Sardor Rashidov", "Ibrokhimkhalil Yuldoshev", "Dostonbek Khamdamov", "Davron Fayziev", "Nasimjon Irisboev", "Islom Kobilov"],
  "Colombia": ["Camilo Vargas", "David Ospina", "Alvaro Montero", "Davinson Sanchez", "Yerry Mina", "Carlos Cuesta", "Daniel Munoz", "Johan Mojica", "Santiago Arias", "Jhon Lucumi", "Cristian Borja", "Jefferson Lerma", "Richard Rios", "Mateus Uribe", "Juan Quintero", "Kevin Castaño", "Gustavo Puerta", "Jhon Arias", "Luis Diaz", "Rafael Santos Borre", "Miguel Borja", "Luis Sinisterra", "Jorge Carrascal", "James Rodriguez", "Juan Camilo Hernandez", "Jhon Cordoba"],
  "England": ["Jordan Pickford", "Aaron Ramsdale", "Dean Henderson", "John Stones", "Kyle Walker", "Harry Maguire", "Marc Guehi", "Ezri Konsa", "Levi Colwill", "Trent Alexander-Arnold", "Luke Shaw", "Rico Lewis", "Declan Rice", "Jude Bellingham", "Kobbie Mainoo", "Conor Gallagher", "Adam Wharton", "Trent Alexander-Arnold", "Phil Foden", "Bukayo Saka", "Harry Kane", "Cole Palmer", "Anthony Gordon", "Ollie Watkins", "Eberechi Eze", "Ivan Toney"],
  "Croatia": ["Dominik Livakovic", "Ivica Ivusic", "Nediljko Labrovic", "Josip Sutalo", "Josko Gvardiol", "Dejan Lovren", "Borna Barisic", "Josip Juranovic", "Domagoj Vida", "Martin Erlic", "Borna Sosa", "Luka Modric", "Mateo Kovacic", "Marcelo Brozovic", "Mario Pasalic", "Nikola Vlasic", "Luka Sucic", "Lovro Majer", "Ivan Perisic", "Andrej Kramaric", "Bruno Petkovic", "Ante Budimir", "Marko Livaja", "Mislav Orsic", "Luka Ivanusec", "Igor Matanovic"],
  "Ghana": ["Lawrence Ati-Zigi", "Richard Ofori", "Ibrahim Danlad", "Alexander Djiku", "Mohammed Salisu", "Daniel Amartey", "Gideon Mensah", "Tariq Lamptey", "Denis Odoi", "Alidu Seidu", "Baba Rahman", "Thomas Partey", "Mohammed Kudus", "Andre Ayew", "Elisha Owusu", "Daniel-Kofi Kyereh", "Salis Abdul Samed", "Ibrahim Sulemana", "Jordan Ayew", "Inaki Williams", "Antoine Semenyo", "Osman Bukari", "Abdul Fatawu Issahaku", "Kamaldeen Sulemana", "Ernest Nuamah", "Felix Afena-Gyan"],
  "Panama": ["Orlando Mosquera", "Luis Mejia", "Cesar Samudio", "Michael Murillo", "Harold Cummings", "Fidel Escobar", "Eric Davis", "Andres Andrade", "Michael Amir Murillo", "Jorge Gutierrez", "Adalberto Carrasquilla", "Anibal Godoy", "Cristian Martinez", "Jose Luis Rodriguez", "Omar Browne", "Alberto Quintero", "Rolando Blackburn", "Edgar Barcenas", "Cesar Yanis", "Jose Fajardo", "Ismael Diaz", "Gabriel Torres", "Freddy Gondola", "Ivan Anderson", "Jovani Welch", "Eduardo Guerrero"]
};

const venues = [
  { name: "Mexico City Stadium", city: "Mexico City", country: "Mexico" },
  { name: "Estadio Guadalajara", city: "Guadalajara", country: "Mexico" },
  { name: "Toronto Stadium", city: "Toronto", country: "Canada" },
  { name: "Los Angeles Stadium", city: "Los Angeles", country: "USA" },
  { name: "Boston Stadium", city: "Boston", country: "USA" },
  { name: "BC Place Vancouver", city: "Vancouver", country: "Canada" },
  { name: "New York New Jersey Stadium", city: "New York / New Jersey", country: "USA" },
  { name: "San Francisco Bay Area Stadium", city: "San Francisco Bay Area", country: "USA" },
  { name: "Philadelphia Stadium", city: "Philadelphia", country: "USA" },
  { name: "Houston Stadium", city: "Houston", country: "USA" },
  { name: "Dallas Stadium", city: "Dallas", country: "USA" },
  { name: "Estadio Monterrey", city: "Monterrey", country: "Mexico" },
  { name: "Miami Stadium", city: "Miami", country: "USA" },
  { name: "Atlanta Stadium", city: "Atlanta", country: "USA" },
  { name: "Seattle Stadium", city: "Seattle", country: "USA" },
  { name: "Kansas City Stadium", city: "Kansas City", country: "USA" }
];

const groupFixtures = [
  [1, "A", "2026-06-11", "17:00", "Mexico", "South Africa", "Mexico City Stadium"],
  [2, "A", "2026-06-11", "20:00", "Korea Republic", "Czechia", "Estadio Guadalajara"],
  [3, "A", "2026-06-18", "17:00", "Czechia", "South Africa", "Atlanta Stadium"],
  [4, "A", "2026-06-18", "20:00", "Mexico", "Korea Republic", "Estadio Guadalajara"],
  [5, "A", "2026-06-24", "17:00", "Czechia", "Mexico", "Mexico City Stadium"],
  [6, "A", "2026-06-24", "20:00", "South Africa", "Korea Republic", "Estadio Monterrey"],

  [7, "B", "2026-06-12", "17:00", "Canada", "Bosnia and Herzegovina", "Toronto Stadium"],
  [8, "B", "2026-06-13", "20:00", "Qatar", "Switzerland", "San Francisco Bay Area Stadium"],
  [9, "B", "2026-06-18", "17:00", "Switzerland", "Bosnia and Herzegovina", "Los Angeles Stadium"],
  [10, "B", "2026-06-18", "20:00", "Canada", "Qatar", "BC Place Vancouver"],
  [11, "B", "2026-06-24", "17:00", "Switzerland", "Canada", "BC Place Vancouver"],
  [12, "B", "2026-06-24", "20:00", "Bosnia and Herzegovina", "Qatar", "Seattle Stadium"],

  [13, "C", "2026-06-13", "17:00", "Haiti", "Scotland", "Boston Stadium"],
  [14, "C", "2026-06-13", "20:00", "Brazil", "Morocco", "New York New Jersey Stadium"],
  [15, "C", "2026-06-19", "17:00", "Brazil", "Haiti", "Philadelphia Stadium"],
  [16, "C", "2026-06-19", "20:00", "Scotland", "Morocco", "Boston Stadium"],
  [17, "C", "2026-06-24", "17:00", "Scotland", "Brazil", "Miami Stadium"],
  [18, "C", "2026-06-24", "20:00", "Morocco", "Haiti", "Atlanta Stadium"],

  [19, "D", "2026-06-12", "20:00", "USA", "Paraguay", "Los Angeles Stadium"],
  [20, "D", "2026-06-13", "22:00", "Australia", "Turkiye", "BC Place Vancouver"],
  [21, "D", "2026-06-19", "17:00", "Turkiye", "Paraguay", "San Francisco Bay Area Stadium"],
  [22, "D", "2026-06-19", "20:00", "USA", "Australia", "Seattle Stadium"],
  [23, "D", "2026-06-25", "17:00", "Turkiye", "USA", "Los Angeles Stadium"],
  [24, "D", "2026-06-25", "20:00", "Paraguay", "Australia", "San Francisco Bay Area Stadium"],

  [25, "E", "2026-06-14", "17:00", "Cote d'Ivoire", "Ecuador", "Philadelphia Stadium"],
  [26, "E", "2026-06-14", "20:00", "Germany", "Curacao", "Houston Stadium"],
  [27, "E", "2026-06-20", "17:00", "Germany", "Cote d'Ivoire", "Toronto Stadium"],
  [28, "E", "2026-06-20", "20:00", "Ecuador", "Curacao", "Kansas City Stadium"],
  [29, "E", "2026-06-25", "17:00", "Curacao", "Cote d'Ivoire", "Philadelphia Stadium"],
  [30, "E", "2026-06-25", "20:00", "Ecuador", "Germany", "New York New Jersey Stadium"],

  [31, "F", "2026-06-14", "17:00", "Netherlands", "Japan", "Dallas Stadium"],
  [32, "F", "2026-06-14", "20:00", "Sweden", "Tunisia", "Estadio Monterrey"],
  [33, "F", "2026-06-20", "17:00", "Netherlands", "Sweden", "Houston Stadium"],
  [34, "F", "2026-06-20", "20:00", "Tunisia", "Japan", "Estadio Monterrey"],
  [35, "F", "2026-06-25", "17:00", "Japan", "Sweden", "Dallas Stadium"],
  [36, "F", "2026-06-25", "20:00", "Tunisia", "Netherlands", "Kansas City Stadium"],

  [37, "G", "2026-06-15", "17:00", "IR Iran", "New Zealand", "Los Angeles Stadium"],
  [38, "G", "2026-06-15", "20:00", "Belgium", "Egypt", "Seattle Stadium"],
  [39, "G", "2026-06-21", "17:00", "Belgium", "IR Iran", "Los Angeles Stadium"],
  [40, "G", "2026-06-21", "20:00", "New Zealand", "Egypt", "BC Place Vancouver"],
  [41, "G", "2026-06-26", "17:00", "Egypt", "IR Iran", "Seattle Stadium"],
  [42, "G", "2026-06-26", "20:00", "New Zealand", "Belgium", "BC Place Vancouver"],

  [43, "H", "2026-06-15", "17:00", "Saudi Arabia", "Uruguay", "Miami Stadium"],
  [44, "H", "2026-06-15", "20:00", "Spain", "Cabo Verde", "Atlanta Stadium"],
  [45, "H", "2026-06-21", "17:00", "Uruguay", "Cabo Verde", "Miami Stadium"],
  [46, "H", "2026-06-21", "20:00", "Spain", "Saudi Arabia", "Atlanta Stadium"],
  [47, "H", "2026-06-26", "17:00", "Cabo Verde", "Saudi Arabia", "Houston Stadium"],
  [48, "H", "2026-06-26", "20:00", "Uruguay", "Spain", "Estadio Guadalajara"],

  [49, "I", "2026-06-16", "17:00", "France", "Senegal", "New York New Jersey Stadium"],
  [50, "I", "2026-06-16", "20:00", "Iraq", "Norway", "Boston Stadium"],
  [51, "I", "2026-06-22", "17:00", "Norway", "Senegal", "New York New Jersey Stadium"],
  [52, "I", "2026-06-22", "20:00", "France", "Iraq", "Philadelphia Stadium"],
  [53, "I", "2026-06-26", "17:00", "Norway", "France", "Boston Stadium"],
  [54, "I", "2026-06-26", "20:00", "Senegal", "Iraq", "Toronto Stadium"],

  [55, "J", "2026-06-16", "17:00", "Argentina", "Algeria", "Kansas City Stadium"],
  [56, "J", "2026-06-16", "20:00", "Austria", "Jordan", "San Francisco Bay Area Stadium"],
  [57, "J", "2026-06-22", "17:00", "Argentina", "Austria", "Dallas Stadium"],
  [58, "J", "2026-06-22", "20:00", "Jordan", "Algeria", "San Francisco Bay Area Stadium"],
  [59, "J", "2026-06-27", "17:00", "Algeria", "Austria", "Kansas City Stadium"],
  [60, "J", "2026-06-27", "20:00", "Jordan", "Argentina", "Dallas Stadium"],

  [61, "K", "2026-06-17", "17:00", "Portugal", "Congo DR", "Houston Stadium"],
  [62, "K", "2026-06-17", "20:00", "Uzbekistan", "Colombia", "Mexico City Stadium"],
  [63, "K", "2026-06-23", "17:00", "Portugal", "Uzbekistan", "Houston Stadium"],
  [64, "K", "2026-06-23", "20:00", "Colombia", "Congo DR", "Estadio Guadalajara"],
  [65, "K", "2026-06-27", "17:00", "Colombia", "Portugal", "Miami Stadium"],
  [66, "K", "2026-06-27", "20:00", "Congo DR", "Uzbekistan", "Atlanta Stadium"],

  [67, "L", "2026-06-17", "17:00", "Ghana", "Panama", "Toronto Stadium"],
  [68, "L", "2026-06-17", "20:00", "England", "Croatia", "Dallas Stadium"],
  [69, "L", "2026-06-23", "17:00", "England", "Ghana", "Boston Stadium"],
  [70, "L", "2026-06-23", "20:00", "Panama", "Croatia", "Toronto Stadium"],
  [71, "L", "2026-06-27", "17:00", "Panama", "England", "New York New Jersey Stadium"],
  [72, "L", "2026-06-27", "20:00", "Croatia", "Ghana", "Philadelphia Stadium"]
];

const knockoutFixtures = [
  [73, "Round of 32", "2026-06-28", "17:00", "A2", "B2", "Los Angeles Stadium"],
  [74, "Round of 32", "2026-06-29", "14:00", "E1", "Best 3rd", "Boston Stadium"],
  [75, "Round of 32", "2026-06-29", "20:00", "F1", "C2", "Estadio Monterrey"],
  [76, "Round of 32", "2026-06-29", "22:00", "C1", "F2", "Houston Stadium"],
  [77, "Round of 32", "2026-06-30", "17:00", "I1", "Best 3rd", "New York New Jersey Stadium"],
  [78, "Round of 32", "2026-06-30", "20:00", "E2", "I2", "Dallas Stadium"],
  [79, "Round of 32", "2026-06-30", "22:00", "A1", "Best 3rd", "Mexico City Stadium"],
  [80, "Round of 32", "2026-07-01", "17:00", "L1", "Best 3rd", "Atlanta Stadium"],
  [81, "Round of 32", "2026-07-01", "20:00", "D1", "Best 3rd", "San Francisco Bay Area Stadium"],
  [82, "Round of 32", "2026-07-01", "22:00", "G1", "Best 3rd", "Seattle Stadium"],
  [83, "Round of 32", "2026-07-02", "17:00", "K2", "L2", "Toronto Stadium"],
  [84, "Round of 32", "2026-07-02", "20:00", "H1", "J2", "Los Angeles Stadium"],
  [85, "Round of 32", "2026-07-02", "22:00", "B1", "Best 3rd", "BC Place Vancouver"],
  [86, "Round of 32", "2026-07-03", "17:00", "J1", "H2", "Miami Stadium"],
  [87, "Round of 32", "2026-07-03", "20:00", "K1", "Best 3rd", "Kansas City Stadium"],
  [88, "Round of 32", "2026-07-03", "22:00", "D2", "G2", "Dallas Stadium"],

  [89, "Round of 16", "2026-07-04", "17:00", "W74", "W77", "Philadelphia Stadium"],
  [90, "Round of 16", "2026-07-04", "20:00", "W73", "W75", "Houston Stadium"],
  [91, "Round of 16", "2026-07-05", "17:00", "W76", "W78", "New York New Jersey Stadium"],
  [92, "Round of 16", "2026-07-05", "20:00", "W79", "W80", "Mexico City Stadium"],
  [93, "Round of 16", "2026-07-06", "17:00", "W83", "W84", "Dallas Stadium"],
  [94, "Round of 16", "2026-07-06", "20:00", "W81", "W82", "Seattle Stadium"],
  [95, "Round of 16", "2026-07-07", "17:00", "W86", "W88", "Atlanta Stadium"],
  [96, "Round of 16", "2026-07-07", "20:00", "W85", "W87", "BC Place Vancouver"],

  [97, "Quarter-final", "2026-07-09", "20:00", "W89", "W90", "Boston Stadium"],
  [98, "Quarter-final", "2026-07-10", "20:00", "W93", "W94", "Los Angeles Stadium"],
  [99, "Quarter-final", "2026-07-11", "17:00", "W91", "W92", "Miami Stadium"],
  [100, "Quarter-final", "2026-07-11", "20:00", "W95", "W96", "Kansas City Stadium"],

  [101, "Semi-final", "2026-07-14", "20:00", "W97", "W98", "Dallas Stadium"],
  [102, "Semi-final", "2026-07-15", "20:00", "W99", "W100", "Atlanta Stadium"],

  [103, "Bronze Final", "2026-07-18", "20:00", "L101", "L102", "Miami Stadium"],
  [104, "Final", "2026-07-19", "20:00", "W101", "W102", "New York New Jersey Stadium"]
];

const fixtureState = loadState() || [
  ...groupFixtures.map(([id, group, date, time, home, away, venue]) => ({
    id,
    stage: "Group Stage",
    group,
    date,
    time,
    home,
    away,
    venue,
    status: "SCHEDULED",
    homeScore: "",
    awayScore: ""
  })),
  ...knockoutFixtures.map(([id, stage, date, time, home, away, venue]) => ({
    id,
    stage,
    group: "-",
    date,
    time,
    home,
    away,
    venue,
    status: "SCHEDULED",
    homeScore: "",
    awayScore: ""
  }))
];

/* localStorage helpers */
function loadState() {
  try {
    const raw = localStorage.getItem("fifa2026_state");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function saveState() {
  try {
    localStorage.setItem("fifa2026_state", JSON.stringify(fixtureState));
  } catch { /* quota exceeded - ignore */ }
}

/* ===== FOOTBALL-DATA.ORG API INTEGRATION ===== */

// Map API team names to our local names (API may use different spellings)
const apiTeamNameMap = {
  "Korea Republic": "Korea Republic", "South Korea": "Korea Republic",
  "Czech Republic": "Czechia", "Czechia": "Czechia",
  "Turkey": "Turkiye", "Türkiye": "Turkiye",
  "Ivory Coast": "Cote d'Ivoire", "Côte d'Ivoire": "Cote d'Ivoire",
  "Iran": "IR Iran", "IR Iran": "IR Iran",
  "Cape Verde": "Cabo Verde", "Cabo Verde": "Cabo Verde",
  "DR Congo": "Congo DR", "Congo DR": "Congo DR",
  "United States": "USA", "USA": "USA"
};

function normalizeTeamName(apiName) {
  return apiTeamNameMap[apiName] || apiName;
}

function mapApiStatus(apiStatus) {
  switch (apiStatus) {
    case "IN_PLAY": case "LIVE": case "PAUSED": return "LIVE";
    case "FINISHED": return "FT";
    case "SCHEDULED": case "TIMED": return "SCHEDULED";
    case "POSTPONED": return "POSTPONED";
    case "CANCELLED": return "CANCELLED";
    default: return "SCHEDULED";
  }
}

function mapApiStage(apiStage) {
  switch (apiStage) {
    case "GROUP_STAGE": return "Group Stage";
    case "LAST_32": return "Round of 32";
    case "LAST_16": return "Round of 16";
    case "QUARTER_FINALS": return "Quarter-Finals";
    case "SEMI_FINALS": return "Semi-Finals";
    case "FINAL": return "Final";
    case "THIRD_PLACE": return "Third Place";
    default: return apiStage;
  }
}

async function fetchMatchesFromAPI() {
  if (!FOOTBALL_DATA_API_KEY) return null;

  try {
    const response = await fetch(`${FOOTBALL_DATA_BASE}/competitions/${WC_COMPETITION_CODE}/matches`, {
      headers: { "X-Auth-Token": FOOTBALL_DATA_API_KEY }
    });

    if (!response.ok) {
      console.warn(`Football-Data API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.matches || null;
  } catch (err) {
    console.warn("Football-Data API fetch failed:", err.message);
    return null;
  }
}

function updateFixtureStateFromAPI(apiMatches) {
  if (!apiMatches || !apiMatches.length) return false;

  let updated = false;

  apiMatches.forEach((apiMatch) => {
    const homeTeam = normalizeTeamName(apiMatch.homeTeam?.name || apiMatch.homeTeam?.shortName || "");
    const awayTeam = normalizeTeamName(apiMatch.awayTeam?.name || apiMatch.awayTeam?.shortName || "");

    if (!homeTeam || !awayTeam) return;

    // Match by teams first, then fall back to matching by date + stage for knockout rounds
    let local = fixtureState.find((m) =>
      (m.home === homeTeam && m.away === awayTeam) ||
      (m.home === awayTeam && m.away === homeTeam)
    );

    // For knockout rounds, also try to match by date and stage (teams may be placeholders like "1A vs 2B")
    if (!local && apiMatch.stage !== "GROUP_STAGE") {
      const apiDate = apiMatch.utcDate ? apiMatch.utcDate.slice(0, 10) : "";
      const apiStage = mapApiStage(apiMatch.stage);
      local = fixtureState.find((m) =>
        m.stage === apiStage && m.date === apiDate &&
        (m.home.includes("v") || m.home === "TBD" || m.home === homeTeam)
      );
      // Update team names from API for bracket display
      if (local) {
        local.home = homeTeam;
        local.away = awayTeam;
      }
    }

    if (!local) return;

    const newStatus = mapApiStatus(apiMatch.status);
    const score = apiMatch.score;
    const isHomeReversed = local.home === awayTeam;

    let homeScore = "";
    let awayScore = "";

    if (score && score.fullTime && score.fullTime.home !== null) {
      homeScore = isHomeReversed ? score.fullTime.away : score.fullTime.home;
      awayScore = isHomeReversed ? score.fullTime.home : score.fullTime.away;
    } else if (score && score.halfTime && score.halfTime.home !== null) {
      homeScore = isHomeReversed ? score.halfTime.away : score.halfTime.home;
      awayScore = isHomeReversed ? score.halfTime.home : score.halfTime.away;
    }

    if (local.status !== newStatus || local.homeScore !== homeScore || local.awayScore !== awayScore) {
      local.status = newStatus;
      if (homeScore !== "") local.homeScore = homeScore;
      if (awayScore !== "") local.awayScore = awayScore;
      updated = true;
    }
  });

  if (updated) {
    saveState();
  }
  return updated;
}

async function pollLiveScores() {
  const apiMatches = await fetchMatchesFromAPI();
  const updated = updateFixtureStateFromAPI(apiMatches);
  if (updated) {
    renderFixtures();
    renderStandings();
    renderBracket();
    updateHeroStats();
  }
  // Also fetch standings from API (more accurate than local calc)
  await fetchStandingsFromAPI();
}

async function fetchStandingsFromAPI() {
  if (!FOOTBALL_DATA_API_KEY) return;
  try {
    const response = await fetch(`${FOOTBALL_DATA_BASE}/competitions/${WC_COMPETITION_CODE}/standings`, {
      headers: { "X-Auth-Token": FOOTBALL_DATA_API_KEY }
    });
    if (!response.ok) return;
    const data = await response.json();
    if (data.standings && data.standings.length) {
      renderStandingsFromAPI(data.standings);
    }
  } catch (err) {
    console.warn("Standings API fetch failed:", err.message);
  }
}

function renderStandingsFromAPI(standings) {
  // API returns standings grouped by type (TOTAL, HOME, AWAY)
  const totalStandings = standings.filter((s) => s.type === "TOTAL");
  if (!totalStandings.length) return;

  standingsWrap.innerHTML = totalStandings
    .map((groupStanding) => {
      const groupName = groupStanding.group ? groupStanding.group.replace("GROUP_", "") : "?";
      const rows = groupStanding.table
        .map((entry, i) => {
          const teamName = normalizeTeamName(entry.team.name || entry.team.shortName);
          return `<tr>
            <td>${entry.position || i + 1}</td>
            <td>${flag(teamName)}${teamName}</td>
            <td>${entry.playedGames}</td>
            <td>${entry.won}</td>
            <td>${entry.draw}</td>
            <td>${entry.lost}</td>
            <td>${entry.goalsFor}:${entry.goalsAgainst}</td>
            <td>${entry.goalDifference}</td>
            <td><strong>${entry.points}</strong></td>
          </tr>`;
        })
        .join("");

      return `<article class="standingsCard">
        <h3>Group ${groupName}</h3>
        <table>
          <thead>
            <tr><th>#</th><th>Team</th><th>MP</th><th>W</th><th>D</th><th>L</th><th>GF:GA</th><th>GD</th><th>PTS</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </article>`;
    })
    .join("");
}

// Poll every 60 seconds for live score updates
function startLivePolling() {
  if (!FOOTBALL_DATA_API_KEY) {
    console.warn("Football-Data.org API key not set. Add your key in script.js to get live scores.");
    return;
  }
  // Initial fetch
  pollLiveScores();
  // Then poll every 60s (free tier: 10 req/min)
  setInterval(pollLiveScores, 60000);
}

const stageFilter = document.getElementById("stageFilter");
const groupFilter = document.getElementById("groupFilter");
const teamSearch = document.getElementById("teamSearch");
const fixtureList = document.getElementById("fixtureList");
const standingsWrap = document.getElementById("standingsWrap");
const teamSelect = document.getElementById("teamSelect");
const teamGroupFilter = document.getElementById("teamGroupFilter");
const teamCard = document.getElementById("teamCard");
const allTeamsGrid = document.getElementById("allTeamsGrid");
const venueGrid = document.getElementById("venueGrid");

function initTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });
}

function initFilters() {
  const stages = ["All", ...new Set(fixtureState.map((m) => m.stage))];
  const groupsAll = ["All", ...Object.keys(groups), "-"];

  stageFilter.innerHTML = stages.map((s) => `<option value="${s}">${s}</option>`).join("");
  groupFilter.innerHTML = groupsAll.map((g) => `<option value="${g}">${g}</option>`).join("");

  stageFilter.addEventListener("change", renderFixtures);
  groupFilter.addEventListener("change", renderFixtures);
  teamSearch.addEventListener("input", renderFixtures);
}

function venueInfo(venueName) {
  return venues.find((v) => v.name === venueName) || { city: "TBD", country: "TBD", name: venueName };
}

function formatDate(isoDate) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

function socialPosts(match) {
  const seed = match.id * 17;
  const base = [
    `${match.home} pressing high from minute 1. #FIFAWorldCup`,
    `${match.away} midfield control is elite tonight.`,
    `This ${match.home} vs ${match.away} atmosphere is unreal in ${venueInfo(match.venue).city}.`,
    `Prediction thread: who scores next in Match ${match.id}?`,
    `Tactical switch changed everything in this one.`,
    `VAR drama incoming? Fans are losing it.`,
    `${match.home} fullback overlap is cooking today.`,
    `${match.away} defensive line is brave and risky.`,
    `This could be a classic FIFA 2026 fixture.`,
    `Momentum just shifted. Game on.`,
    `Crowd noise level in ${match.venue} is wild.`,
    `Set-piece routines from both sides look rehearsed and sharp.`
  ];

  return base
    .map((text, i) => ({
      text,
      likes: (seed + i * 29) % 9800 + 220
    }))
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 10);
}

function renderFixtures() {
  const stage = stageFilter.value;
  const group = groupFilter.value;
  const q = teamSearch.value.trim().toLowerCase();

  const filtered = fixtureState.filter((m) => {
    const stageOk = stage === "All" || m.stage === stage;
    const groupOk = group === "All" || m.group === group;
    const teamOk = !q || m.home.toLowerCase().includes(q) || m.away.toLowerCase().includes(q);
    return stageOk && groupOk && teamOk;
  });

  fixtureList.innerHTML = filtered
    .map((m) => {
      const v = venueInfo(m.venue);
      const posts = socialPosts(m)
        .map((p) => `<li>${p.text} <strong>${p.likes.toLocaleString()} likes</strong></li>`)
        .join("");

      const hs = m.homeScore !== "" ? m.homeScore : "-";
      const as = m.awayScore !== "" ? m.awayScore : "-";
      const scoreDisplay = m.status === "SCHEDULED"
        ? `<span class="scoreLine">vs</span>`
        : `<span class="scoreLine">${hs} - ${as}</span>`;

      return `
      <article class="fixtureCard">
        <div class="fixtureTop">
          <div>
            <div class="teamsLine">${flag(m.home)}${m.home} ${scoreDisplay} ${flag(m.away)}${m.away}</div>
            <div class="meta">${m.stage}${m.group !== "-" ? ` - Group ${m.group}` : ""} | ${formatDate(m.date)} ${m.time}</div>
            <div class="meta">${m.venue} - ${v.city}, ${v.country}</div>
          </div>
          <span class="status ${m.status.toLowerCase() === "live" ? "live" : m.status.toLowerCase() === "ft" ? "ft" : ""}">${m.status}</span>
        </div>

        <div class="fixtureActions">
          <button data-action="map" data-venue="${encodeURIComponent(`${m.venue} ${v.city}`)}">📍 Venue</button>
          <button data-action="tweets" data-id="${m.id}">Top 10 Tweets</button>
          <a href="https://x.com/search?q=${encodeURIComponent(`${m.home} ${m.away} FIFA 2026`)}&src=typed_query&f=live" target="_blank" rel="noopener"><button>X Live Search</button></a>
        </div>

        <div class="tweetsBox" id="tweets-${m.id}">
          <ol>${posts}</ol>
        </div>
      </article>`;
    })
    .join("");

  bindFixtureActions();
  updateHeroStats();
}

function bindFixtureActions() {
  document.querySelectorAll("button[data-action='map']").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.open(`https://www.google.com/maps/search/?api=1&query=${btn.dataset.venue}`, "_blank");
    });
  });

  document.querySelectorAll("button[data-action='tweets']").forEach((btn) => {
    btn.addEventListener("click", () => {
      const box = document.getElementById(`tweets-${btn.dataset.id}`);
      if (box) box.classList.toggle("open");
    });
  });
}

function renderStandings() {
  standingsWrap.innerHTML = Object.entries(groups)
    .map(([groupName, teams]) => {
      const table = teams.map((team) => ({
        team,
        mp: 0,
        w: 0,
        d: 0,
        l: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        pts: 0
      }));

      const groupMatches = fixtureState.filter((m) => m.stage === "Group Stage" && m.group === groupName);

      groupMatches.forEach((m) => {
        if (m.homeScore === "" || m.awayScore === "") return;
        const home = table.find((t) => t.team === m.home);
        const away = table.find((t) => t.team === m.away);
        if (!home || !away) return;

        const hs = Number(m.homeScore);
        const as = Number(m.awayScore);

        home.mp += 1;
        away.mp += 1;
        home.gf += hs;
        home.ga += as;
        away.gf += as;
        away.ga += hs;

        if (hs > as) {
          home.w += 1;
          away.l += 1;
          home.pts += 3;
        } else if (hs < as) {
          away.w += 1;
          home.l += 1;
          away.pts += 3;
        } else {
          home.d += 1;
          away.d += 1;
          home.pts += 1;
          away.pts += 1;
        }
      });

      table.forEach((t) => {
        t.gd = t.gf - t.ga;
      });

      table.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.team.localeCompare(b.team));

      const rows = table
        .map(
          (t, i) =>
            `<tr>
              <td>${i + 1}</td>
              <td>${flag(t.team)}${t.team}</td>
              <td>${t.mp}</td>
              <td>${t.w}</td>
              <td>${t.d}</td>
              <td>${t.l}</td>
              <td>${t.gf}:${t.ga}</td>
              <td>${t.gd}</td>
              <td><strong>${t.pts}</strong></td>
            </tr>`
        )
        .join("");

      return `<article class="standingsCard">
        <h3>Group ${groupName}</h3>
        <table>
          <thead>
            <tr><th>#</th><th>Team</th><th>MP</th><th>W</th><th>D</th><th>L</th><th>GF:GA</th><th>GD</th><th>PTS</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </article>`;
    })
    .join("");
}

function renderTeams() {
  const allTeams = Object.values(groups).flat();
  teamSelect.innerHTML = allTeams.map((t) => `<option value="${t}">${t}</option>`).join("");
  teamGroupFilter.innerHTML = ["All", ...Object.keys(groups)]
    .map((g) => `<option value="${g}">${g}</option>`)
    .join("");

  teamSelect.addEventListener("change", () => renderTeamCard(teamSelect.value));
  teamGroupFilter.addEventListener("change", renderAllTeamsGrid);

  renderTeamCard(allTeams[0]);
  renderAllTeamsGrid();
}

function teamGroup(teamName) {
  return Object.entries(groups).find(([, teams]) => teams.includes(teamName))?.[0] || "-";
}

function renderTeamCard(team) {
  const group = teamGroup(team);
  const players = teamPlayers[team] || ["Squad list to be announced"];

  teamCard.innerHTML = `
    <div class="teamHead">
      <div>
        <h3>${flag(team)}${team}</h3>
        <div class="meta">Group ${group}</div>
      </div>
      <div class="meta">Projected core squad</div>
    </div>
    <div class="playersGrid">
      ${players.map((p) => `<div class="playerPill">${p}</div>`).join("")}
    </div>
  `;
}

function renderAllTeamsGrid() {
  const g = teamGroupFilter.value;
  const allTeams = Object.values(groups).flat();
  const filtered = allTeams.filter((team) => g === "All" || teamGroup(team) === g);

  allTeamsGrid.innerHTML = filtered
    .map((team) => {
      const players = (teamPlayers[team] || []).slice(0, 4).join(" • ");
      return `<article class="venueCard"><h4>${flag(team)}${team}</h4><div class="venueMeta">Group ${teamGroup(team)}</div><div>${players}</div></article>`;
    })
    .join("");
}

function renderVenues() {
  venueGrid.innerHTML = venues
    .map((v) => {
      const matchCount = fixtureState.filter((m) => m.venue === v.name).length;
      const query = encodeURIComponent(`${v.name}, ${v.city}, ${v.country}`);
      return `<article class="venueCard">
        <h4>${v.name}</h4>
        <div class="venueMeta">${v.city}, ${v.country}</div>
        <div>${matchCount} scheduled matches</div>
        <button data-map="${query}">Open venue map</button>
      </article>`;
    })
    .join("");

  document.querySelectorAll("button[data-map]").forEach((b) => {
    b.addEventListener("click", () => {
      window.open(`https://www.google.com/maps/search/?api=1&query=${b.dataset.map}`, "_blank");
    });
  });
}

function updateHeroStats() {
  const liveCount = fixtureState.filter((m) => m.status === "LIVE").length;
  document.getElementById("chipLiveCount").textContent = `Live: ${liveCount}`;
  document.getElementById("chipMatchCount").textContent = `${fixtureState.length} Matches`;
  document.getElementById("chipToday").textContent = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

/* ===== BRACKET VISUALIZATION ===== */
function renderBracket() {
  const bracketWrap = document.getElementById("bracketWrap");
  if (!bracketWrap) return;

  const rounds = [
    { name: "ROUND OF 32", ids: [73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88] },
    { name: "ROUND OF 16", ids: [89,90,91,92,93,94,95,96] },
    { name: "QUARTER-FINALS", ids: [97,98,99,100] },
    { name: "SEMI-FINALS", ids: [101,102] },
    { name: "FINAL", ids: [103,104] }
  ];

  bracketWrap.innerHTML = `<div class="bracketGrid">${rounds.map((round) => {
    const matchCards = round.ids.map((id) => {
      const m = fixtureState.find((x) => x.id === id);
      if (!m) return "";
      const hs = m.homeScore !== "" ? m.homeScore : "-";
      const as = m.awayScore !== "" ? m.awayScore : "-";
      return `<div class="bracketMatch">
        <div class="bmId">M${m.id} | ${formatDate(m.date)}</div>
        <div class="bmTeam"><span>${flag(m.home)}${m.home}</span><span class="bmScore">${hs}</span></div>
        <div class="bmTeam"><span>${flag(m.away)}${m.away}</span><span class="bmScore">${as}</span></div>
      </div>`;
    }).join("");
    return `<div class="bracketRound"><h4>${round.name}</h4>${matchCards}</div>`;
  }).join("")}</div>`;
}

function init() {
  initTabs();
  initFilters();
  renderFixtures();
  renderStandings();
  renderBracket();
  renderTeams();
  renderVenues();
  updateHeroStats();
  startLivePolling();
}

init();
