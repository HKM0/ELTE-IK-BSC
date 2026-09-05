import psgLogo      from "../assets/teams/psg.png";
import arsenalLogo  from "../assets/teams/arsenal.png";
import bayernLogo   from "../assets/teams/bayern.png";
import barcelonaLogo from "../assets/teams/barcelona.png";
import realLogo     from "../assets/teams/real.png";
import liverpoolLogo from "../assets/teams/liverpool.png";
import atleticoLogo from "../assets/teams/atletico.png";
import sportingLogo from "../assets/teams/sporting.png";

export interface Team {
  name: string;
  country: string;
  logo: string;
}

export interface Match {
  id: number;
  home: Team;
  away: Team;
  date: string;
  venue: string;
  stage: string;
}

export interface Prediction {
  matchId: number;
  homeScore: number;
  awayScore: number;
}

const psg: Team        = { name: "PSG",            country: "Franciaország", logo: psgLogo };
const arsenal: Team    = { name: "Arsenal",         country: "Anglia",        logo: arsenalLogo };
const bayern: Team     = { name: "Bayern München",  country: "Németország",   logo: bayernLogo };
const barcelona: Team  = { name: "Barcelona",       country: "Spanyolország", logo: barcelonaLogo };
const realMadrid: Team = { name: "Real Madrid",     country: "Spanyolország", logo: realLogo };
const liverpool: Team  = { name: "Liverpool",       country: "Anglia",        logo: liverpoolLogo };
const atletico: Team   = { name: "Atlético Madrid", country: "Spanyolország", logo: atleticoLogo };
const sporting: Team   = { name: "Sporting CP",     country: "Portugália",    logo: sportingLogo };

const matches: Match[] = [
  // Ligaszakasz
  {
    id: 1,
    home: psg, away: arsenal,
    date: "2025-09-17",
    venue: "Parc des Princes, Párizs",
    stage: "Ligaszakasz",
  },
  {
    id: 2,
    home: bayern, away: barcelona,
    date: "2025-10-01",
    venue: "Allianz Arena, München",
    stage: "Ligaszakasz",
  },
  {
    id: 3,
    home: realMadrid, away: liverpool,
    date: "2025-10-22",
    venue: "Santiago Bernabéu, Madrid",
    stage: "Ligaszakasz",
  },
  {
    id: 4,
    home: atletico, away: sporting,
    date: "2025-11-05",
    venue: "Wanda Metropolitano, Madrid",
    stage: "Ligaszakasz",
  },

  // Negyeddöntő - 1. mérkőzés
  {
    id: 5,
    home: realMadrid, away: bayern,
    date: "2026-04-07",
    venue: "Santiago Bernabéu, Madrid",
    stage: "Negyeddöntő - 1. mérkőzés",
  },
  {
    id: 6,
    home: sporting, away: arsenal,
    date: "2026-04-07",
    venue: "Estádio José Alvalade, Lisszabon",
    stage: "Negyeddöntő - 1. mérkőzés",
  },
  {
    id: 7,
    home: barcelona, away: atletico,
    date: "2026-04-08",
    venue: "Estadi Olímpic Lluís Companys, Barcelona",
    stage: "Negyeddöntő - 1. mérkőzés",
  },
  {
    id: 8,
    home: psg, away: liverpool,
    date: "2026-04-08",
    venue: "Parc des Princes, Párizs",
    stage: "Negyeddöntő - 1. mérkőzés",
  },

  // Negyeddöntő - 2. mérkőzés
  {
    id: 9,
    home: atletico, away: barcelona,
    date: "2026-04-14",
    venue: "Wanda Metropolitano, Madrid",
    stage: "Negyeddöntő - 2. mérkőzés",
  },
  {
    id: 10,
    home: liverpool, away: psg,
    date: "2026-04-14",
    venue: "Anfield, Liverpool",
    stage: "Negyeddöntő - 2. mérkőzés",
  },
  {
    id: 11,
    home: bayern, away: realMadrid,
    date: "2026-04-15",
    venue: "Allianz Arena, München",
    stage: "Negyeddöntő - 2. mérkőzés",
  },
  {
    id: 12,
    home: arsenal, away: sporting,
    date: "2026-04-15",
    venue: "Emirates Stadium, London",
    stage: "Negyeddöntő - 2. mérkőzés",
  },

  // Elődöntő - 1. mérkőzés
  {
    id: 13,
    home: psg, away: bayern,
    date: "2026-04-28",
    venue: "Parc des Princes, Párizs",
    stage: "Elődöntő - 1. mérkőzés",
  },
  {
    id: 14,
    home: atletico, away: arsenal,
    date: "2026-04-29",
    venue: "Wanda Metropolitano, Madrid",
    stage: "Elődöntő - 1. mérkőzés",
  },

  // Elődöntő - 2. mérkőzés
  {
    id: 15,
    home: arsenal, away: atletico,
    date: "2026-05-05",
    venue: "Emirates Stadium, London",
    stage: "Elődöntő - 2. mérkőzés",
  },
  {
    id: 16,
    home: bayern, away: psg,
    date: "2026-05-06",
    venue: "Allianz Arena, München",
    stage: "Elődöntő - 2. mérkőzés",
  },

  // Döntő
  {
    id: 17,
    home: psg, away: arsenal,
    date: "2026-05-30",
    venue: "Puskás Aréna, Budapest",
    stage: "Döntő",
  },
];

export default matches;
