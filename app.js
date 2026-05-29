(() => {
  "use strict";

  const PRODUCT_ROWS = [
    ["premier-001-arsenal-home","Arsenal (Home)","Arsenal","Premier League","premier","2025/26 Season",25,"images/arsh.jpg",12,1,7],
    ["premier-002-arsenal-away","Arsenal (Away)","Arsenal","Premier League","premier","2025/26 Season",25,"images/ars3_no_bg_no_bg.png",14,2,14],
    ["premier-003-arsenal-third","Arsenal (Third)","Arsenal","Premier League","premier","2025/26 Season",25,"images/arsa_no_bg.png",16,3,21],
    ["premier-004-aston-villa-home","Aston Villa (Home)","Aston Villa","Premier League","premier","2025/26 Season",25,"images/avh.jpeg",18,4,28],
    ["premier-005-aston-villa-away","Aston Villa (Away)","Aston Villa","Premier League","premier","2025/26 Season",25,"images/ava.jpeg",20,5,35],
    ["premier-006-aston-villa-third","Aston Villa (Third)","Aston Villa","Premier League","premier","2025/26 Season",25,"images/av3.jpeg",22,6,42],
    ["premier-007-bournemouth-home","Bournemouth (Home)","Bournemouth","Premier League","premier","2025/26 Season",25,"images/Screenshot 2026-02-16 112038.png",24,7,49],
    ["premier-008-bournemouth-away","Bournemouth (Away)","Bournemouth","Premier League","premier","2025/26 Season",25,"images/Screenshot 2026-02-16 112424.png",10,8,56],
    ["premier-009-bournemouth-third","Bournemouth (Third)","Bournemouth","Premier League","premier","2025/26 Season",25,"images/Screenshot 2026-02-16 112553.png",3,9,63],
    ["premier-010-brentford-home","Brentford (Home)","Brentford","Premier League","premier","2025/26 Season",25,"images/5351-521_no_bg.png",14,10,70],
    ["premier-011-brentford-away","Brentford (Away)","Brentford","Premier League","premier","2025/26 Season",25,"images/5352-72a_no_bg.png",16,11,77],
    ["premier-012-brentford-third","Brentford (Third)","Brentford","Premier League","premier","2025/26 Season",25,"images/5353-723333333_no_bg.png",18,12,84],
    ["premier-013-brighton-home","Brighton (Home)","Brighton","Premier League","premier","2025/26 Season",25,"images/brightonh.jpg",20,13,91],
    ["premier-014-brighton-away","Brighton (Away)","Brighton","Premier League","premier","2025/26 Season",25,"images/brightona.jpg",22,14,98],
    ["premier-015-brighton-third","Brighton (Third)","Brighton","Premier League","premier","2025/26 Season",25,"images/brighton3.jpg",24,15,4],
    ["premier-016-burnley-home","Burnley (Home)","Burnley","Premier League","premier","2025/26 Season",25,"images/AF63bL91Xam5qXU.jpg",10,16,11],
    ["premier-017-burnley-away","Burnley (Away)","Burnley","Premier League","premier","2025/26 Season",25,"images/6GMzc9D38TxzjBa.jpg",0,17,18],
    ["premier-018-burnley-third","Burnley (Third)","Burnley","Premier League","premier","2025/26 Season",25,"images/7bGVRsQ9YCSErIe.jpg",3,18,25],
    ["premier-019-chelsea-home","Chelsea (Home)","Chelsea","Premier League","premier","2025/26 Season",25,"images/cheh.jpg",16,19,32],
    ["premier-020-chelsea-away","Chelsea (Away)","Chelsea","Premier League","premier","2025/26 Season",25,"images/chea_no_bg.png",18,20,39],
    ["premier-021-chelsea-third","Chelsea (Third)","Chelsea","Premier League","premier","2025/26 Season",25,"images/che3_no_bg.png",20,21,46],
    ["premier-022-crystal-palace-home","Crystal Palace (Home)","Crystal Palace","Premier League","premier","2025/26 Season",25,"images/cryh_no_bg.png",22,22,53],
    ["premier-023-crystal-palace-away","Crystal Palace (Away)","Crystal Palace","Premier League","premier","2025/26 Season",25,"images/crya_no_bg.png",24,23,60],
    ["premier-024-crystal-palace-third","Crystal Palace (Third)","Crystal Palace","Premier League","premier","2025/26 Season",25,"images/cry3_no_bg.png",10,24,67],
    ["premier-025-everton-home","Everton (Home)","Everton","Premier League","premier","2025/26 Season",25,"images/eveh.jpg",12,25,74],
    ["premier-026-everton-away","Everton (Away)","Everton","Premier League","premier","2025/26 Season",25,"images/evea.jpg",14,26,81],
    ["premier-027-everton-third","Everton (Third)","Everton","Premier League","premier","2025/26 Season",25,"images/eve3.jpg",3,27,88],
    ["premier-028-fulham-home","Fulham (Home)","Fulham","Premier League","premier","2025/26 Season",25,"images/fuh.jpg",18,28,95],
    ["premier-029-fulham-away","Fulham (Away)","Fulham","Premier League","premier","2025/26 Season",25,"images/fua.jpg",20,29,1],
    ["premier-030-fulham-third","Fulham (Third)","Fulham","Premier League","premier","2025/26 Season",25,"images/fu3.jpg",22,30,8],
    ["premier-031-leeds-united-home","Leeds United (Home)","Leeds United","Premier League","premier","2025/26 Season",25,"images/leeh.jpg",24,31,15],
    ["premier-032-leeds-united-away","Leeds United (Away)","Leeds United","Premier League","premier","2025/26 Season",25,"images/leeda.jpg",10,32,22],
    ["premier-033-leeds-united-third","Leeds United (Third)","Leeds United","Premier League","premier","2025/26 Season",25,"images/lee3.jpg",12,33,29],
    ["premier-034-liverpool-home","Liverpool (Home)","Liverpool","Premier League","premier","2025/26 Season",25,"images/liveh.jpg",0,34,36],
    ["premier-035-liverpool-away","Liverpool (Away)","Liverpool","Premier League","premier","2025/26 Season",25,"images/liva.jpg",16,35,43],
    ["premier-036-liverpool-third","Liverpool (Third)","Liverpool","Premier League","premier","2025/26 Season",25,"images/live3.jpg",3,36,50],
    ["premier-037-manchester-city-home","Manchester City (Home)","Manchester City","Premier League","premier","2025/26 Season",25,"images/manch.jpg",20,37,57],
    ["premier-038-manchester-city-away","Manchester City (Away)","Manchester City","Premier League","premier","2025/26 Season",25,"images/manca.jpg",22,38,64],
    ["premier-039-manchester-city-third","Manchester City (Third)","Manchester City","Premier League","premier","2025/26 Season",25,"images/manc3.jpg",24,39,71],
    ["premier-040-manchester-united-home","Manchester United (Home)","Manchester United","Premier League","premier","2025/26 Season",25,"images/manuh.jpg",10,40,78],
    ["premier-041-manchester-united-away","Manchester United (Away)","Manchester United","Premier League","premier","2025/26 Season",25,"images/manua.jpg",12,41,85],
    ["premier-042-manchester-united-third","Manchester United (Third)","Manchester United","Premier League","premier","2025/26 Season",25,"images/manu3.jpg",14,42,92],
    ["premier-043-newcastle-united-home","Newcastle United (Home)","Newcastle United","Premier League","premier","2025/26 Season",25,"images/newh_no_bg.png",16,43,99],
    ["premier-044-newcastle-united-away","Newcastle United (Away)","Newcastle United","Premier League","premier","2025/26 Season",25,"images/newa_no_bg.png",18,44,5],
    ["premier-045-newcastle-united-third","Newcastle United (Third)","Newcastle United","Premier League","premier","2025/26 Season",25,"images/new3_no_bg.png",3,45,12],
    ["premier-046-nottingham-forest-home","Nottingham Forest (Home)","Nottingham Forest","Premier League","premier","2025/26 Season",25,"images/noth_no_bg.png",22,46,19],
    ["premier-047-nottingham-forest-away","Nottingham Forest (Away)","Nottingham Forest","Premier League","premier","2025/26 Season",25,"images/nota_no_bg.png",24,47,26],
    ["premier-048-nottingham-forest-third","Nottingham Forest (Third)","Nottingham Forest","Premier League","premier","2025/26 Season",25,"images/not3_no_bg.png",10,48,33],
    ["premier-049-sunderland-home","Sunderland (Home)","Sunderland","Premier League","premier","2025/26 Season",25,"images/sundh.jpg",12,49,40],
    ["premier-050-sunderland-away","Sunderland (Away)","Sunderland","Premier League","premier","2025/26 Season",25,"images/sunda.jpg",14,50,47],
    ["premier-051-sunderland-third","Sunderland (Third)","Sunderland","Premier League","premier","2025/26 Season",25,"images/sund3.jpg",0,51,54],
    ["premier-052-tottenham-hotspur-home","Tottenham Hotspur (Home)","Tottenham Hotspur","Premier League","premier","2025/26 Season",25,"images/totth_no_bg.png",18,52,61],
    ["premier-053-tottenham-hotspur-away","Tottenham Hotspur (Away)","Tottenham Hotspur","Premier League","premier","2025/26 Season",25,"images/tota_no_bg.png",20,53,68],
    ["premier-054-tottenham-hotspur-third","Tottenham Hotspur (Third)","Tottenham Hotspur","Premier League","premier","2025/26 Season",25,"images/tot3_no_bg.png",3,54,75],
    ["premier-055-west-ham-united-home","West Ham United (Home)","West Ham United","Premier League","premier","2025/26 Season",25,"images/wesrh_no_bg.png",24,55,82],
    ["premier-056-west-ham-united-away","West Ham United (Away)","West Ham United","Premier League","premier","2025/26 Season",25,"images/westa_no_bg.png",10,56,89],
    ["premier-057-west-ham-united-third","West Ham United (Third)","West Ham United","Premier League","premier","2025/26 Season",25,"images/west3_no_bg.png",12,57,96],
    ["premier-058-wolverhampton-wanderers-home","Wolverhampton Wanderers (Home)","Wolverhampton Wanderers","Premier League","premier","2025/26 Season",25,"images/wolvesh.jpg",14,58,2],
    ["premier-059-wolverhampton-wanderers-away","Wolverhampton Wanderers (Away)","Wolverhampton Wanderers","Premier League","premier","2025/26 Season",25,"images/wolvesa.jpg",16,59,9],
    ["premier-060-wolverhampton-wanderers-third","Wolverhampton Wanderers (Third)","Wolverhampton Wanderers","Premier League","premier","2025/26 Season",25,"images/wol3.jpg",18,60,16],
    ["laliga-001-alaves-home","Alaves (Home)","Alaves","La Liga","laliga","2025/26 Season",25,"images/alavh.jpg",20,61,23],
    ["laliga-002-alaves-away","Alaves (Away)","Alaves","La Liga","laliga","2025/26 Season",25,"images/alava.jpg",22,62,30],
    ["laliga-003-alaves-third","Alaves (Third)","Alaves","La Liga","laliga","2025/26 Season",25,"images/alav3.jpg",3,63,37],
    ["laliga-004-athletic-club-home","Athletic Club (Home)","Athletic Club","La Liga","laliga","2025/26 Season",25,"images/athletich_no_bg_no_bg.png",10,64,44],
    ["laliga-005-athletic-club-away","Athletic Club (Away)","Athletic Club","La Liga","laliga","2025/26 Season",25,"images/athletica_no_bg.png",12,65,51],
    ["laliga-006-athletic-club-third","Athletic Club (Third)","Athletic Club","La Liga","laliga","2025/26 Season",25,"images/athletic3_no_bg.png",14,66,58],
    ["laliga-007-atletico-madrid-home","Atletico Madrid (Home)","Atletico Madrid","La Liga","laliga","2025/26 Season",25,"images/atlh.jpg",16,67,65],
    ["laliga-008-atletico-madrid-away","Atletico Madrid (Away)","Atletico Madrid","La Liga","laliga","2025/26 Season",25,"images/atla.jpg",0,68,72],
    ["laliga-009-atletico-madrid-third","Atletico Madrid (Third)","Atletico Madrid","La Liga","laliga","2025/26 Season",25,"images/atl3.jpg",20,69,79],
    ["laliga-010-barcelona-home","Barcelona (Home)","Barcelona","La Liga","laliga","2025/26 Season",25,"images/barcelonah_no_bg.png",22,70,86],
    ["laliga-011-barcelona-away","Barcelona (Away)","Barcelona","La Liga","laliga","2025/26 Season",25,"images/bara_no_bg.png",24,71,93],
    ["laliga-012-barcelona-third","Barcelona (Third)","Barcelona","La Liga","laliga","2025/26 Season",25,"images/barc3_no_bg.png",3,72,100],
    ["laliga-013-celta-vigo-home","Celta Vigo (Home)","Celta Vigo","La Liga","laliga","2025/26 Season",25,"images/celtah.jpg",12,73,6],
    ["laliga-014-celta-vigo-away","Celta Vigo (Away)","Celta Vigo","La Liga","laliga","2025/26 Season",25,"images/celtaa.jpg",14,74,13],
    ["laliga-015-celta-vigo-third","Celta Vigo (Third)","Celta Vigo","La Liga","laliga","2025/26 Season",25,"images/celta3.jpg",16,75,20],
    ["laliga-016-elche-home","Elche (Home)","Elche","La Liga","laliga","2025/26 Season",25,"images/elcheh.jpg",18,76,27],
    ["laliga-017-elche-away","Elche (Away)","Elche","La Liga","laliga","2025/26 Season",25,"images/elchea.jpg",20,77,34],
    ["laliga-018-elche-third","Elche (Third)","Elche","La Liga","laliga","2025/26 Season",25,"images/elch3.jpg",22,78,41],
    ["laliga-019-espanyol-home","Espanyol (Home)","Espanyol","La Liga","laliga","2025/26 Season",25,"images/esph.jpg",24,79,48],
    ["laliga-020-espanyol-away","Espanyol (Away)","Espanyol","La Liga","laliga","2025/26 Season",25,"images/espa.jpg",10,80,55],
    ["laliga-021-espanyol-third","Espanyol (Third)","Espanyol","La Liga","laliga","2025/26 Season",25,"images/esp3.jpg",3,81,62],
    ["laliga-022-getafe-home","Getafe (Home)","Getafe","La Liga","laliga","2025/26 Season",25,"images/geth_no_bg.png",14,82,69],
    ["laliga-023-getafe-away","Getafe (Away)","Getafe","La Liga","laliga","2025/26 Season",25,"images/geta_no_bg.png",16,83,76],
    ["laliga-024-getafe-third","Getafe (Third)","Getafe","La Liga","laliga","2025/26 Season",25,"images/get3_no_bg.png",18,84,83],
    ["laliga-025-girona-home","Girona (Home)","Girona","La Liga","laliga","2025/26 Season",25,"images/girh_no_bg.png",0,85,90],
    ["laliga-026-girona-away","Girona (Away)","Girona","La Liga","laliga","2025/26 Season",25,"images/gira_no_bg.png",22,86,97],
    ["laliga-027-girona-third","Girona (Third)","Girona","La Liga","laliga","2025/26 Season",25,"images/gir3_no_bg.png",24,87,3],
    ["laliga-028-levante-home","Levante (Home)","Levante","La Liga","laliga","2025/26 Season",25,"images/levh.jpg",10,88,10],
    ["laliga-029-levante-away","Levante (Away)","Levante","La Liga","laliga","2025/26 Season",25,"images/leva.jpg",12,89,17],
    ["laliga-030-levante-third","Levante (Third)","Levante","La Liga","laliga","2025/26 Season",25,"images/lev3.jpg",3,90,24],
    ["laliga-031-mallorca-home","Mallorca (Home)","Mallorca","La Liga","laliga","2025/26 Season",25,"images/malh.jpg",16,91,31],
    ["laliga-032-mallorca-away","Mallorca (Away)","Mallorca","La Liga","laliga","2025/26 Season",25,"images/mala.jpg",18,92,38],
    ["laliga-033-mallorca-third","Mallorca (Third)","Mallorca","La Liga","laliga","2025/26 Season",25,"images/mal3.jpg",20,93,45],
    ["laliga-034-osasuna-home","Osasuna (Home)","Osasuna","La Liga","laliga","2025/26 Season",25,"images/osah_no_bg.png",22,94,52],
    ["laliga-035-osasuna-away","Osasuna (Away)","Osasuna","La Liga","laliga","2025/26 Season",25,"images/osaa_no_bg.png",24,95,59],
    ["laliga-036-osasuna-third","Osasuna (Third)","Osasuna","La Liga","laliga","2025/26 Season",25,"images/osa3_no_bg.png",10,96,66],
    ["laliga-037-rayo-vallecano-home","Rayo Vallecano (Home)","Rayo Vallecano","La Liga","laliga","2025/26 Season",25,"images/rayh.jpg",12,97,73],
    ["laliga-038-rayo-vallecano-away","Rayo Vallecano (Away)","Rayo Vallecano","La Liga","laliga","2025/26 Season",25,"images/raya.jpg",14,98,80],
    ["laliga-039-rayo-vallecano-third","Rayo Vallecano (Third)","Rayo Vallecano","La Liga","laliga","2025/26 Season",25,"images/ray3.jpg",3,99,87],
    ["laliga-040-real-betis-home","Real Betis (Home)","Real Betis","La Liga","laliga","2025/26 Season",25,"images/betish.jpg",18,100,94],
    ["laliga-041-real-betis-away","Real Betis (Away)","Real Betis","La Liga","laliga","2025/26 Season",25,"images/betisa.jpg",20,101,0],
    ["laliga-042-real-betis-third","Real Betis (Third)","Real Betis","La Liga","laliga","2025/26 Season",25,"images/betis3.jpg",0,102,7],
    ["laliga-043-real-madrid-home","Real Madrid (Home)","Real Madrid","La Liga","laliga","2025/26 Season",25,"images/rmah.jpg",24,103,14],
    ["laliga-044-real-madrid-away","Real Madrid (Away)","Real Madrid","La Liga","laliga","2025/26 Season",25,"images/rmaa.jpg",10,104,21],
    ["laliga-045-real-madrid-third","Real Madrid (Third)","Real Madrid","La Liga","laliga","2025/26 Season",25,"images/rma3.jpg",12,105,28],
    ["laliga-046-real-oviedo-home","Real Oviedo (Home)","Real Oviedo","La Liga","laliga","2025/26 Season",25,"images/ovh.jpg",14,106,35],
    ["laliga-047-real-oviedo-away","Real Oviedo (Away)","Real Oviedo","La Liga","laliga","2025/26 Season",25,"images/ova.jpg",16,107,42],
    ["laliga-048-real-oviedo-third","Real Oviedo (Third)","Real Oviedo","La Liga","laliga","2025/26 Season",25,"images/ov3.jpg",3,108,49],
    ["laliga-049-real-sociedad-home","Real Sociedad (Home)","Real Sociedad","La Liga","laliga","2025/26 Season",25,"images/soch_no_bg.png",20,109,56],
    ["laliga-050-real-sociedad-away","Real Sociedad (Away)","Real Sociedad","La Liga","laliga","2025/26 Season",25,"images/soca_no_bg.png",22,110,63],
    ["laliga-051-real-sociedad-third","Real Sociedad (Third)","Real Sociedad","La Liga","laliga","2025/26 Season",25,"images/soc3_no_bg.png",24,111,70],
    ["laliga-052-sevilla-home","Sevilla (Home)","Sevilla","La Liga","laliga","2025/26 Season",25,"images/sevh.jpg",10,112,77],
    ["laliga-053-sevilla-away","Sevilla (Away)","Sevilla","La Liga","laliga","2025/26 Season",25,"images/seva.jpg",12,113,84],
    ["laliga-054-sevilla-third","Sevilla (Third)","Sevilla","La Liga","laliga","2025/26 Season",25,"images/sev3.jpg",14,114,91],
    ["laliga-055-valencia-home","Valencia (Home)","Valencia","La Liga","laliga","2025/26 Season",25,"images/valh_no_bg.png",16,115,98],
    ["laliga-056-valencia-away","Valencia (Away)","Valencia","La Liga","laliga","2025/26 Season",25,"images/vala_no_bg.png",18,116,4],
    ["laliga-057-valencia-third","Valencia (Third)","Valencia","La Liga","laliga","2025/26 Season",25,"images/val3_no_bg.png",3,117,11],
    ["laliga-058-villarreal-home","Villarreal (Home)","Villarreal","La Liga","laliga","2025/26 Season",25,"images/villah_no_bg.png",22,118,18],
    ["laliga-059-villarreal-away","Villarreal (Away)","Villarreal","La Liga","laliga","2025/26 Season",25,"images/villaa_no_bg.png",0,119,25],
    ["laliga-060-villarreal-third","Villarreal (Third)","Villarreal","La Liga","laliga","2025/26 Season",25,"images/villq3_no_bg.png",10,120,32],
    ["seriea-001-ac-milan-home","AC Milan (Home)","AC Milan","Serie A","seriea","2025/26 Season",25,"images/ach_no_bg.png",12,121,39],
    ["seriea-002-ac-milan-away","AC Milan (Away)","AC Milan","Serie A","seriea","2025/26 Season",25,"images/aca_no_bg_no_bg.png",14,122,46],
    ["seriea-003-ac-milan-third","AC Milan (Third)","AC Milan","Serie A","seriea","2025/26 Season",25,"images/ac3_no_bg_no_bg.png",16,123,53],
    ["seriea-004-as-roma-home","AS Roma (Home)","AS Roma","Serie A","seriea","2025/26 Season",25,"images/romh.jpg",18,124,60],
    ["seriea-005-as-roma-away","AS Roma (Away)","AS Roma","Serie A","seriea","2025/26 Season",25,"images/roma.jpg",20,125,67],
    ["seriea-006-as-roma-third","AS Roma (Third)","AS Roma","Serie A","seriea","2025/26 Season",25,"images/rom3.jpg",3,126,74],
    ["seriea-007-atalanta-home","Atalanta (Home)","Atalanta","Serie A","seriea","2025/26 Season",25,"images/atah.jpg",24,127,81],
    ["seriea-008-atalanta-away","Atalanta (Away)","Atalanta","Serie A","seriea","2025/26 Season",25,"images/ataa.jpg",10,128,88],
    ["seriea-009-atalanta-third","Atalanta (Third)","Atalanta","Serie A","seriea","2025/26 Season",25,"images/ata3.jpg",12,129,95],
    ["seriea-010-bologna-home","Bologna (Home)","Bologna","Serie A","seriea","2025/26 Season",25,"images/bolh.jpg",14,130,1],
    ["seriea-011-bologna-away","Bologna (Away)","Bologna","Serie A","seriea","2025/26 Season",25,"images/bola.jpg",16,131,8],
    ["seriea-012-bologna-third","Bologna (Third)","Bologna","Serie A","seriea","2025/26 Season",25,"images/bol3.jpg",18,132,15],
    ["seriea-013-cagliari-home","Cagliari (Home)","Cagliari","Serie A","seriea","2025/26 Season",25,"images/calh.jpg",20,133,22],
    ["seriea-014-cagliari-away","Cagliari (Away)","Cagliari","Serie A","seriea","2025/26 Season",25,"images/cala.jpg",22,134,29],
    ["seriea-015-cagliari-third","Cagliari (Third)","Cagliari","Serie A","seriea","2025/26 Season",25,"images/cal3.jpg",3,135,36],
    ["seriea-016-como-1907-home","Como 1907 (Home)","Como 1907","Serie A","seriea","2025/26 Season",25,"images/comoh_no_bg.png",0,136,43],
    ["seriea-017-como-1907-away","Como 1907 (Away)","Como 1907","Serie A","seriea","2025/26 Season",25,"images/comoa_no_bg.png",12,137,50],
    ["seriea-018-como-1907-third","Como 1907 (Third)","Como 1907","Serie A","seriea","2025/26 Season",25,"images/como3_no_bg.png",14,138,57],
    ["seriea-019-us-cremonese-home","US Cremonese (Home)","US Cremonese","Serie A","seriea","2025/26 Season",25,"images/cremoh.jpg",16,139,64],
    ["seriea-020-us-cremonese-away","US Cremonese (Away)","US Cremonese","Serie A","seriea","2025/26 Season",25,"images/cremoa.jpg",18,140,71],
    ["seriea-021-us-cremonese-third","US Cremonese (Third)","US Cremonese","Serie A","seriea","2025/26 Season",25,"images/cremo3.jpg",20,141,78],
    ["seriea-022-fiorentina-home","Fiorentina (Home)","Fiorentina","Serie A","seriea","2025/26 Season",25,"images/fiorh.jpg",22,142,85],
    ["seriea-023-fiorentina-away","Fiorentina (Away)","Fiorentina","Serie A","seriea","2025/26 Season",25,"images/fiora.jpg",24,143,92],
    ["seriea-024-fiorentina-third","Fiorentina (Third)","Fiorentina","Serie A","seriea","2025/26 Season",25,"images/fior3.jpg",3,144,99],
    ["seriea-025-genoa-home","Genoa (Home)","Genoa","Serie A","seriea","2025/26 Season",25,"images/genoah.jpg",12,145,5],
    ["seriea-026-genoa-away","Genoa (Away)","Genoa","Serie A","seriea","2025/26 Season",25,"images/genoaa.jpg",14,146,12],
    ["seriea-027-genoa-third","Genoa (Third)","Genoa","Serie A","seriea","2025/26 Season",25,"images/genoa3.jpg",16,147,19],
    ["seriea-028-hellas-verona-home","Hellas Verona (Home)","Hellas Verona","Serie A","seriea","2025/26 Season",25,"images/veronah_no_bg.png",18,148,26],
    ["seriea-029-hellas-verona-away","Hellas Verona (Away)","Hellas Verona","Serie A","seriea","2025/26 Season",25,"images/verona_no_bg.png",20,149,33],
    ["seriea-030-hellas-verona-third","Hellas Verona (Third)","Hellas Verona","Serie A","seriea","2025/26 Season",25,"images/verona3_no_bg.png",22,150,40],
    ["seriea-031-inter-milan-home","Inter Milan (Home)","Inter Milan","Serie A","seriea","2025/26 Season",25,"images/interh.jpg",24,151,47],
    ["seriea-032-inter-milan-away","Inter Milan (Away)","Inter Milan","Serie A","seriea","2025/26 Season",25,"images/intera.jpg",10,152,54],
    ["seriea-033-inter-milan-third","Inter Milan (Third)","Inter Milan","Serie A","seriea","2025/26 Season",25,"images/inter3.jpg",0,153,61],
    ["seriea-034-juventus-home","Juventus (Home)","Juventus","Serie A","seriea","2025/26 Season",25,"images/juvh.jpg",14,154,68],
    ["seriea-035-juventus-away","Juventus (Away)","Juventus","Serie A","seriea","2025/26 Season",25,"images/jueva.jpg",16,155,75],
    ["seriea-036-juventus-third","Juventus (Third)","Juventus","Serie A","seriea","2025/26 Season",25,"images/juev3.jpg",18,156,82],
    ["seriea-037-lazio-home","Lazio (Home)","Lazio","Serie A","seriea","2025/26 Season",25,"images/lazioh.jpg",20,157,89],
    ["seriea-038-lazio-away","Lazio (Away)","Lazio","Serie A","seriea","2025/26 Season",25,"images/lazioa.jpg",22,158,96],
    ["seriea-039-lazio-third","Lazio (Third)","Lazio","Serie A","seriea","2025/26 Season",25,"images/lazio3.jpg",24,159,2],
    ["seriea-040-lecce-home","Lecce (Home)","Lecce","Serie A","seriea","2025/26 Season",25,"images/lecceh_no_bg.png",10,160,9],
    ["seriea-041-lecce-away","Lecce (Away)","Lecce","Serie A","seriea","2025/26 Season",25,"images/leccea_no_bg.png",12,161,16],
    ["seriea-042-lecce-third","Lecce (Third)","Lecce","Serie A","seriea","2025/26 Season",25,"images/lecce3_no_bg.png",3,162,23],
    ["seriea-043-napoli-home","Napoli (Home)","Napoli","Serie A","seriea","2025/26 Season",25,"images/napolih.jpg",16,163,30],
    ["seriea-044-napoli-away","Napoli (Away)","Napoli","Serie A","seriea","2025/26 Season",25,"images/napolia.jpg",18,164,37],
    ["seriea-045-napoli-third","Napoli (Third)","Napoli","Serie A","seriea","2025/26 Season",25,"images/napoli3.jpg",20,165,44],
    ["seriea-046-parma-calcio-1913-home","Parma Calcio 1913 (Home)","Parma Calcio 1913","Serie A","seriea","2025/26 Season",25,"images/parmah.jpg",22,166,51],
    ["seriea-047-parma-calcio-1913-away","Parma Calcio 1913 (Away)","Parma Calcio 1913","Serie A","seriea","2025/26 Season",25,"images/parmaa.jpg",24,167,58],
    ["seriea-048-parma-calcio-1913-third","Parma Calcio 1913 (Third)","Parma Calcio 1913","Serie A","seriea","2025/26 Season",25,"images/parma3.jpg",10,168,65],
    ["seriea-049-pisa-sc-home","Pisa SC (Home)","Pisa SC","Serie A","seriea","2025/26 Season",25,"images/pisah_no_bg.png",12,169,72],
    ["seriea-050-pisa-sc-away","Pisa SC (Away)","Pisa SC","Serie A","seriea","2025/26 Season",25,"images/pisaa_no_bg.png",0,170,79],
    ["seriea-051-pisa-sc-third","Pisa SC (Third)","Pisa SC","Serie A","seriea","2025/26 Season",25,"images/pisa3_no_bg.png",3,171,86],
    ["seriea-052-sassuolo-home","Sassuolo (Home)","Sassuolo","Serie A","seriea","2025/26 Season",25,"images/sassh.jpg",18,172,93],
    ["seriea-053-sassuolo-away","Sassuolo (Away)","Sassuolo","Serie A","seriea","2025/26 Season",25,"images/sassa.jpg",20,173,100],
    ["seriea-054-sassuolo-third","Sassuolo (Third)","Sassuolo","Serie A","seriea","2025/26 Season",25,"images/sass3.jpg",22,174,6],
    ["seriea-055-torino-home","Torino (Home)","Torino","Serie A","seriea","2025/26 Season",25,"images/torh.jpg",24,175,13],
    ["seriea-056-torino-away","Torino (Away)","Torino","Serie A","seriea","2025/26 Season",25,"images/toria.jpg",10,176,20],
    ["seriea-057-torino-third","Torino (Third)","Torino","Serie A","seriea","2025/26 Season",25,"images/tor3.jpg",12,177,27],
    ["seriea-058-udinese-home","Udinese (Home)","Udinese","Serie A","seriea","2025/26 Season",25,"images/udineseh_no_bg.png",14,178,34],
    ["seriea-059-udinese-away","Udinese (Away)","Udinese","Serie A","seriea","2025/26 Season",25,"images/udinesea_no_bg.png",16,179,41],
    ["seriea-060-udinese-third","Udinese (Third)","Udinese","Serie A","seriea","2025/26 Season",25,"images/udinese3_no_bg.png",3,180,48],
    ["bundesliga-001-fc-augsburg-home","FC Augsburg (Home)","FC Augsburg","Bundesliga","bundesliga","2025/26 Season",25,"images/augh.jpg",20,181,55],
    ["bundesliga-002-fc-augsburg-away","FC Augsburg (Away)","FC Augsburg","Bundesliga","bundesliga","2025/26 Season",25,"images/auga.jpg",22,182,62],
    ["bundesliga-003-fc-augsburg-third","FC Augsburg (Third)","FC Augsburg","Bundesliga","bundesliga","2025/26 Season",25,"images/aug3.jpg",24,183,69],
    ["bundesliga-004-bayer-leverkusen-home","Bayer Leverkusen (Home)","Bayer Leverkusen","Bundesliga","bundesliga","2025/26 Season",25,"images/leverh_no_bg.png",10,184,76],
    ["bundesliga-005-bayer-leverkusen-away","Bayer Leverkusen (Away)","Bayer Leverkusen","Bundesliga","bundesliga","2025/26 Season",25,"images/levera_no_bg.png",12,185,83],
    ["bundesliga-006-bayer-leverkusen-third","Bayer Leverkusen (Third)","Bayer Leverkusen","Bundesliga","bundesliga","2025/26 Season",25,"images/lever3_no_bg.png",14,186,90],
    ["bundesliga-007-bayern-munich-home","Bayern Munich (Home)","Bayern Munich","Bundesliga","bundesliga","2025/26 Season",25,"images/bayernh.jpg",0,187,97],
    ["bundesliga-008-bayern-munich-away","Bayern Munich (Away)","Bayern Munich","Bundesliga","bundesliga","2025/26 Season",25,"images/bayerna.jpg",18,188,3],
    ["bundesliga-009-bayern-munich-third","Bayern Munich (Third)","Bayern Munich","Bundesliga","bundesliga","2025/26 Season",25,"images/bayern3.jpg",3,189,10],
    ["bundesliga-010-borussia-dortmund-home","Borussia Dortmund (Home)","Borussia Dortmund","Bundesliga","bundesliga","2025/26 Season",25,"images/bvbh.jpg",22,190,17],
    ["bundesliga-011-borussia-dortmund-away","Borussia Dortmund (Away)","Borussia Dortmund","Bundesliga","bundesliga","2025/26 Season",25,"images/bvba.jpg",24,191,24],
    ["bundesliga-012-borussia-dortmund-third","Borussia Dortmund (Third)","Borussia Dortmund","Bundesliga","bundesliga","2025/26 Season",25,"images/bvb3.jpg",10,192,31],
    ["bundesliga-013-borussia-monchengladbach-home","Borussia Monchengladbach (Home)","Borussia Monchengladbach","Bundesliga","bundesliga","2025/26 Season",25,"images/bmh.jpg",12,193,38],
    ["bundesliga-014-borussia-monchengladbach-away","Borussia Monchengladbach (Away)","Borussia Monchengladbach","Bundesliga","bundesliga","2025/26 Season",25,"images/bma.jpg",14,194,45],
    ["bundesliga-015-borussia-monchengladbach-third","Borussia Monchengladbach (Third)","Borussia Monchengladbach","Bundesliga","bundesliga","2025/26 Season",25,"images/bm3.jpg",16,195,52],
    ["bundesliga-016-eintracht-frankfurt-home","Eintracht Frankfurt (Home)","Eintracht Frankfurt","Bundesliga","bundesliga","2025/26 Season",25,"images/frankh.jpg",18,196,59],
    ["bundesliga-017-eintracht-frankfurt-away","Eintracht Frankfurt (Away)","Eintracht Frankfurt","Bundesliga","bundesliga","2025/26 Season",25,"images/franka.jpg",20,197,66],
    ["bundesliga-018-eintracht-frankfurt-third","Eintracht Frankfurt (Third)","Eintracht Frankfurt","Bundesliga","bundesliga","2025/26 Season",25,"images/frank3.jpg",3,198,73],
    ["bundesliga-019-sc-freiburg-home","SC Freiburg (Home)","SC Freiburg","Bundesliga","bundesliga","2025/26 Season",25,"images/freibh.jpg",24,199,80],
    ["bundesliga-020-sc-freiburg-away","SC Freiburg (Away)","SC Freiburg","Bundesliga","bundesliga","2025/26 Season",25,"images/freiba.jpg",10,200,87],
    ["bundesliga-021-sc-freiburg-third","SC Freiburg (Third)","SC Freiburg","Bundesliga","bundesliga","2025/26 Season",25,"images/freib3.jpg",12,201,94],
    ["bundesliga-022-hamburger-sv-home","Hamburger SV (Home)","Hamburger SV","Bundesliga","bundesliga","2025/26 Season",25,"images/hamburgh.jpg",14,202,0],
    ["bundesliga-023-hamburger-sv-away","Hamburger SV (Away)","Hamburger SV","Bundesliga","bundesliga","2025/26 Season",25,"images/hamburga.jpg",16,203,7],
    ["bundesliga-024-hamburger-sv-third","Hamburger SV (Third)","Hamburger SV","Bundesliga","bundesliga","2025/26 Season",25,"images/hamburg3.jpg",0,204,14],
    ["bundesliga-025-1-fc-heidenheim-home","1. FC Heidenheim (Home)","1. FC Heidenheim","Bundesliga","bundesliga","2025/26 Season",25,"images/fcheih.jpg",20,205,21],
    ["bundesliga-026-1-fc-heidenheim-away","1. FC Heidenheim (Away)","1. FC Heidenheim","Bundesliga","bundesliga","2025/26 Season",25,"images/fcheia.jpg",22,206,28],
    ["bundesliga-027-1-fc-heidenheim-third","1. FC Heidenheim (Third)","1. FC Heidenheim","Bundesliga","bundesliga","2025/26 Season",25,"images/fchei3.jpg",3,207,35],
    ["bundesliga-028-tsg-hoffenheim-home","TSG Hoffenheim (Home)","TSG Hoffenheim","Bundesliga","bundesliga","2025/26 Season",25,"images/hoffh_no_bg.png",10,208,42],
    ["bundesliga-029-tsg-hoffenheim-away","TSG Hoffenheim (Away)","TSG Hoffenheim","Bundesliga","bundesliga","2025/26 Season",25,"images/hoffa_no_bg.png",12,209,49],
    ["bundesliga-030-tsg-hoffenheim-third","TSG Hoffenheim (Third)","TSG Hoffenheim","Bundesliga","bundesliga","2025/26 Season",25,"images/hoff3_no_bg.png",14,210,56],
    ["bundesliga-031-1-fc-koln-home","1. FC Koln (Home)","1. FC Koln","Bundesliga","bundesliga","2025/26 Season",25,"images/kolnh.jpg",16,211,63],
    ["bundesliga-032-1-fc-koln-away","1. FC Koln (Away)","1. FC Koln","Bundesliga","bundesliga","2025/26 Season",25,"images/kolna.jpg",18,212,70],
    ["bundesliga-033-1-fc-koln-third","1. FC Koln (Third)","1. FC Koln","Bundesliga","bundesliga","2025/26 Season",25,"images/koln3.jpg",20,213,77],
    ["bundesliga-034-rb-leipzig-home","RB Leipzig (Home)","RB Leipzig","Bundesliga","bundesliga","2025/26 Season",25,"images/leiph.jpg",22,214,84],
    ["bundesliga-035-rb-leipzig-away","RB Leipzig (Away)","RB Leipzig","Bundesliga","bundesliga","2025/26 Season",25,"images/leipa.jpg",24,215,91],
    ["bundesliga-036-rb-leipzig-third","RB Leipzig (Third)","RB Leipzig","Bundesliga","bundesliga","2025/26 Season",25,"images/leip3.jpg",3,216,98],
    ["bundesliga-037-fc-st-pauli-home","FC St. Pauli (Home)","FC St. Pauli","Bundesliga","bundesliga","2025/26 Season",25,"images/paulih.jpg",12,217,4],
    ["bundesliga-038-fc-st-pauli-away","FC St. Pauli (Away)","FC St. Pauli","Bundesliga","bundesliga","2025/26 Season",25,"images/paulia.jpg",14,218,11],
    ["bundesliga-039-fc-st-pauli-third","FC St. Pauli (Third)","FC St. Pauli","Bundesliga","bundesliga","2025/26 Season",25,"images/pauli3.jpg",16,219,18],
    ["bundesliga-040-vfb-stuttgart-home","VfB Stuttgart (Home)","VfB Stuttgart","Bundesliga","bundesliga","2025/26 Season",25,"images/stutth.jpg",18,220,25],
    ["bundesliga-041-vfb-stuttgart-away","VfB Stuttgart (Away)","VfB Stuttgart","Bundesliga","bundesliga","2025/26 Season",25,"images/stutta.jpg",0,221,32],
    ["bundesliga-042-vfb-stuttgart-third","VfB Stuttgart (Third)","VfB Stuttgart","Bundesliga","bundesliga","2025/26 Season",25,"images/stutt3.jpg",22,222,39],
    ["bundesliga-043-union-berlin-home","Union Berlin (Home)","Union Berlin","Bundesliga","bundesliga","2025/26 Season",25,"images/unionh.jpg",24,223,46],
    ["bundesliga-044-union-berlin-away","Union Berlin (Away)","Union Berlin","Bundesliga","bundesliga","2025/26 Season",25,"images/uniona.jpg",10,224,53],
    ["bundesliga-045-union-berlin-third","Union Berlin (Third)","Union Berlin","Bundesliga","bundesliga","2025/26 Season",25,"images/union3.jpg",3,225,60],
    ["bundesliga-046-werder-bremen-home","Werder Bremen (Home)","Werder Bremen","Bundesliga","bundesliga","2025/26 Season",25,"images/bremenh.jpg",14,226,67],
    ["bundesliga-047-werder-bremen-away","Werder Bremen (Away)","Werder Bremen","Bundesliga","bundesliga","2025/26 Season",25,"images/bremena.jpg",16,227,74],
    ["bundesliga-048-werder-bremen-third","Werder Bremen (Third)","Werder Bremen","Bundesliga","bundesliga","2025/26 Season",25,"images/bremen3.jpg",18,228,81],
    ["bundesliga-049-vfl-wolfsburg-home","VfL Wolfsburg (Home)","VfL Wolfsburg","Bundesliga","bundesliga","2025/26 Season",25,"images/wolfsbh.jpg",20,229,88],
    ["bundesliga-050-vfl-wolfsburg-away","VfL Wolfsburg (Away)","VfL Wolfsburg","Bundesliga","bundesliga","2025/26 Season",25,"images/wolfsba.jpg",22,230,95],
    ["bundesliga-051-vfl-wolfsburg-third","VfL Wolfsburg (Third)","VfL Wolfsburg","Bundesliga","bundesliga","2025/26 Season",25,"images/wolfsb3.jpg",24,231,1],
    ["ligue1-001-aj-auxerre-home","AJ Auxerre (Home)","AJ Auxerre","Ligue 1","ligue1","2025/26 Season",25,"images/auxerreh_no_bg.png",10,232,8],
    ["ligue1-002-aj-auxerre-away","AJ Auxerre (Away)","AJ Auxerre","Ligue 1","ligue1","2025/26 Season",25,"images/auxerrea_no_bg.png",12,233,15],
    ["ligue1-003-aj-auxerre-third","AJ Auxerre (Third)","AJ Auxerre","Ligue 1","ligue1","2025/26 Season",25,"images/auxerre3_no_bg.png",3,234,22],
    ["ligue1-004-angers-sco-home","Angers SCO (Home)","Angers SCO","Ligue 1","ligue1","2025/26 Season",25,"images/angersh.jpg",16,235,29],
    ["ligue1-005-angers-sco-away","Angers SCO (Away)","Angers SCO","Ligue 1","ligue1","2025/26 Season",25,"images/angersa.jpg",18,236,36],
    ["ligue1-006-angers-sco-third","Angers SCO (Third)","Angers SCO","Ligue 1","ligue1","2025/26 Season",25,"images/angers3.jpg",20,237,43],
    ["ligue1-007-stade-brestois-29-home","Stade Brestois 29 (Home)","Stade Brestois 29","Ligue 1","ligue1","2025/26 Season",25,"images/stadebh_no_bg.png",0,238,50],
    ["ligue1-008-stade-brestois-29-away","Stade Brestois 29 (Away)","Stade Brestois 29","Ligue 1","ligue1","2025/26 Season",25,"images/stadeba_no_bg.png",24,239,57],
    ["ligue1-009-stade-brestois-29-third","Stade Brestois 29 (Third)","Stade Brestois 29","Ligue 1","ligue1","2025/26 Season",25,"images/stadeb3_no_bg.png",10,240,64],
    ["ligue1-010-rc-lens-home","RC Lens (Home)","RC Lens","Ligue 1","ligue1","2025/26 Season",25,"images/lensh.jpg",12,241,71],
    ["ligue1-011-rc-lens-away","RC Lens (Away)","RC Lens","Ligue 1","ligue1","2025/26 Season",25,"images/lensa.jpg",14,242,78],
    ["ligue1-012-rc-lens-third","RC Lens (Third)","RC Lens","Ligue 1","ligue1","2025/26 Season",25,"images/lens3.jpg",3,243,85],
    ["ligue1-013-losc-lille-home","LOSC Lille (Home)","LOSC Lille","Ligue 1","ligue1","2025/26 Season",25,"images/lilleh.jpg",18,244,92],
    ["ligue1-014-losc-lille-away","LOSC Lille (Away)","LOSC Lille","Ligue 1","ligue1","2025/26 Season",25,"images/lillea.jpg",20,245,99],
    ["ligue1-015-losc-lille-third","LOSC Lille (Third)","LOSC Lille","Ligue 1","ligue1","2025/26 Season",25,"images/lille3.jpg",22,246,5],
    ["ligue1-016-fc-lorient-home","FC Lorient (Home)","FC Lorient","Ligue 1","ligue1","2025/26 Season",25,"images/lorienth.jpg",24,247,12],
    ["ligue1-017-fc-lorient-away","FC Lorient (Away)","FC Lorient","Ligue 1","ligue1","2025/26 Season",25,"images/lorienta.jpg",10,248,19],
    ["ligue1-018-fc-lorient-third","FC Lorient (Third)","FC Lorient","Ligue 1","ligue1","2025/26 Season",25,"images/lorient3.jpg",12,249,26],
    ["ligue1-019-le-havre-ac-home","Le Havre AC (Home)","Le Havre AC","Ligue 1","ligue1","2025/26 Season",25,"images/lehavreh.jpg",14,250,33],
    ["ligue1-020-le-havre-ac-away","Le Havre AC (Away)","Le Havre AC","Ligue 1","ligue1","2025/26 Season",25,"images/lehavrea.jpg",16,251,40],
    ["ligue1-021-le-havre-ac-third","Le Havre AC (Third)","Le Havre AC","Ligue 1","ligue1","2025/26 Season",25,"images/lehavre3.jpg",3,252,47],
    ["ligue1-022-olympique-lyonnais-home","Olympique Lyonnais (Home)","Olympique Lyonnais","Ligue 1","ligue1","2025/26 Season",25,"images/olh.jpg",20,253,54],
    ["ligue1-023-olympique-lyonnais-away","Olympique Lyonnais (Away)","Olympique Lyonnais","Ligue 1","ligue1","2025/26 Season",25,"images/ola.jpg",22,254,61],
    ["ligue1-024-olympique-lyonnais-third","Olympique Lyonnais (Third)","Olympique Lyonnais","Ligue 1","ligue1","2025/26 Season",25,"images/ol3.jpg",0,255,68],
    ["ligue1-025-olympique-de-marseille-home","Olympique de Marseille (Home)","Olympique de Marseille","Ligue 1","ligue1","2025/26 Season",25,"images/marseilleh.jpg",10,256,75],
    ["ligue1-026-olympique-de-marseille-away","Olympique de Marseille (Away)","Olympique de Marseille","Ligue 1","ligue1","2025/26 Season",25,"images/marseillea.jpg",12,257,82],
    ["ligue1-027-olympique-de-marseille-third","Olympique de Marseille (Third)","Olympique de Marseille","Ligue 1","ligue1","2025/26 Season",25,"images/marseille3.jpg",14,258,89],
    ["ligue1-028-fc-metz-home","FC Metz (Home)","FC Metz","Ligue 1","ligue1","2025/26 Season",25,"images/metzh.jpg",16,259,96],
    ["ligue1-029-fc-metz-away","FC Metz (Away)","FC Metz","Ligue 1","ligue1","2025/26 Season",25,"images/metza.jpg",18,260,2],
    ["ligue1-030-fc-metz-third","FC Metz (Third)","FC Metz","Ligue 1","ligue1","2025/26 Season",25,"images/metz3.jpg",3,261,9],
    ["ligue1-031-as-monaco-home","AS Monaco (Home)","AS Monaco","Ligue 1","ligue1","2025/26 Season",25,"images/monacoh.jpg",22,262,16],
    ["ligue1-032-as-monaco-away","AS Monaco (Away)","AS Monaco","Ligue 1","ligue1","2025/26 Season",25,"images/monacoa.jpg",24,263,23],
    ["ligue1-033-as-monaco-third","AS Monaco (Third)","AS Monaco","Ligue 1","ligue1","2025/26 Season",25,"images/monaco3.jpg",10,264,30],
    ["ligue1-034-fc-nantes-home","FC Nantes (Home)","FC Nantes","Ligue 1","ligue1","2025/26 Season",25,"images/nantesh_no_bg.png",12,265,37],
    ["ligue1-035-fc-nantes-away","FC Nantes (Away)","FC Nantes","Ligue 1","ligue1","2025/26 Season",25,"images/nantesa_no_bg.png",14,266,44],
    ["ligue1-036-fc-nantes-third","FC Nantes (Third)","FC Nantes","Ligue 1","ligue1","2025/26 Season",25,"images/nantes3_no_bg.png",16,267,51],
    ["ligue1-037-ogc-nice-home","OGC Nice (Home)","OGC Nice","Ligue 1","ligue1","2025/26 Season",25,"images/niceh.jpg",18,268,58],
    ["ligue1-038-ogc-nice-away","OGC Nice (Away)","OGC Nice","Ligue 1","ligue1","2025/26 Season",25,"images/nicea.jpg",20,269,65],
    ["ligue1-039-ogc-nice-third","OGC Nice (Third)","OGC Nice","Ligue 1","ligue1","2025/26 Season",25,"images/nice3.jpg",3,270,72],
    ["ligue1-040-paris-fc-home","Paris FC (Home)","Paris FC","Ligue 1","ligue1","2025/26 Season",25,"images/parisfch_no_bg.png",24,271,79],
    ["ligue1-041-paris-fc-away","Paris FC (Away)","Paris FC","Ligue 1","ligue1","2025/26 Season",25,"images/parisfca_no_bg.png",0,272,86],
    ["ligue1-042-paris-fc-third","Paris FC (Third)","Paris FC","Ligue 1","ligue1","2025/26 Season",25,"images/parisfc3_no_bg.png",12,273,93],
    ["ligue1-043-paris-saint-germain-home","Paris Saint-Germain (Home)","Paris Saint-Germain","Ligue 1","ligue1","2025/26 Season",25,"images/psgh.jpg",14,274,100],
    ["ligue1-044-paris-saint-germain-away","Paris Saint-Germain (Away)","Paris Saint-Germain","Ligue 1","ligue1","2025/26 Season",25,"images/psga.jpg",16,275,6],
    ["ligue1-045-paris-saint-germain-third","Paris Saint-Germain (Third)","Paris Saint-Germain","Ligue 1","ligue1","2025/26 Season",25,"images/psg3.jpg",18,276,13],
    ["ligue1-046-stade-rennais-home","Stade Rennais (Home)","Stade Rennais","Ligue 1","ligue1","2025/26 Season",25,"images/srh.jpg",20,277,20],
    ["ligue1-047-stade-rennais-away","Stade Rennais (Away)","Stade Rennais","Ligue 1","ligue1","2025/26 Season",25,"images/sra.jpg",22,278,27],
    ["ligue1-048-stade-rennais-third","Stade Rennais (Third)","Stade Rennais","Ligue 1","ligue1","2025/26 Season",25,"images/sr3.jpg",3,279,34],
    ["ligue1-049-strasbourg-alsace-home","Strasbourg Alsace (Home)","Strasbourg Alsace","Ligue 1","ligue1","2025/26 Season",25,"images/strash_no_bg.png",10,280,41],
    ["ligue1-050-strasbourg-alsace-away","Strasbourg Alsace (Away)","Strasbourg Alsace","Ligue 1","ligue1","2025/26 Season",25,"images/strasa_no_bg.png",12,281,48],
    ["ligue1-051-strasbourg-alsace-third","Strasbourg Alsace (Third)","Strasbourg Alsace","Ligue 1","ligue1","2025/26 Season",25,"images/stras3_no_bg.png",14,282,55],
    ["ligue1-052-toulouse-fc-home","Toulouse FC (Home)","Toulouse FC","Ligue 1","ligue1","2025/26 Season",25,"images/toulh.jpg",16,283,62],
    ["ligue1-053-toulouse-fc-away","Toulouse FC (Away)","Toulouse FC","Ligue 1","ligue1","2025/26 Season",25,"images/toula.jpg",18,284,69],
    ["ligue1-054-toulouse-fc-third","Toulouse FC (Third)","Toulouse FC","Ligue 1","ligue1","2025/26 Season",25,"images/toul3.jpg",20,285,76],
    ["rest-001-ajax-home","Ajax (Home)","Ajax","Rest of the World","rest","2025/26 Season",25,"images/ajaxh_no_bg.png",22,286,83],
    ["rest-002-ajax-away","Ajax (Away)","Ajax","Rest of the World","rest","2025/26 Season",25,"images/ajaxa_no_bg.png",24,287,90],
    ["rest-003-ajax-third","Ajax (Third)","Ajax","Rest of the World","rest","2025/26 Season",25,"images/ajax3_no_bg.png",3,288,97],
    ["rest-004-al-ahli-saudi-home","Al Ahli (Saudi) (Home)","Al Ahli (Saudi)","Rest of the World","rest","2025/26 Season",25,"images/alahlih_no_bg.png",0,289,3],
    ["rest-005-al-ahli-saudi-away","Al Ahli (Saudi) (Away)","Al Ahli (Saudi)","Rest of the World","rest","2025/26 Season",25,"images/alahlia_no_bg.png",14,290,10],
    ["rest-006-al-ahli-saudi-third","Al Ahli (Saudi) (Third)","Al Ahli (Saudi)","Rest of the World","rest","2025/26 Season",25,"images/alahli3_no_bg.png",16,291,17],
    ["rest-007-al-ahly-egypt-home","Al Ahly (Egypt) (Home)","Al Ahly (Egypt)","Rest of the World","rest","2025/26 Season",25,"images/alahlyyh_no_bg.png",18,292,24],
    ["rest-008-al-ahly-egypt-away","Al Ahly (Egypt) (Away)","Al Ahly (Egypt)","Rest of the World","rest","2025/26 Season",25,"images/alahlyya_no_bg.png",20,293,31],
    ["rest-009-al-ahly-egypt-third","Al Ahly (Egypt) (Third)","Al Ahly (Egypt)","Rest of the World","rest","2025/26 Season",25,"images/alahlyy3_no_bg.png",22,294,38],
    ["rest-010-al-hilal-home","Al Hilal (Home)","Al Hilal","Rest of the World","rest","2025/26 Season",25,"images/hilalh.jpg",24,295,45],
    ["rest-011-al-hilal-away","Al Hilal (Away)","Al Hilal","Rest of the World","rest","2025/26 Season",25,"images/hilala.jpg",10,296,52],
    ["rest-012-al-hilal-third","Al Hilal (Third)","Al Hilal","Rest of the World","rest","2025/26 Season",25,"images/hilal3.jpg",3,297,59],
    ["rest-013-al-ittihad-home","Al Ittihad (Home)","Al Ittihad","Rest of the World","rest","2025/26 Season",25,"images/ittihAdh_no_bg.png",14,298,66],
    ["rest-014-al-ittihad-away","Al Ittihad (Away)","Al Ittihad","Rest of the World","rest","2025/26 Season",25,"images/ittihada_no_bg.png",16,299,73],
    ["rest-015-al-ittihad-third","Al Ittihad (Third)","Al Ittihad","Rest of the World","rest","2025/26 Season",25,"images/ittihad3_no_bg.png",18,300,80],
    ["rest-016-al-nassr-home","Al Nassr (Home)","Al Nassr","Rest of the World","rest","2025/26 Season",25,"images/nassreh_no_bg.png",20,301,87],
    ["rest-017-al-nassr-away","Al Nassr (Away)","Al Nassr","Rest of the World","rest","2025/26 Season",25,"images/nassera_no_bg.png",22,302,94],
    ["rest-018-al-nassr-third","Al Nassr (Third)","Al Nassr","Rest of the World","rest","2025/26 Season",25,"images/nassr3_no_bg.png",24,303,0],
    ["rest-019-benfica-home","Benfica (Home)","Benfica","Rest of the World","rest","2025/26 Season",25,"images/benficah_no_bg.png",10,304,7],
    ["rest-020-benfica-away","Benfica (Away)","Benfica","Rest of the World","rest","2025/26 Season",25,"images/benficaa_no_bg.png",12,305,14],
    ["rest-021-benfica-third","Benfica (Third)","Benfica","Rest of the World","rest","2025/26 Season",25,"images/benfica3_no_bg.png",0,306,21],
    ["rest-022-club-america-home","Club America (Home)","Club America","Rest of the World","rest","2025/26 Season",25,"images/clubah_no_bg.png",16,307,28],
    ["rest-023-club-america-away","Club America (Away)","Club America","Rest of the World","rest","2025/26 Season",25,"images/clubaa_no_bg.png",18,308,35],
    ["rest-024-club-america-third","Club America (Third)","Club America","Rest of the World","rest","2025/26 Season",25,"images/cluba3_no_bg.png",20,309,42],
    ["rest-025-fc-porto-home","FC Porto (Home)","FC Porto","Rest of the World","rest","2025/26 Season",25,"images/portoh.jpg",22,310,49],
    ["rest-026-fc-porto-away","FC Porto (Away)","FC Porto","Rest of the World","rest","2025/26 Season",25,"images/portoa.jpg",24,311,56],
    ["rest-027-fc-porto-third","FC Porto (Third)","FC Porto","Rest of the World","rest","2025/26 Season",25,"images/porto3.jpg",10,312,63],
    ["rest-028-fenerbahce-home","Fenerbahce (Home)","Fenerbahce","Rest of the World","rest","2025/26 Season",25,"images/fenerh_no_bg.png",12,313,70],
    ["rest-029-fenerbahce-away","Fenerbahce (Away)","Fenerbahce","Rest of the World","rest","2025/26 Season",25,"images/feneta_no_bg.png",14,314,77],
    ["rest-030-fenerbahce-third","Fenerbahce (Third)","Fenerbahce","Rest of the World","rest","2025/26 Season",25,"images/fene3_no_bg.png",3,315,84],
    ["rest-031-flamengo-home","Flamengo (Home)","Flamengo","Rest of the World","rest","2025/26 Season",25,"images/flamengoh_no_bg.png",18,316,91],
    ["rest-032-flamengo-away","Flamengo (Away)","Flamengo","Rest of the World","rest","2025/26 Season",25,"images/flamengoa_no_bg.png",20,317,98],
    ["rest-033-flamengo-third","Flamengo (Third)","Flamengo","Rest of the World","rest","2025/26 Season",25,"images/flamengo3_no_bg.png",22,318,4],
    ["rest-034-galatasaray-home","Galatasaray (Home)","Galatasaray","Rest of the World","rest","2025/26 Season",25,"images/galah.jpg",24,319,11],
    ["rest-035-galatasaray-away","Galatasaray (Away)","Galatasaray","Rest of the World","rest","2025/26 Season",25,"images/galaa.jpg",10,320,18],
    ["rest-036-galatasaray-third","Galatasaray (Third)","Galatasaray","Rest of the World","rest","2025/26 Season",25,"images/gala3.jpg",12,321,25],
    ["rest-037-inter-miami-home","Inter Miami (Home)","Inter Miami","Rest of the World","rest","2025/26 Season",25,"images/intermih.jpg",14,322,32],
    ["rest-038-inter-miami-away","Inter Miami (Away)","Inter Miami","Rest of the World","rest","2025/26 Season",25,"images/intermia.jpg",0,323,39],
    ["rest-039-inter-miami-third","Inter Miami (Third)","Inter Miami","Rest of the World","rest","2025/26 Season",25,"images/intermi3.jpg",3,324,46],
    ["rest-040-la-galaxy-home","LA Galaxy (Home)","LA Galaxy","Rest of the World","rest","2025/26 Season",25,"images/galaxy.jpg",20,325,53],
    ["rest-041-la-galaxy-away","LA Galaxy (Away)","LA Galaxy","Rest of the World","rest","2025/26 Season",25,"images/galaxyy.jpg",22,326,60],
    ["rest-042-la-galaxy-third","LA Galaxy (Third)","LA Galaxy","Rest of the World","rest","2025/26 Season",25,"images/galaxyyy.jpg",24,327,67],
    ["rest-043-sporting-cp-home","Sporting CP (Home)","Sporting CP","Rest of the World","rest","2025/26 Season",25,"images/sporting_no_bg.png",10,328,74],
    ["rest-044-sporting-cp-away","Sporting CP (Away)","Sporting CP","Rest of the World","rest","2025/26 Season",25,"images/sportingg_no_bg.png",12,329,81],
    ["rest-045-sporting-cp-third","Sporting CP (Third)","Sporting CP","Rest of the World","rest","2025/26 Season",25,"images/sportinggg_no_bg.png",14,330,88]
  ];

  const PRODUCTS = PRODUCT_ROWS.map((row) => ({
    id: row[0],
    team: row[1],
    baseName: row[2],
    league: row[3],
    leagueKey: row[4],
    season: row[5],
    price: row[6],
    image: row[7],
    stock: row[8],
    order: row[9],
    salesRank: row[10]
  }));
  const LEAGUES = [
  {
    "key": "premier",
    "league": "Premier League",
    "file": "Premier League.html",
    "logo": "images/premier.webp"
  },
  {
    "key": "laliga",
    "league": "La Liga",
    "file": "Laliga.html",
    "logo": "images/laliga.png"
  },
  {
    "key": "seriea",
    "league": "Serie A",
    "file": "Serie A.html",
    "logo": "images/seriea.png"
  },
  {
    "key": "bundesliga",
    "league": "Bundesliga",
    "file": "Bundesliga.html",
    "logo": "images/bundesligalogo.png"
  },
  {
    "key": "ligue1",
    "league": "Ligue 1",
    "file": "League 1.html",
    "logo": "images/ligue 1 logo.png"
  },
  {
    "key": "rest",
    "league": "Rest of the World",
    "file": "Rest Of The World.html",
    "logo": "images/restoftheworl.png"
  }
];

  const STORAGE = {
    cart: "elitekits_cart_v1",
    wishlist: "elitekits_wishlist_v1",
    user: "elitekits_user_v1",
    users: "elitekits_users_v1",
    session: "elitekits_session_v1",
    coupon: "elitekits_coupon_v1",
    spin: "elitekits_spin_v1",
    orders: "elitekits_orders_v1",
    ratings: "elitekits_ratings_v1",
    messages: "elitekits_messages_v1",
    stock: "elitekits_stock_v1",
    redirect: "elitekits_redirect_after_login"
  };
  const INTERNAL_NAV_KEY = "elitekits_internal_navigation_v1";
  const MIGRATION_FLAG_KEY = "elitekits_db_migrated_v1";

  const DELIVERY_FEE = 5;
  const DEFAULT_IMG = "images/logo.png";
  const CUSTOMIZATION_FEE = 5;
  const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  // Phone country rules — mirrors PHONE_COUNTRY_RULES in Backend.py.
  // Keys are ISO-3166-1 alpha-2. `lengths` is the allowed national number length.
  const PHONE_COUNTRIES = [
    { code: "DZ", name: "Algeria",              dial: "+213", flag: "🇩🇿", lengths: [9] },
    { code: "BH", name: "Bahrain",              dial: "+973", flag: "🇧🇭", lengths: [8] },
    { code: "KM", name: "Comoros",              dial: "+269", flag: "🇰🇲", lengths: [7] },
    { code: "DJ", name: "Djibouti",             dial: "+253", flag: "🇩🇯", lengths: [8] },
    { code: "EG", name: "Egypt",                dial: "+20",  flag: "🇪🇬", lengths: [10] },
    { code: "IQ", name: "Iraq",                 dial: "+964", flag: "🇮🇶", lengths: [10] },
    { code: "JO", name: "Jordan",               dial: "+962", flag: "🇯🇴", lengths: [9] },
    { code: "KW", name: "Kuwait",               dial: "+965", flag: "🇰🇼", lengths: [8] },
    { code: "LB", name: "Lebanon",              dial: "+961", flag: "🇱🇧", lengths: [7, 8] },
    { code: "LY", name: "Libya",                dial: "+218", flag: "🇱🇾", lengths: [9] },
    { code: "MR", name: "Mauritania",           dial: "+222", flag: "🇲🇷", lengths: [8] },
    { code: "MA", name: "Morocco",              dial: "+212", flag: "🇲🇦", lengths: [9] },
    { code: "OM", name: "Oman",                 dial: "+968", flag: "🇴🇲", lengths: [8] },
    { code: "PS", name: "Palestine",            dial: "+970", flag: "🇵🇸", lengths: [9] },
    { code: "QA", name: "Qatar",                dial: "+974", flag: "🇶🇦", lengths: [8] },
    { code: "SA", name: "Saudi Arabia",         dial: "+966", flag: "🇸🇦", lengths: [9] },
    { code: "SO", name: "Somalia",              dial: "+252", flag: "🇸🇴", lengths: [7, 8, 9] },
    { code: "SD", name: "Sudan",                dial: "+249", flag: "🇸🇩", lengths: [9] },
    { code: "SY", name: "Syria",                dial: "+963", flag: "🇸🇾", lengths: [9] },
    { code: "TN", name: "Tunisia",              dial: "+216", flag: "🇹🇳", lengths: [8] },
    { code: "AE", name: "United Arab Emirates", dial: "+971", flag: "🇦🇪", lengths: [9] },
    { code: "YE", name: "Yemen",                dial: "+967", flag: "🇾🇪", lengths: [9] },
    { code: "AT", name: "Austria",              dial: "+43",  flag: "🇦🇹", lengths: [10, 11, 12, 13] },
    { code: "BE", name: "Belgium",              dial: "+32",  flag: "🇧🇪", lengths: [9] },
    { code: "BG", name: "Bulgaria",             dial: "+359", flag: "🇧🇬", lengths: [9] },
    { code: "HR", name: "Croatia",              dial: "+385", flag: "🇭🇷", lengths: [8, 9] },
    { code: "CY", name: "Cyprus",               dial: "+357", flag: "🇨🇾", lengths: [8] },
    { code: "CZ", name: "Czech Republic",       dial: "+420", flag: "🇨🇿", lengths: [9] },
    { code: "DK", name: "Denmark",              dial: "+45",  flag: "🇩🇰", lengths: [8] },
    { code: "EE", name: "Estonia",              dial: "+372", flag: "🇪🇪", lengths: [7, 8] },
    { code: "FI", name: "Finland",              dial: "+358", flag: "🇫🇮", lengths: [9, 10] },
    { code: "FR", name: "France",               dial: "+33",  flag: "🇫🇷", lengths: [9] },
    { code: "DE", name: "Germany",              dial: "+49",  flag: "🇩🇪", lengths: [10, 11] },
    { code: "GR", name: "Greece",               dial: "+30",  flag: "🇬🇷", lengths: [10] },
    { code: "HU", name: "Hungary",              dial: "+36",  flag: "🇭🇺", lengths: [9] },
    { code: "IE", name: "Ireland",              dial: "+353", flag: "🇮🇪", lengths: [9] },
    { code: "IT", name: "Italy",                dial: "+39",  flag: "🇮🇹", lengths: [9, 10] },
    { code: "LV", name: "Latvia",               dial: "+371", flag: "🇱🇻", lengths: [8] },
    { code: "LT", name: "Lithuania",            dial: "+370", flag: "🇱🇹", lengths: [8] },
    { code: "LU", name: "Luxembourg",           dial: "+352", flag: "🇱🇺", lengths: [9] },
    { code: "MT", name: "Malta",                dial: "+356", flag: "🇲🇹", lengths: [8] },
    { code: "NL", name: "Netherlands",          dial: "+31",  flag: "🇳🇱", lengths: [9] },
    { code: "PL", name: "Poland",               dial: "+48",  flag: "🇵🇱", lengths: [9] },
    { code: "PT", name: "Portugal",             dial: "+351", flag: "🇵🇹", lengths: [9] },
    { code: "RO", name: "Romania",              dial: "+40",  flag: "🇷🇴", lengths: [9] },
    { code: "SK", name: "Slovakia",             dial: "+421", flag: "🇸🇰", lengths: [9] },
    { code: "SI", name: "Slovenia",             dial: "+386", flag: "🇸🇮", lengths: [8] },
    { code: "ES", name: "Spain",                dial: "+34",  flag: "🇪🇸", lengths: [9] },
    { code: "SE", name: "Sweden",               dial: "+46",  flag: "🇸🇪", lengths: [7, 8, 9, 10] },
    { code: "US", name: "United States",        dial: "+1",   flag: "🇺🇸", lengths: [10] },
    { code: "CA", name: "Canada",               dial: "+1",   flag: "🇨🇦", lengths: [10] },
    { code: "MX", name: "Mexico",               dial: "+52",  flag: "🇲🇽", lengths: [10] },
    { code: "AU", name: "Australia",            dial: "+61",  flag: "🇦🇺", lengths: [9] }
  ];
  const PHONE_COUNTRY_BY_CODE = PHONE_COUNTRIES.reduce((map, c) => { map[c.code] = c; return map; }, {});
  const DEFAULT_PHONE_COUNTRY = "LB";

  function phoneCountryByCode(code) {
    return PHONE_COUNTRY_BY_CODE[String(code || "").toUpperCase()] || null;
  }

  function normalizePhoneDigits(value) {
    return String(value || "").replace(/\D+/g, "");
  }

  function validatePhoneInput(countryCode, raw) {
    const rule = phoneCountryByCode(countryCode);
    if (!rule) return { ok: false, message: "Choose a country for the phone number." };
    const national = normalizePhoneDigits(raw);
    if (!national) return { ok: false, message: "Enter a valid phone number for the selected country." };
    if (national.length !== new Set(national).size && new Set(national).size === 1) {
      return { ok: false, message: "Enter a valid phone number for the selected country." };
    }
    if (["12345678", "123456789", "1234567890", "0123456789"].indexOf(national) >= 0) {
      return { ok: false, message: "Enter a valid phone number for the selected country." };
    }
    if (rule.lengths.indexOf(national.length) < 0) {
      const exp = rule.lengths.join(" or ");
      return { ok: false, message: "Phone number for " + rule.name + " must be " + exp + " digits." };
    }
    return {
      ok: true,
      country: rule.name,
      countryCode: rule.code,
      dialCode: rule.dial,
      national,
      e164: rule.dial + national
    };
  }
  // Admin credentials live on the backend now. Frontend no longer enforces auth;
  // the server validates email + password and assigns role. These are kept only
  // as informational constants so legacy code paths still compile.
  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "";

  /* ============================================================
     BackendBridge: makes the existing synchronous localStorage
     code work against the Flask + SQLite backend.

     Strategy: keep readJSON/writeJSON synchronous, but back the
     STORAGE.* keys with an in-memory cache (MEM). MEM is hydrated
     from the server on startup BEFORE init() runs. Writes update
     MEM immediately and asynchronously persist to the backend.
     Non-STORAGE keys are limited to temporary navigation, redirect,
     coupon, and one-time migration state.
     ============================================================ */
  const BackendBridge = (() => {
    const API = "/api";
    const MEM = {};                   // in-memory cache, keyed by STORAGE.* values
    const SYNC_KEYS = new Set();      // STORAGE values routed through MEM
    Object.values(STORAGE).forEach((k) => SYNC_KEYS.add(k));
    SYNC_KEYS.delete(STORAGE.redirect); // redirect is a path string, keep on LS
    SYNC_KEYS.add(STORAGE.user);
    SYNC_KEYS.add(STORAGE.session);

    let hydrated = false;
    let hydratePromise = null;
    let csrfToken = null;

    async function ensureCsrfToken() {
      if (csrfToken) return csrfToken;
      try {
        const res = await fetch(API + "/csrf-token", { credentials: "same-origin" });
        const payload = await res.json();
        csrfToken = payload && payload.ok && payload.data ? payload.data.csrf_token : null;
      } catch (e) {
        csrfToken = null;
      }
      return csrfToken;
    }

    async function apiFetch(path, options = {}) {
      const opts = Object.assign({ credentials: "same-origin", headers: {} }, options);
      if (opts.body && typeof opts.body !== "string" && !(opts.body instanceof FormData)) {
        opts.body = JSON.stringify(opts.body);
        opts.headers["Content-Type"] = "application/json";
      }
      const method = String(opts.method || "GET").toUpperCase();
      const csrfExempt = path === "/auth/login" || path === "/auth/signup";
      if (!csrfExempt && !["GET", "HEAD", "OPTIONS"].includes(method)) {
        const token = await ensureCsrfToken();
        if (token) opts.headers["X-CSRF-Token"] = token;
      }
      let res;
      try {
        res = await fetch(API + path, opts);
      } catch (e) {
        return { ok: false, error: { code: "network", message: "Network error" } };
      }
      let payload = null;
      try { payload = await res.json(); } catch (e) { payload = null; }
      if (!res.ok) {
        return payload || { ok: false, error: { code: "http_" + res.status, message: res.statusText } };
      }
      return payload || { ok: false, error: { code: "empty", message: "Empty response" } };
    }

    function setMem(key, value) { MEM[key] = value; }
    function getMem(key, fallback) {
      if (Object.prototype.hasOwnProperty.call(MEM, key)) return MEM[key];
      return fallback;
    }
    function hasMem(key) { return Object.prototype.hasOwnProperty.call(MEM, key); }

    // ---- Cart shape conversion ----------------------------------
    function backendCartToLocal(items) {
      return (items || []).map((row) => ({
        id: row.id || row.product_code || ("db-" + (row.db_id || row.product_id)),
        product_id: row.db_id || row.product_id,
        line_id: row.cart_item_id || row.line_id,
        size: row.size || "",
        quantity: row.quantity != null ? row.quantity : (row.qty || 1),
        personalize: Boolean(row.personalize || row.print_enabled),
        customName: row.customName || row.custom_name || "",
        customNumber: row.customNumber || row.custom_number || "",
        addedAt: row.added_at || new Date().toISOString()
      }));
    }

    function backendWishlistToLocal(items) {
      return (items || []).map((row) => row.id || row.product_code || ("db-" + (row.db_id || row.product_id)));
    }

    function backendUserToLocal(u) {
      if (!u) return null;
      // /api/admin/users returns the raw users row with is_admin (0/1) but no
      // explicit role field. Fall back to is_admin so admin-only checks and
      // the user list role badge are correct for that endpoint.
      const role = u.role || (u.is_admin ? "admin" : "user");
      return {
        id: u.id || ("u-" + String(u.email || "").replace(/[^a-z0-9]+/gi, "")),
        name: u.name || "",
        email: u.email || "",
        role,
        createdAt: u.created_at || "",
        lastLoginAt: u.last_login_at || "",
        birthdate: u.birthdate || "",
        phone: u.phone || "",
        phoneCountry: u.phone_country || "",
        phoneCountryCode: u.phone_country_code || "",
        phoneDialCode: u.phone_dial_code || "",
        phoneNational: u.phone_national || "",
        phoneE164: u.phone_e164 || "",
        updatedAt: u.updated_at || ""
      };
    }

    function backendOrdersToLocal(orders) {
      return (orders || []).map((o) => ({
        id: o.order_code,
        customer: o.customer_name || o.user_name || "",
        email: o.email || "",
        createdAt: o.created_at,
        items: (o.items || []).map((it) => ({
          id: it.id || it.product_code || ("db-" + it.product_id),
          product_id: it.product_id,
          orderItemId: it.order_item_id || it.id || null,
          size: it.size,
          quantity: it.qty != null ? it.qty : (it.quantity || 1),
          unitPrice: it.unit_price,
          customName: it.customName || it.custom_name || "",
          customNumber: it.customNumber || it.custom_number || ""
        })),
        total: o.grand_total != null ? o.grand_total : o.total,
        status: o.status,
        address: {
          governorate: o.state || "",
          city: o.city || "",
          road: o.road || ""
        },
        addressText: [o.state, o.city, o.road].filter(Boolean).join(", "),
        phoneCountry: o.phone_country || "",
        phoneCountryCode: o.phone_country_code || "",
        phoneDialCode: o.phone_dial_code || "",
        phoneNational: o.phone_national || "",
        phoneE164: o.phone_e164 || "",
        rating: o.rating || 0,
        timeline: o.timeline || []
      }));
    }

    function backendRatingsToLocal(rs) {
      return (rs || []).map((r) => ({
        orderId: r.order_code || "",
        // /api/ratings (admin) joins users and returns user_name, not customer_name.
        // Falling back to user_name keeps the Ratings table from showing "Guest".
        customer: r.user_name || r.customer_name || r.email || "Guest",
        date: r.created_at,
        rating: r.rating,
        total: r.order_total || null,
        createdAt: r.created_at
      }));
    }

    function backendMessagesToLocal(ms) {
      return (ms || []).map((m) => {
        const readValue = m.is_read != null ? m.is_read : (m.read != null ? m.read : m.read_at);
        return {
          id: m.id,
          name: m.name || "",
          email: m.email || "",
          type: m.type || "contact",
          subject: m.subject || "",
          message: m.message || "",
          role: m.role || "",
          cvFile: m.cv_file || m.cvFile || "",
          cvMime: m.cv_mime || m.cvMime || "",
          cvSize: Number(m.cv_size || m.cvSize || 0) || 0,
          hasCv: m.has_cv === true || m.has_cv === 1 || m.has_cv === "1" || Boolean(m.cv_blob),
          createdAt: m.created_at,
          read: readValue === true || readValue === 1 || readValue === "1" || readValue === "true"
        };
      });
    }

    function backendCouponsToLocal(cs) {
      const map = {};
      (cs || []).forEach((c) => {
        map[c.code] = {
          code: c.code,
          type: c.type,
          value: c.value,
          description: c.description || "",
          minSubtotal: c.min_subtotal || 0,
          expiresAt: c.expires_at || null
        };
      });
      return map;
    }

    function backendSpinToLocal(history) {
      return (history || []).map((h) => ({
        date: h.spin_date,
        prize: h.prize_label,
        type: h.prize_type,
        value: h.prize_value,
        couponCode: h.coupon_code || ""
      }));
    }

    function backendProductsToStockMap(products) {
      const stock = {};
      (products || []).forEach((p) => {
        const code = p.id || p.product_code || ("db-" + (p.db_id || ""));
        if (!code) return;
        stock[code] = Number(p.total_stock != null ? p.total_stock : p.stock) || 0;
      });
      return stock;
    }

    async function hydrate() {
      if (hydrated) return true;
      if (hydratePromise) return hydratePromise;
      hydratePromise = (async () => {
        // 1) auth/me
        const me = await apiFetch("/auth/me");
        if (me && me.ok && me.data && me.data.user) {
          const u = backendUserToLocal(me.data.user);
          MEM[STORAGE.user] = u;
          MEM[STORAGE.session] = {
            id: u.id,
            email: u.email,
            name: u.name,
            role: u.role,
            createdAt: u.createdAt || new Date().toISOString(),
            lastLoginAt: u.lastLoginAt || "",
            birthdate: u.birthdate || "",
            phone: u.phone || "",
            signedInAt: new Date().toISOString()
          };
        } else {
          MEM[STORAGE.user] = null;
          MEM[STORAGE.session] = null;
        }
        // 2) products (for stock overrides)
        const prods = await apiFetch("/products");
        if (prods && prods.ok && prods.data) {
          MEM[STORAGE.stock] = backendProductsToStockMap(prods.data.products);
          BackendBridge._serverProducts = prods.data.products || [];
        } else {
          MEM[STORAGE.stock] = {};
          BackendBridge._serverProducts = [];
        }
        // 3) cart, wishlist (works for guest + user via cookies)
        const cart = await apiFetch("/cart");
        MEM[STORAGE.cart] = (cart && cart.ok) ? backendCartToLocal(cart.data && cart.data.items) : [];
        const wl = await apiFetch("/wishlist");
        MEM[STORAGE.wishlist] = (wl && wl.ok) ? backendWishlistToLocal(wl.data && wl.data.items) : [];
        // 4) coupons
        const co = await apiFetch("/coupons");
        // The "applied" coupon must survive page navigation (SpinWheel ->
        // Cart -> Payment) but should NOT survive logout or a new tab.
        // sessionStorage is the right home for it (cleared on tab close).
        let appliedCoupon = null;
        try {
          const raw = sessionStorage.getItem("elitekits_applied_coupon_v1");
          if (raw) appliedCoupon = JSON.parse(raw);
        } catch (e) {}
        if (appliedCoupon && isSessionSpinCouponExpired(appliedCoupon)) {
          appliedCoupon = null;
          try { sessionStorage.removeItem("elitekits_applied_coupon_v1"); } catch (e) {}
        }
        MEM[STORAGE.coupon] = appliedCoupon;
        BackendBridge._allCoupons = (co && co.ok) ? backendCouponsToLocal(co.data && co.data.coupons) : {};
        // 5) orders (only if signed in)
        if (MEM[STORAGE.user]) {
          const od = await apiFetch("/orders");
          MEM[STORAGE.orders] = (od && od.ok) ? backendOrdersToLocal(od.data && od.data.orders) : [];
          const rs = await apiFetch("/ratings");
          MEM[STORAGE.ratings] = (rs && rs.ok) ? backendRatingsToLocal(rs.data && rs.data.ratings) : [];
        } else {
          MEM[STORAGE.orders] = [];
          MEM[STORAGE.ratings] = [];
        }
        // 6) spin status — Backend returns { can_spin, logged_in, last_prize }
        const sp = await apiFetch("/spin/status");
        if (sp && sp.ok && sp.data && sp.data.last_prize) {
          const lp = sp.data.last_prize;
          // Map backend spin_history row -> shape frontend expects
          MEM[STORAGE.spin] = {
            date: lp.created_at || lp.spin_date || new Date().toISOString(),
            prize: lp.prize_label || "",
            type: lp.prize_type || (lp.coupon_code ? "coupon" : "none"),
            value: lp.prize_value || 0,
            couponCode: lp.coupon_code || ""
          };
        } else {
          MEM[STORAGE.spin] = null;
        }
        // 7) messages (admin only)
        if (MEM[STORAGE.user] && MEM[STORAGE.user].role === "admin") {
          const ms = await apiFetch("/messages");
          MEM[STORAGE.messages] = (ms && ms.ok) ? backendMessagesToLocal(ms.data && ms.data.messages) : [];
          const allUsers = await apiFetch("/admin/users");
          MEM[STORAGE.users] = (allUsers && allUsers.ok) ? (allUsers.data.users || []).map(backendUserToLocal) : [];
          const adminProducts = await apiFetch("/admin/products");
          if (adminProducts && adminProducts.ok && adminProducts.data) {
            BackendBridge._serverProducts = adminProducts.data.products || [];
            MEM[STORAGE.stock] = backendProductsToStockMap(BackendBridge._serverProducts);
          }
          const overview = await apiFetch("/admin/overview");
          BackendBridge._adminOverview = (overview && overview.ok) ? overview.data : null;
          const analytics = await apiFetch("/admin/analytics");
          BackendBridge._adminAnalytics = (analytics && analytics.ok) ? analytics.data : null;
        } else {
          MEM[STORAGE.messages] = [];
          MEM[STORAGE.users] = [];
          BackendBridge._adminOverview = null;
          BackendBridge._adminAnalytics = null;
        }
        hydrated = true;
        return true;
      })();
      return hydratePromise;
    }

    // ---- One-time legacy migration ----------------------------------
    async function migrateLegacyLocalStorage() {
      try {
        if (localStorage.getItem(MIGRATION_FLAG_KEY) === "1") return;
        const legacyCart = (() => {
          try { return JSON.parse(localStorage.getItem(STORAGE.cart) || "null"); } catch (e) { return null; }
        })();
        const legacyWishlist = (() => {
          try { return JSON.parse(localStorage.getItem(STORAGE.wishlist) || "null"); } catch (e) { return null; }
        })();
        const hasLegacy = (Array.isArray(legacyCart) && legacyCart.length) || (Array.isArray(legacyWishlist) && legacyWishlist.length);
        if (!hasLegacy) {
          localStorage.setItem(MIGRATION_FLAG_KEY, "1");
          return;
        }
        const res = await apiFetch("/migrate-local-storage", {
          method: "POST",
          body: { cart: legacyCart || [], wishlist: legacyWishlist || [] }
        });
        if (res && res.ok) {
          // remove ONLY the migrated keys; keep everything else for safety
          localStorage.removeItem(STORAGE.cart);
          localStorage.removeItem(STORAGE.wishlist);
          localStorage.setItem(MIGRATION_FLAG_KEY, "1");
        }
      } catch (e) {
        // swallow errors; migration is best-effort
      }
    }

    // ---- Async persist on writes ------------------------------------
    // Cart persistence: serialize writes by chaining them on a single promise.
    // This avoids the race window between DELETE and POST when many cart
    // changes happen in quick succession. Each call:
    //   1. waits for the previous sync to finish
    //   2. snapshots the current cart from memory
    //   3. DELETEs the server cart
    //   4. POSTs each line back
    // The latest snapshot always wins; intermediate calls coalesce.
    let _cartSyncChain = Promise.resolve();
    let _cartSyncPending = false;
    function persistCart() {
      if (_cartSyncPending) return _cartSyncChain;
      _cartSyncPending = true;
      _cartSyncChain = _cartSyncChain.then(async () => {
        _cartSyncPending = false;
        const items = (MEM[STORAGE.cart] || []).slice();
        try {
          await apiFetch("/cart", { method: "DELETE" });
          for (const it of items) {
            await apiFetch("/cart/items", {
              method: "POST",
              body: {
                product: it.id,
                size: it.size || "",
                quantity: Number(it.quantity) || 1,
                personalize: Boolean(it.personalize),
                print_enabled: Boolean(it.personalize),
                custom_name: it.customName || "",
                custom_number: it.customNumber || ""
              }
            });
          }
        } catch (e) { /* best-effort */ }
      });
      return _cartSyncChain;
    }

    function persistWishlistAdd(productCode) {
      return apiFetch("/wishlist/" + encodeURIComponent(productCode), { method: "POST" });
    }
    function persistWishlistRemove(productCode) {
      return apiFetch("/wishlist/" + encodeURIComponent(productCode), { method: "DELETE" });
    }
    function persistStockOverride(productCode, stock) {
      return Promise.resolve({ ok: false, error: { message: "Choose a specific size to update stock." } });
    }
    function persistStockAdjustment(productCode, payload) {
      return apiFetch("/inventory/" + encodeURIComponent(productCode), {
        method: "PATCH",
        body: payload || {}
      });
    }
    function persistCouponApply(code) {
      if (!code) return Promise.resolve({ ok: true });
      return apiFetch("/coupons/apply", { method: "POST", body: { code } });
    }

    return {
      apiFetch,
      hydrate,
      migrateLegacyLocalStorage,
      MEM,
      SYNC_KEYS,
      isSyncKey: (k) => SYNC_KEYS.has(k),
      setMem,
      getMem,
      hasMem,
      persistCart,
      persistWishlistAdd,
      persistWishlistRemove,
      persistStockOverride,
      persistStockAdjustment,
      persistCouponApply,
      backendCartToLocal,
      backendWishlistToLocal,
      backendUserToLocal,
      backendOrdersToLocal,
      backendRatingsToLocal,
      backendMessagesToLocal,
      backendCouponsToLocal,
      backendSpinToLocal,
      backendProductsToStockMap,
      clearCsrfToken: () => { csrfToken = null; },
      _serverProducts: [],
      _allCoupons: {}
    };
  })();
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function escapeHTML(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function phoneCountryFlagUrl(code) {
    return 'https://flagcdn.com/w20/' + String(code || DEFAULT_PHONE_COUNTRY).toLowerCase() + '.png';
  }

  function phoneCountryOptionLabel(country) {
    return country ? country.name : '';
  }

  function phoneFlagMarkup(rule, attr) {
    const safeRule = rule || phoneCountryByCode(DEFAULT_PHONE_COUNTRY);
    const iso = safeRule ? safeRule.code : DEFAULT_PHONE_COUNTRY;
    return '<span class="phone-country-flag" ' + attr + ' aria-hidden="true"><img class="phone-country-flag-img" src="' + phoneCountryFlagUrl(iso) + '" alt=""><span class="phone-country-flag-fallback">' + escapeHTML(iso) + '</span></span>';
  }

  function syncPhoneFlag(flagEl, rule) {
    if (!flagEl || !rule) return;
    let img = flagEl.querySelector('img');
    let fallback = flagEl.querySelector('.phone-country-flag-fallback');
    if (!img) {
      flagEl.textContent = '';
      img = document.createElement('img');
      img.className = 'phone-country-flag-img';
      img.alt = '';
      flagEl.appendChild(img);
    }
    if (!fallback) {
      fallback = document.createElement('span');
      fallback.className = 'phone-country-flag-fallback';
      flagEl.appendChild(fallback);
    }
    fallback.textContent = rule.code;
    flagEl.classList.remove('is-fallback');
    img.hidden = false;
    if (img.dataset.flagBound !== '1') {
      img.addEventListener('error', () => {
        img.hidden = true;
        flagEl.classList.add('is-fallback');
      });
      img.addEventListener('load', () => {
        img.hidden = false;
        flagEl.classList.remove('is-fallback');
      });
      img.dataset.flagBound = '1';
    }
    img.src = phoneCountryFlagUrl(rule.code);
  }

  function normalizeText(value) {
    return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  function money(value) {
    const amount = Number(value) || 0;
    return "$" + amount.toFixed(amount % 1 ? 2 : 0);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function readJSON(key, fallback) {
    if (BackendBridge.isSyncKey(key)) {
      return BackendBridge.hasMem(key) ? BackendBridge.getMem(key, fallback) : fallback;
    }
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    if (BackendBridge.isSyncKey(key)) {
      BackendBridge.setMem(key, value);
      // Async persist to backend for known keys
      if (key === STORAGE.cart) {
        BackendBridge.persistCart();
      } else if (key === STORAGE.coupon) {
        // Mirror to sessionStorage so the coupon survives page navigation.
        // (MEM is wiped on every page load; sessionStorage is not.)
        try {
          if (value && value.code) {
            sessionStorage.setItem("elitekits_applied_coupon_v1", JSON.stringify(value));
          } else {
            sessionStorage.removeItem("elitekits_applied_coupon_v1");
          }
        } catch (e) {}
        // Note: we do NOT call /api/coupons/apply here — that endpoint just
        // validates a code against the server. The actual discount is applied
        // by the backend when /api/orders/checkout receives coupon_code.
      }
      // STORAGE.stock only mirrors backend totals in memory. Admin stock writes
      // go through size-specific PATCH /api/inventory/<product>.
      // STORAGE.wishlist is handled by add/remove API calls in saveWishlist
      // STORAGE.user / STORAGE.session are handled by auth API (signup/login/logout)
      // STORAGE.orders / STORAGE.ratings / STORAGE.spin / STORAGE.messages are written
      // server-side via dedicated endpoints; local writes just refresh cache.
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  function productById(id) {
    return PRODUCTS.find((product) => product.id === id) || null;
  }

  function applyBackendProductDetails(products) {
    (products || []).forEach((serverProduct) => {
      const id = serverProduct.id || serverProduct.product_code || ("db-" + (serverProduct.db_id || ""));
      let product = productById(id);
      if (!product) {
        product = {
          id,
          team: serverProduct.team || "New Product",
          league: serverProduct.league || "Rest of the World",
          leagueKey: serverProduct.league_key || "rest",
          season: serverProduct.season || "",
          image: serverProduct.image_url || DEFAULT_IMG,
          price: Number(serverProduct.base_price || 25),
          order: Number(serverProduct.display_order || PRODUCTS.length + 1),
          salesRank: Number(serverProduct.sales_rank || 0),
          active: serverProduct.is_active !== false,
          stock: 0,
          stockBySize: {}
        };
        PRODUCTS.push(product);
      }
      if (serverProduct.team) product.team = serverProduct.team;
      if (serverProduct.league) product.league = serverProduct.league;
      if (serverProduct.league_key) product.leagueKey = serverProduct.league_key;
      if (serverProduct.season) product.season = serverProduct.season;
      if (serverProduct.image_url) product.image = serverProduct.image_url;
      if (serverProduct.base_price != null) product.price = Number(serverProduct.base_price) || product.price;
      if (serverProduct.display_order != null) product.order = Number(serverProduct.display_order) || product.order;
      if (serverProduct.sales_rank != null) product.salesRank = Number(serverProduct.sales_rank) || product.salesRank;
      if (serverProduct.is_active != null) product.active = Boolean(serverProduct.is_active);
      const stockBySize = serverProduct.stock_by_size || {};
      product.stockBySize = {};
      SIZES.forEach((size) => {
        product.stockBySize[size] = Math.max(0, Number(stockBySize[size] || 0) || 0);
      });
      const total = serverProduct.total_stock != null
        ? Number(serverProduct.total_stock)
        : SIZES.reduce((sum, size) => sum + product.stockBySize[size], 0);
      product.stock = Math.max(0, Number(total) || 0);
    });
  }

  function applyProductStockPayload(productId, payload) {
    const product = productById(productId);
    if (!product || !payload) return product;
    const serverProduct = payload.product || null;
    if (serverProduct) {
      applyBackendProductDetails([serverProduct]);
      return productById(productId);
    }
    if (payload.stock_by_size) {
      product.stockBySize = {};
      SIZES.forEach((size) => {
        product.stockBySize[size] = Math.max(0, Number(payload.stock_by_size[size] || 0) || 0);
      });
      product.stock = payload.total_stock != null
        ? Math.max(0, Number(payload.total_stock) || 0)
        : SIZES.reduce((sum, size) => sum + product.stockBySize[size], 0);
    }
    return product;
  }

  function getProductStockBySize(product) {
    const map = product && product.stockBySize ? product.stockBySize : {};
    const hasAny = SIZES.some((size) => Object.prototype.hasOwnProperty.call(map, size));
    if (!hasAny) return {};
    const out = {};
    SIZES.forEach((size) => { out[size] = Math.max(0, Number(map[size] || 0) || 0); });
    return out;
  }

  function getStockOverrides() {
    return readJSON(STORAGE.stock, {});
  }

  function saveStockOverrides(overrides) {
    writeJSON(STORAGE.stock, overrides || {});
  }

  function applyStockOverrides() {
    const overrides = getStockOverrides();
    PRODUCTS.forEach((product) => {
      if (Object.prototype.hasOwnProperty.call(overrides, product.id)) {
        const value = parseInt(overrides[product.id], 10);
        if (!Number.isNaN(value)) product.stock = Math.max(0, value);
      }
    });
  }

  function setProductStock(productId, stock, options = {}) {
    const product = productById(productId);
    if (!product) return null;
    const next = Math.max(0, parseInt(stock, 10) || 0);
    product.stock = next;
    // Update the in-memory cache so future reads see the new value.
    const overrides = getStockOverrides();
    overrides[product.id] = next;
    BackendBridge.setMem(STORAGE.stock, overrides);
    // Persist just this one product to the backend.
    if (!options.skipPersist) {
      BackendBridge.persistStockOverride(product.id, next).then((res) => {
        if (res && res.ok && res.data) {
          applyProductStockPayload(product.id, res.data);
          const fresh = productById(product.id);
          if (fresh) {
            const latestOverrides = getStockOverrides();
            latestOverrides[fresh.id] = fresh.stock;
            BackendBridge.setMem(STORAGE.stock, latestOverrides);
          }
        }
      }).catch(() => {});
    }
    if (!options.silent) {
      syncProductCardStates();
      applyProductFilters();
      renderWishlistPage();
      renderCartPage();
      if (document.body.classList.contains('admin-page')) renderAdminDashboard();
    }
    return next;
  }

  applyStockOverrides();

  function currentPageFile() {
    const name = decodeURIComponent((window.location.pathname.split("/").pop() || "Home.html")).toLowerCase();
    return name || "home.html";
  }

  function pageIs(fileName) {
    return currentPageFile() === fileName.toLowerCase();
  }

  function canonicalEmail(email) {
    return String(email || '').trim().toLowerCase();
  }

  function isValidName(value) {
    const name = String(value || '').trim().replace(/\s+/g, ' ');
    return name.length >= 2 && /[A-Za-z]/.test(name) && /^[A-Za-z][A-Za-z\s.'-]*$/.test(name);
  }

  function isValidEmail(value) {
    const email = canonicalEmail(value);
    if (!email) return false;
    // Total length 1..254
    if (email.length > 254) return false;
    // Exactly one @
    if ((email.match(/@/g) || []).length !== 1) return false;
    const parts = email.split('@');
    const local = parts[0];
    const domain = parts[1];
    if (!local || !domain) return false;
    // Local part length 1..64
    if (local.length > 64) return false;
    // Local must contain at least one letter
    if (!/[a-z]/i.test(local)) return false;
    // No leading, trailing, or consecutive dots
    if (local.startsWith('.') || local.endsWith('.') || local.indexOf('..') !== -1) return false;
    if (domain.startsWith('.') || domain.endsWith('.') || domain.indexOf('..') !== -1) return false;
    // No spaces anywhere
    if (/\s/.test(email)) return false;
    // Domain must contain a dot
    if (domain.indexOf('.') === -1) return false;
    // Strict format check
    // Local: alphanumerics and . _ % + - in labels, single dots between
    // Domain labels: alnum start/end, hyphens allowed in middle
    // TLD: 2-63 letters only
    const strictRe = /^[a-z0-9_%+\-]+(?:\.[a-z0-9_%+\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;
    return strictRe.test(email);
  }

  function parseBirthdate(value) {
    const raw = String(value || '').trim();
    if (!raw) return null;
    let day = 0;
    let month = 0;
    let year = 0;
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
      const parts = raw.split('-').map(Number);
      year = parts[0];
      month = parts[1];
      day = parts[2];
    } else {
      const match = raw.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/);
      if (!match) return null;
      day = Number(match[1]);
      month = Number(match[2]);
      year = Number(match[3]);
    }
    if (!year || year < 1900 || !month || !day) return null;
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
    return date;
  }

  function isAtLeastAge(date, years) {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) return false;
    const cutoff = new Date();
    cutoff.setHours(0, 0, 0, 0);
    cutoff.setFullYear(cutoff.getFullYear() - years);
    return date <= cutoff;
  }

  function birthdateValidationMessage(value) {
    const date = parseBirthdate(value);
    if (!String(value || '').trim()) return 'Enter your birthdate.';
    if (!date) return 'Enter a real birthdate using DD/MM/YYYY.';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date > today) return 'Birthdate cannot be in the future.';
    if (!isAtLeastAge(date, 15)) return 'You must be at least 15 years old to create an account.';
    return '';
  }

  function passwordValidationMessage(password) {
    const value = String(password || '');
    if (!value) return 'Enter a password.';
    if (value.length < 8) return 'Password must be at least 8 characters.';
    if (!/[A-Z]/.test(value)) return 'Password must include an uppercase letter.';
    if (!/[a-z]/.test(value)) return 'Password must include a lowercase letter.';
    if (!/[0-9]/.test(value)) return 'Password must include a number.';
    if (!/[^A-Za-z0-9]/.test(value)) return 'Password must include a special character.';
    return '';
  }

  function isStrongPassword(password) {
    return !passwordValidationMessage(password);
  }

  function normalizedCardDigits(value) {
    return String(value || '').replace(/\D/g, '');
  }

  function isValidCardNumberLuhn(value) {
    const digits = normalizedCardDigits(value);
    if (!/^\d{16}$/.test(digits)) return false;
    let sum = 0;
    let doubleDigit = false;
    for (let index = digits.length - 1; index >= 0; index -= 1) {
      let digit = Number(digits[index]);
      if (doubleDigit) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      doubleDigit = !doubleDigit;
    }
    return sum % 10 === 0;
  }

  function isValidCVV(value) {
    // Lebanon-only project: CVV must be exactly 3 digits.
    return /^\d{3}$/.test(String(value || '').trim());
  }

  // Card-expiry policy mirrors Backend.expiry_validation_message:
  //   * Valid MM/YY (or MM/YYYY).
  //   * Current month or any future month.
  //   * Not more than 10 years past the current month -- e.g. if today is
  //     May 2026, anything past 05/2036 is rejected as unrealistic.
  var EXPIRY_MAX_YEARS_AHEAD = 10;

  function expiryErrorMessage(value) {
    var raw = String(value || '').trim();
    if (!raw) return 'Card expiry is required.';
    var match = raw.match(/^(\d{2})\s*\/\s*(\d{2}|\d{4})$/);
    if (!match) return 'Enter card expiry as MM/YY.';
    var month = Number(match[1]);
    var rawYear = Number(match[2]);
    var year = rawYear < 100 ? 2000 + rawYear : rawYear;
    if (month < 1 || month > 12) return 'Enter a valid expiry month between 01 and 12.';
    var lastDay = new Date(year, month, 0, 23, 59, 59, 999);
    var now = new Date();
    if (lastDay < now) return 'Card expiry cannot be in the past.';
    var maxLastDay = new Date(now.getFullYear() + EXPIRY_MAX_YEARS_AHEAD, now.getMonth() + 1, 0, 23, 59, 59, 999);
    if (lastDay > maxLastDay) return 'Card expiry cannot be more than ' + EXPIRY_MAX_YEARS_AHEAD + ' years from now.';
    return '';
  }

  function isValidExpiry(value) {
    return expiryErrorMessage(value) === '';
  }

  function isValidCity(value) {
    const city = String(value || '').trim().replace(/\s+/g, ' ');
    if (city.length < 2 || !/[A-Za-z]/.test(city)) return false;
    if (!/^[A-Za-z][A-Za-z\s.'-]*$/.test(city)) return false;
    const compact = city.replace(/[^A-Za-z]/g, '');
    if (compact.length >= 5 && !/[aeiou]/i.test(compact)) return false;
    if (/(.)\1\1/.test(compact.toLowerCase())) return false;
    return true;
  }

  function isValidRoad(value) {
    const road = String(value || '').trim();
    return road.length >= 2 && /[A-Za-z0-9]/.test(road) && /^[A-Za-z0-9\s.'#\-/]+$/.test(road);
  }

  function setFieldInvalid(field, invalid) {
    if (!field) return;
    field.classList.toggle('is-invalid', Boolean(invalid));
    if (invalid) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
  }

  function clearFormInvalidState(form) {
    if (!form) return;
    $$('.is-invalid', form).forEach((field) => setFieldInvalid(field, false));
    $$('.field-inline-error', form).forEach((node) => {
      node.textContent = '';
      node.hidden = true;
    });
  }

  // ----- Inline field-level error messaging --------------------------------
  // Adds a clear, human-readable message right below the offending input so
  // the user is never left guessing why a red border appeared. The error
  // node is created on demand and reused across submits / blur events so
  // there is at most one message per field at any time.
  function inlineFieldErrorAnchor(field) {
    if (!field) return null;
    var anchor = field.closest('.input-wrap, .phone-input-grid, .three-col, .cls-24d512');
    return anchor || field;
  }

  function setInlineFieldError(field, message) {
    if (!field) return;
    setFieldInvalid(field, !!message);
    var errorId = field.dataset && field.dataset.errorId;
    if (!errorId) {
      errorId = 'fld-err-' + (field.id || ('f' + Math.random().toString(36).slice(2, 8)));
      if (field.dataset) field.dataset.errorId = errorId;
    }
    var node = document.getElementById(errorId);
    if (!node) {
      node = document.createElement('p');
      node.id = errorId;
      node.className = 'field-inline-error';
      node.setAttribute('role', 'alert');
      node.setAttribute('aria-live', 'polite');
      var anchor = inlineFieldErrorAnchor(field);
      if (anchor && anchor.parentNode) {
        anchor.parentNode.insertBefore(node, anchor.nextSibling);
      }
      try { field.setAttribute('aria-describedby', errorId); } catch (e) {}
    }
    node.textContent = message || '';
    node.hidden = !message;
  }

  function clearInlineFieldError(field) {
    setInlineFieldError(field, '');
  }

  function attachLiveFieldValidation(field, validatorFn) {
    if (!field || !validatorFn) return;
    if (field.dataset && field.dataset.liveValidationBound === '1') return;
    if (field.dataset) field.dataset.liveValidationBound = '1';
    field.addEventListener('blur', () => {
      var msg = validatorFn(field.value);
      setInlineFieldError(field, msg || '');
    });
    field.addEventListener('input', () => {
      // Don't pop up new errors mid-typing; only refine an already-shown one.
      if (field.classList.contains('is-invalid')) {
        var msg = validatorFn(field.value);
        setInlineFieldError(field, msg || '');
      }
    });
  }

  // Per-field error-message helpers used by both the live-validation hooks
  // and the submit-time validators. Keep wording aligned with the backend
  // so server-side rejections look consistent.
  function nameErrorMessage(value) {
    if (!String(value || '').trim()) return 'Name is required.';
    return isValidName(value) ? '' : 'Enter a valid name using letters (2-50 characters).';
  }
  function emailErrorMessage(value) {
    const s = String(value || '').trim();
    if (!s) return 'Email is required.';
    const email = canonicalEmail(value);
    const atCount = (email.match(/@/g) || []).length;
    if (atCount !== 1) return "Email must contain exactly one '@'.";
    const parts = email.split('@');
    const local = parts[0];
    const domain = parts[1];
    if (!local) return "Email is missing the part before '@'.";
    if (!domain) return "Email is missing the part after '@'.";
    if (/\s/.test(email)) return 'Email cannot contain spaces.';
    if (!/[a-z]/i.test(local)) return "Email must contain at least one letter before the '@'.";
    if (local.startsWith('.') || local.endsWith('.')) return "Email cannot start or end with a dot before '@'.";
    if (local.indexOf('..') !== -1 || domain.indexOf('..') !== -1) return 'Email cannot contain consecutive dots.';
    if (domain.indexOf('.') === -1) return 'Email domain must contain a dot (e.g. gmail.com).';
    if (domain.startsWith('.') || domain.endsWith('.') || domain.startsWith('-') || domain.endsWith('-')) {
      return "Email domain cannot start or end with '.' or '-'.";
    }
    const tld = domain.split('.').pop();
    if (!tld || tld.length < 2 || !/^[a-z]+$/i.test(tld)) {
      return 'Email must end with a valid domain (e.g. .com, .net).';
    }
    return isValidEmail(value) ? '' : 'Enter a valid email address.';
  }
  function cardErrorMessage(value) {
    var raw = String(value || '').trim();
    if (!raw) return 'Card number is required.';
    var digits = normalizedCardDigits(raw);
    if (digits.length !== 16) return 'Card number must be exactly 16 digits.';
    if (!isValidCardNumberLuhn(raw)) return 'Card number must be exactly 16 digits and pass card validation.';
    return '';
  }
  function cvvErrorMessage(value) {
    var raw = String(value || '').trim();
    if (!raw) return 'CVV is required.';
    return isValidCVV(raw) ? '' : 'CVV must be exactly 3 digits.';
  }
  function cityErrorMessage(value) {
    if (!String(value || '').trim()) return 'City is required.';
    return isValidCity(value) ? '' : 'City must contain valid letters.';
  }
  function roadErrorMessage(value) {
    if (!String(value || '').trim()) return 'Road / street is required.';
    return isValidRoad(value) ? '' : 'Enter a valid road or street.';
  }
  function confirmPasswordErrorMessage(confirmValue, passwordValue) {
    if (!String(confirmValue || '')) return 'Confirm your password.';
    return confirmValue === passwordValue ? '' : 'Passwords do not match.';
  }

  function setFormMessage(form, id, message) {
    if (!form) return;
    let node = $('#' + id);
    if (!node) {
      node = document.createElement('p');
      node.id = id;
      node.className = 'payment-warning';
      form.insertBefore(node, form.firstChild);
    }
    node.textContent = message || '';
    node.hidden = !message;
  }

  function prefillIdentityFields(nameSelector, emailSelector) {
    const user = getUser();
    if (!user) return;
    const nameField = $(nameSelector);
    const emailField = $(emailSelector);
    if (nameField && !String(nameField.value || '').trim() && user.name) nameField.value = user.name;
    if (emailField && !String(emailField.value || '').trim() && user.email) emailField.value = canonicalEmail(user.email);
  }

  function validatePaymentForm(form) {
    clearFormInvalidState(form);
    setFormMessage(form, 'paymentFormError', '');
    const fields = {
      name: $('#name', form),
      email: $('#email', form),
      card: $('#card', form),
      expiry: $('#expiry', form),
      cvv: $('#cvv', form),
      governorate: $('#lbState', form),
      city: $('#city', form),
      road: $('#road', form)
    };
    Object.keys(fields).forEach((k) => clearInlineFieldError(fields[k]));
    const phoneCountryField = $('#phoneCountry', form);
    const phoneNumberField = $('#phoneNumber', form);
    if (phoneNumberField) clearInlineFieldError(phoneNumberField);
    const phoneResult = phoneNumberField
      ? validatePhoneInput(phoneCountryField && phoneCountryField.value, phoneNumberField.value)
      : { ok: true };
    // Each entry: [field, error-message-or-empty-string]. Empty = field passes.
    // Show ALL errors at once so the user fixes the form in one pass.
    const checks = [
      [fields.name, nameErrorMessage(fields.name && fields.name.value)],
      [fields.email, emailErrorMessage(fields.email && fields.email.value)],
      [fields.card, cardErrorMessage(fields.card && fields.card.value)],
      [fields.expiry, expiryErrorMessage(fields.expiry && fields.expiry.value)],
      [fields.cvv, cvvErrorMessage(fields.cvv && fields.cvv.value)],
      [fields.governorate, (fields.governorate && String(fields.governorate.value || '').trim()) ? '' : 'Choose a governorate.'],
      [fields.city, cityErrorMessage(fields.city && fields.city.value)],
      [fields.road, roadErrorMessage(fields.road && fields.road.value)],
      [phoneNumberField || phoneCountryField, phoneResult.ok ? '' : (phoneResult.message || 'Enter a valid phone number for the selected country.')]
    ];
    let firstError = '';
    checks.forEach((entry) => {
      const field = entry[0];
      const msg = entry[1];
      if (msg) {
        setInlineFieldError(field, msg);
        if (!firstError) firstError = msg;
      }
    });
    if (firstError) {
      setFormMessage(form, 'paymentFormError', 'Please fix the highlighted fields before paying.');
      showToast(firstError, 'error');
      return false;
    }
    return true;
  }
  function userIdFromEmail(email) {
    return 'user-' + canonicalEmail(email).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function normalizeStoredUser(user) {
    const email = canonicalEmail(user && user.email);
    if (!email) return null;
    const role = (user.role === 'admin') ? 'admin' : 'user';
    return {
      id: user.id || userIdFromEmail(email),
      name: String(user.name || email.split('@')[0] || 'Customer').trim(),
      email,
      password: String(user.password || ''),
      role,
      createdAt: user.createdAt || user.signedInAt || new Date().toISOString(),
      lastLoginAt: user.lastLoginAt || user.signedInAt || ''
    };
  }

  function getRegisteredUsers() {
    const raw = readJSON(STORAGE.users, []);
    const users = Array.isArray(raw) ? raw : [];
    const byEmail = new Map();
    users.forEach((user) => {
      const normalized = normalizeStoredUser(user);
      if (normalized && normalized.role !== 'admin') byEmail.set(normalized.email, normalized);
    });
    return Array.from(byEmail.values());
  }

  function saveRegisteredUsers(users) {
    // Legacy compatibility only. User persistence is handled by the backend.
    const byEmail = new Map();
    (Array.isArray(users) ? users : []).forEach((user) => {
      const normalized = normalizeStoredUser(user);
      if (normalized && normalized.role !== 'admin') byEmail.set(normalized.email, normalized);
    });
    writeJSON(STORAGE.users, Array.from(byEmail.values()));
  }

  function getAdminUser() {
    return {
      id: 'admin',
      name: 'Admin',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin',
      createdAt: '2025-01-01T00:00:00.000Z',
      lastLoginAt: ''
    };
  }

  function createSession(user) {
    const normalized = normalizeStoredUser(user);
    if (!normalized) return null;
    const now = new Date().toISOString();
    const session = {
      id: normalized.id,
      email: normalized.email,
      name: normalized.name,
      role: normalized.role,
      createdAt: normalized.createdAt,
      lastLoginAt: now,
      signedInAt: now
    };
    writeJSON(STORAGE.session, session);
    return session;
  }

  function getCurrentSession() {
    const session = readJSON(STORAGE.session, null);
    const email = canonicalEmail(session && session.email);
    const role = session && (session.role === 'admin' || session.role === 'user') ? session.role : '';
    if (!email || !role) return null;
    return {
      ...session,
      email,
      role,
      name: String(session.name || email.split('@')[0] || 'Customer').trim()
    };
  }

  function isSignedIn() {
    const session = getCurrentSession();
    return Boolean(session && session.email && session.role === 'user');
  }

  function isAdminSignedIn() {
    const session = getCurrentSession();
    return Boolean(session && session.email && session.role === 'admin');
  }

  function getUser() {
    return getCurrentSession();
  }

  function setUser(user) {
    if (user) createSession(user);
    else {
      clearFrontendSessionState();
      // Fire-and-forget logout call to invalidate the server-side session cookie.
      try {
        BackendBridge.apiFetch('/auth/logout', { method: 'POST' }).then(refreshCommerceStateFromBackend);
      } catch (e) {}
    }
  }

  function clearFrontendSessionState() {
      if (BackendBridge.clearCsrfToken) BackendBridge.clearCsrfToken();
      BackendBridge.setMem(STORAGE.session, null);
      BackendBridge.setMem(STORAGE.user, null);
      BackendBridge.setMem(STORAGE.orders, []);
      BackendBridge.setMem(STORAGE.ratings, []);
      BackendBridge.setMem(STORAGE.messages, []);
      BackendBridge.setMem(STORAGE.coupon, null);
      try { localStorage.removeItem(STORAGE.session); } catch (e) {}
      try { sessionStorage.removeItem("elitekits_applied_coupon_v1"); } catch (e) {}
  }

  async function refreshCommerceStateFromBackend() {
    try {
      const cart = await BackendBridge.apiFetch('/cart');
      BackendBridge.setMem(STORAGE.cart, (cart && cart.ok) ? BackendBridge.backendCartToLocal(cart.data && cart.data.items) : []);
      const wl = await BackendBridge.apiFetch('/wishlist');
      BackendBridge.setMem(STORAGE.wishlist, (wl && wl.ok) ? BackendBridge.backendWishlistToLocal(wl.data && wl.data.items) : []);
      updateCartCount();
      updateWishlistCount();
    } catch (e) {}
  }

  async function logoutCurrentBackendSession() {
    clearFrontendSessionState();
    try { await BackendBridge.apiFetch('/auth/logout', { method: 'POST' }); } catch (e) {}
    await refreshCommerceStateFromBackend();
    // Cart/wishlist DB rows for the now-logged-out user are NOT deleted.
    // They are scoped to user_id server-side, so the next sign-in restores them.
  }

  function markInternalNavigation() {
    try { sessionStorage.setItem(INTERNAL_NAV_KEY, '1'); } catch (error) {}
  }

  function consumeInternalNavigationFlag() {
    let value = false;
    try {
      value = sessionStorage.getItem(INTERNAL_NAV_KEY) === '1';
      sessionStorage.removeItem(INTERNAL_NAV_KEY);
    } catch (error) {}
    return value;
  }

  function isPageReload() {
    try {
      const entry = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
      if (entry && entry.type) return entry.type === 'reload';
      return Boolean(performance.navigation && performance.navigation.type === 1);
    } catch (error) {
      return false;
    }
  }

  function shouldClearSessionOnLoad() {
    const internalNavigation = consumeInternalNavigationFlag();
    if (!getCurrentSession()) return false;
    // Admin sessions must survive reloads and URL pastes. Auto-logout here
    // wipes STORAGE.orders/ratings/messages via clearFrontendSessionState()
    // *after* hydrate has loaded them, leaving the admin dashboard blank.
    if (isAdminSignedIn()) return false;
    if (isPageReload()) return true;
    return !internalNavigation;
  }

  function clearLoginRedirect() {
    localStorage.removeItem(STORAGE.redirect);
  }

  function getSafeLoginRedirect() {
    const target = String(localStorage.getItem(STORAGE.redirect) || '').trim();
    return /^Payment\.html$/i.test(target) ? 'Payment.html' : '';
  }

  function redirectWithinSite(target) {
    markInternalNavigation();
    window.location.href = target;
  }

  function isInternalUrl(url) {
    if (url.protocol === 'file:' && window.location.protocol === 'file:') {
      return url.host === window.location.host;
    }
    return url.origin === window.location.origin;
  }

  async function handleSessionNavigation() {
    const clearSession = shouldClearSessionOnLoad();
    if (!clearSession) return;
    // Refresh or manual URL paste must revoke the backend session AND clear
    // local auth state. Cart/wishlist DB rows stay intact (they're tied to
    // the user_id, not the session token).
    if (getUser()) {
      await logoutCurrentBackendSession();
    } else {
      // Defensive: even if MEM shows no user, the cookie may still be valid
      // server-side (e.g. hydrate failed). Ask backend to revoke + delete cookie.
      try { await BackendBridge.apiFetch('/auth/logout', { method: 'POST' }); } catch (e) {}
      clearFrontendSessionState();
      try { await refreshCommerceStateFromBackend(); } catch (e) {}
    }
    clearLoginRedirect();
  }

  function initInternalNavigationTracking() {
    document.addEventListener('click', async (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest('a[href]');
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const href = link.getAttribute('href') || '';
      if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(href)) return;
      try {
        const url = new URL(href, window.location.href);
        if (isInternalUrl(url)) markInternalNavigation();
      } catch (error) {}
    });
  }

  function cleanSize(value) {
    const normalized = String(value || '').trim().toUpperCase().replace(/^XXXL$/, '3XL').replace(/^XXL$/, '2XL');
    return SIZES.includes(normalized) ? normalized : '';
  }

  function cleanCustomName(value) {
    return String(value || '').replace(/\s+/g, ' ').trim().slice(0, 18);
  }

  function cleanCustomNumber(value) {
    return String(value || '').replace(/[^0-9]/g, '').slice(0, 3);
  }

  function normalizeCustomNameInput(value) {
    return String(value || '').trim().replace(/\s+/g, ' ');
  }

  function customizationValidationMessage(personalize, customName, customNumber) {
    if (!personalize) return '';
    const name = normalizeCustomNameInput(customName);
    const number = String(customNumber || '').trim();
    if (!name && !number) return 'Enter a name or number, or turn off personalization.';
    if (name && !/[A-Za-z]/.test(name)) {
      return 'Name must include at least one letter. Numbers are allowed, but the name cannot be numbers only.';
    }
    if (name && (name.length > 18 || !/^[A-Za-z0-9\s.'-]+$/.test(name))) {
      return 'Name can use letters, numbers, spaces, apostrophes, periods, or hyphens only.';
    }
    if (number && !/^\d+$/.test(number)) return 'Number must be numeric.';
    if (number && Number(number) > 99) return 'Number must be 99 or lower.';
    return '';
  }

  function hasCustomization(item) {
    return Boolean(item && item.personalize && (cleanCustomName(item.customName) || cleanCustomNumber(item.customNumber)));
  }

  function hasMissingCustomization(item) {
    return Boolean(item && item.personalize && !cleanCustomName(item.customName) && !cleanCustomNumber(item.customNumber));
  }

  function hasInvalidCustomizationNumber(item) {
    const number = cleanCustomNumber(item && item.customNumber);
    return Boolean(item && item.personalize && number && Number(number) > 99);
  }

  function hasInvalidCustomizationName(item) {
    const name = cleanCustomName(item && item.customName);
    return Boolean(item && item.personalize && name && (!/[A-Za-z]/.test(name) || !/^[A-Za-z0-9\s.'-]+$/.test(name)));
  }

  function cartLineKey(productId, size, customName, customNumber) {
    return [productId, size, cleanCustomName(customName).toUpperCase(), cleanCustomNumber(customNumber)].join('__');
  }

  function baseCartLineKey(productId) {
    return productId + '__base';
  }

  function normalizeCartItem(item) {
    const product = productById(item && item.id);
    if (!product) return null;
    const size = cleanSize(item.size);
    const customName = cleanCustomName(item.customName || item.name || '');
    const customNumber = cleanCustomNumber(item.customNumber || item.number || '');
    const personalize = Boolean(item.personalize || customName || customNumber);
    const lineId = item.lineId || (size || personalize ? cartLineKey(product.id, size, customName, customNumber) : baseCartLineKey(product.id));
    const requestedQuantity = parseInt(item.quantity || item.qty || 1, 10) || 1;
    const quantity = product.stock > 0 ? clamp(requestedQuantity, 1, product.stock) : 1;
    return { lineId, id: product.id, size, personalize, customName, customNumber, quantity };
  }

  function getCart() {
    const raw = readJSON(STORAGE.cart, []);
    const items = Array.isArray(raw) ? raw : [];
    const merged = new Map();
    let changed = !Array.isArray(raw);
    items.forEach((item) => {
      const normalized = normalizeCartItem(item);
      if (!normalized) {
        changed = true;
        return;
      }
      if (JSON.stringify(item) !== JSON.stringify(normalized)) changed = true;
      const existing = merged.get(normalized.lineId);
      if (existing) {
        const product = productById(existing.id);
        const previous = existing.quantity;
        existing.quantity = product && product.stock > 0 ? clamp(existing.quantity + normalized.quantity, 1, product.stock) : 1;
        if (existing.quantity !== previous + normalized.quantity) changed = true;
      } else {
        merged.set(normalized.lineId, normalized);
      }
    });
    const normalizedItems = Array.from(merged.values());
    if (changed) writeJSON(STORAGE.cart, normalizedItems);
    return normalizedItems;
  }

  function saveCart(items) {
    const normalized = items.map(normalizeCartItem).filter(Boolean);
    writeJSON(STORAGE.cart, normalized);
    updateCartCount();
    syncProductCardStates();
  }

  function getWishlist() {
    const raw = readJSON(STORAGE.wishlist, []);
    const ids = Array.isArray(raw) ? raw : [];
    return Array.from(new Set(ids)).filter((id) => Boolean(productById(id)));
  }

  function saveWishlist(ids) {
    const valid = Array.from(new Set(ids)).filter((id) => Boolean(productById(id)));
    // Diff against current cached wishlist so we can issue minimal add/remove API calls
    const prev = Array.isArray(BackendBridge.getMem(STORAGE.wishlist, [])) ? BackendBridge.getMem(STORAGE.wishlist, []) : [];
    const prevSet = new Set(prev);
    const nextSet = new Set(valid);
    BackendBridge.setMem(STORAGE.wishlist, valid);
    // Adds
    valid.forEach((pid) => { if (!prevSet.has(pid)) BackendBridge.persistWishlistAdd(pid); });
    // Removes
    prev.forEach((pid) => { if (!nextSet.has(pid)) BackendBridge.persistWishlistRemove(pid); });
    updateWishlistCount();
    syncProductCardStates();
  }

  function updateCartCount() {
    const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
    $$("#cartCount, [data-cart-count]").forEach((badge) => {
      badge.textContent = String(count);
      badge.setAttribute("aria-label", count + " cart items");
    });
  }

  function updateWishlistCount() {
    const count = getWishlist().length;
    $$("#wishlistCount, [data-wishlist-count]").forEach((badge) => {
      badge.textContent = String(count);
      badge.setAttribute("aria-label", count + " wishlist items");
    });
    const wlCount = $("#wlCount");
    if (wlCount) wlCount.textContent = String(count);
  }

  function showToast(message, type = "success") {
    let toast = $("#toast");
    let msg = $("#toastMsg");
    if (!toast || !msg) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.id = 'toast';
      toast.innerHTML = '<i class="fa-solid fa-circle-check"></i><span id="toastMsg"></span>';
      document.body.appendChild(toast);
      msg = $("#toastMsg");
      if (!msg) {
        msg = document.createElement('span');
        msg.id = 'toastMsg';
        toast.appendChild(msg);
      }
    }
    msg.textContent = message;
    toast.dataset.type = type;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  function showProductValidation(card, message) {
    const target = card ? $('[data-product-error]', card) : null;
    if (target) {
      target.textContent = message;
      target.hidden = false;
    } else {
      showToast(message, 'error');
    }
  }

  function clearProductValidation(card) {
    const target = card ? $('[data-product-error]', card) : null;
    if (target) {
      target.textContent = '';
      target.hidden = true;
    }
  }

  async function addToCart(productId, config = {}, sourceCard = null) {
    const product = productById(productId);
    if (!product) return false;
    if (product.stock <= 0) {
      showProductValidation(sourceCard, 'This jersey is out of stock.');
      return false;
    }
    const size = cleanSize(config.size);
    const personalize = Boolean(config.personalize);
    const validationMessage = customizationValidationMessage(personalize, config.customName, config.customNumber);
    if (validationMessage) {
      showProductValidation(sourceCard, validationMessage);
      return false;
    }
    const customName = personalize ? cleanCustomName(config.customName) : '';
    const customNumber = personalize ? cleanCustomNumber(config.customNumber) : '';
    clearProductValidation(sourceCard);
    const res = await BackendBridge.apiFetch('/cart/items', {
      method: 'POST',
      body: {
        product: product.id,
        size,
        quantity: 1,
        personalize,
        print_enabled: personalize,
        custom_name: customName,
        custom_number: customNumber
      }
    });
    if (!res || !res.ok) {
      const message = (res && res.error && res.error.message) || 'Could not add this jersey to your cart.';
      showProductValidation(sourceCard, message);
      return false;
    }
    BackendBridge.setMem(STORAGE.cart, BackendBridge.backendCartToLocal(res.data && res.data.items));
    updateCartCount();
    syncProductCardStates();
    renderCartPage();
    renderPaymentSummary();
    showToast(product.team + ' added to cart.');
    return true;
  }

  function removeFromCart(lineId) {
    saveCart(getCart().filter((item) => item.lineId !== lineId));
    renderCartPage();
    renderPaymentSummary();
  }

  function updateCartQuantity(lineId, quantity) {
    const cart = getCart();
    const item = cart.find((entry) => entry.lineId === lineId);
    if (!item) return;
    const product = productById(item.id);
    if (!product) return;
    if (product.stock <= 0) {
      showCartCheckoutError(product.team + ' is out of stock. Remove it before checkout.');
      showToast(product.team + ' is out of stock.', 'error');
      item.quantity = 1;
    } else if (quantity > product.stock) {
      item.quantity = product.stock;
      showCartCheckoutError('Only ' + product.stock + ' available in stock for ' + product.team + '.');
      showToast('Only ' + product.stock + ' available in stock.', 'error');
    } else {
      item.quantity = clamp(quantity, 1, product.stock);
      showCartCheckoutError('');
    }
    saveCart(cart);
    renderCartPage();
    renderPaymentSummary();
  }

  function addToWishlist(productId) {
    const product = productById(productId);
    if (!product) return false;
    const wishlist = getWishlist();
    if (!wishlist.includes(product.id)) wishlist.push(product.id);
    saveWishlist(wishlist);
    renderWishlistPage();
    showToast(product.team + " saved to wishlist.");
    return true;
  }

  function removeFromWishlist(productId) {
    const product = productById(productId);
    saveWishlist(getWishlist().filter((id) => id !== productId));
    renderWishlistPage();
    if (product) showToast(product.team + " removed from wishlist.");
  }

  function toggleWishlist(productId) {
    const wishlist = getWishlist();
    if (wishlist.includes(productId)) removeFromWishlist(productId);
    else addToWishlist(productId);
  }

  function stockLabel(product) {
    if (product.stock <= 0) return "Out of Stock";
    if (product.stock <= 3) return "Only " + product.stock + " left";
    return "In Stock";
  }

  function productCardHTML(product) {
    const wishlisted = getWishlist().includes(product.id);
    const isOut = product.stock <= 0;
    const stockClass = isOut ? "is-out" : product.stock <= 3 ? "is-low" : "is-in";
    const heartIcon = wishlisted ? "fa-solid" : "fa-regular";
    const title = escapeHTML(product.team);
    return [
      '<article class="product-card" data-product-card data-product-id="' + escapeHTML(product.id) + '" data-stock="' + product.stock + '">',
      '  <div class="product-media">',
      '    <button type="button" class="product-preview-trigger" data-product-preview data-product-id="' + escapeHTML(product.id) + '" aria-label="Preview ' + title + '">',
      '      <img src="' + escapeHTML(product.image || DEFAULT_IMG) + '" alt="' + title + ' jersey" loading="lazy">',
      '    </button>',
      '    <span class="stock-badge ' + stockClass + '">' + stockLabel(product) + '</span>',
      '    <button type="button" class="product-heart' + (wishlisted ? ' is-active' : '') + '" data-wishlist-toggle data-product-id="' + escapeHTML(product.id) + '" aria-label="' + (wishlisted ? 'Remove from wishlist' : 'Save to wishlist') + '" aria-pressed="' + (wishlisted ? 'true' : 'false') + '">',
      '      <i class="' + heartIcon + ' fa-heart"></i>',
      '    </button>',
      '  </div>',
      '  <div class="product-body">',
      '    <div class="product-kicker">' + escapeHTML(product.league) + '</div>',
      '    <h3 class="product-title">' + title + '</h3>',
      '    <p class="product-meta"><span>' + escapeHTML(product.season) + '</span><span>' + money(product.price) + '</span></p>',
      '    <p class="product-card-error" data-product-error hidden></p>',
      '    <div class="product-actions">',
      '      <button type="button" class="btn-buy product-add" data-add-to-cart data-product-id="' + escapeHTML(product.id) + '"' + (isOut ? ' disabled aria-disabled="true"' : '') + '>',
      '        <i class="fa-solid fa-cart-plus"></i><span>' + (isOut ? 'Out of Stock' : 'Add to Cart') + '</span>',
      '      </button>',
      '    </div>',
      '  </div>',
      '</article>'
    ].join('');
  }

  function syncProductCardStates() {
    const wishlist = getWishlist();
    $$('[data-product-card]').forEach((card) => {
      const id = card.dataset.productId;
      const product = productById(id);
      if (!product) return;
      const wishlistButton = $('[data-wishlist-toggle]', card);
      const addButton = $('[data-add-to-cart]', card);
      if (wishlistButton) {
        const active = wishlist.includes(id);
        wishlistButton.classList.toggle('is-active', active);
        wishlistButton.setAttribute('aria-pressed', active ? 'true' : 'false');
        wishlistButton.setAttribute('aria-label', active ? 'Remove from wishlist' : 'Save to wishlist');
        wishlistButton.innerHTML = '<i class="' + (active ? 'fa-solid' : 'fa-regular') + ' fa-heart"></i>';
      }
      if (addButton) {
        const out = product.stock <= 0;
        addButton.disabled = out;
        addButton.setAttribute('aria-disabled', out ? 'true' : 'false');
        addButton.innerHTML = '<i class="fa-solid fa-cart-plus"></i><span>' + (out ? 'Out of Stock' : 'Add to Cart') + '</span>';
      }
    });
  }

  function renderProducts(products, container, emptyNode) {
    if (!container) return;
    if (!products.length) {
      container.innerHTML = "";
      if (emptyNode) emptyNode.hidden = false;
      return;
    }
    container.innerHTML = products.map(productCardHTML).join("");
    if (emptyNode) emptyNode.hidden = true;
  }

  function stockBySizeSummary(product) {
    const stockBySize = getProductStockBySize(product);
    const sizes = Object.keys(stockBySize);
    if (!sizes.length) return '';
    return SIZES.map((size) => size + ' ' + (stockBySize[size] || 0)).join(' / ');
  }

  function stockBySizeChipsHTML(product) {
    const stockBySize = getProductStockBySize(product);
    if (!Object.keys(stockBySize).length) return '<span class="admin-size-chip is-empty">No size data</span>';
    return SIZES.map((size) => {
      const qty = Number(stockBySize[size] || 0);
      const cls = qty <= 0 ? 'is-out' : qty <= 3 ? 'is-low' : 'is-in';
      return '<span class="admin-size-chip ' + cls + '"><b>' + size + '</b><strong>' + qty + '</strong></span>';
    }).join('');
  }

  function adminStockStatus(product) {
    if (!product || product.stock <= 0) return { label: 'Out of Stock', cls: 'is-out' };
    if (product.stock <= 3) return { label: 'Low Stock', cls: 'is-low' };
    return { label: 'In Stock', cls: 'is-in' };
  }

  function productPreviewStockHTML(product) {
    const stockBySize = getProductStockBySize(product);
    if (!Object.keys(stockBySize).length) {
      return '<p class="product-preview-stock-note">' + escapeHTML(stockLabel(product)) + '</p>';
    }
    return '<div class="product-preview-stock-grid">' + SIZES.map((size) => {
      const qty = Number(stockBySize[size] || 0);
      return '<span class="' + (qty <= 0 ? 'is-out' : qty <= 3 ? 'is-low' : 'is-in') + '"><strong>' + size + '</strong>' + qty + '</span>';
    }).join('') + '</div>';
  }

  function productPreviewSizeHTML(product) {
    const stockBySize = getProductStockBySize(product);
    const hasSizeStock = Object.keys(stockBySize).length > 0;
    return '<div class="product-preview-size-pills" role="group" aria-label="Select size">' + SIZES.map((size) => {
      const qty = hasSizeStock ? Number(stockBySize[size] || 0) : product.stock;
      const disabled = qty <= 0;
      return '<button type="button" class="preview-size-pill" data-preview-size="' + size + '" aria-pressed="false"' + (disabled ? ' disabled aria-disabled="true"' : '') + '>' + size + '</button>';
    }).join('') + '</div>';
  }

  function ensureProductPreviewModal() {
    let modal = $('#productPreviewModal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'productPreviewModal';
    modal.className = 'product-preview-overlay';
    modal.hidden = true;
    modal.innerHTML = '<div class="product-preview-modal" role="dialog" aria-modal="true" aria-labelledby="productPreviewTitle"><button type="button" class="product-preview-close" data-product-preview-close aria-label="Close product preview"><i class="fa-solid fa-xmark"></i></button><div id="productPreviewContent"></div></div>';
    document.body.appendChild(modal);
    return modal;
  }

  function setProductPreviewError(modal, message) {
    const error = modal ? $('[data-product-error]', modal) : null;
    if (error) {
      error.textContent = message || '';
      error.hidden = !message;
    }
    if (message) showToast(message, 'error');
  }

  function closeProductPreviewModal() {
    const modal = $('#productPreviewModal');
    if (!modal) return;
    modal.hidden = true;
    modal.classList.remove('is-open');
    modal.dataset.productId = '';
    modal.dataset.size = '';
  }

  function updateProductPreviewPersonalization(modal) {
    if (!modal) return;
    const toggle = $('[data-preview-personalize]', modal);
    const fields = $('.product-preview-personalization-fields', modal);
    const enabled = Boolean(toggle && toggle.checked);
    if (fields) fields.hidden = !enabled;
    if (!enabled) {
      const name = $('[data-preview-name]', modal);
      const number = $('[data-preview-number]', modal);
      if (name) name.value = '';
      if (number) number.value = '';
    }
    setProductPreviewError(modal, '');
  }

  function openProductPreviewModal(productId) {
    const product = productById(productId);
    if (!product) return;
    const modal = ensureProductPreviewModal();
    const content = $('#productPreviewContent', modal);
    const stockClass = product.stock <= 0 ? 'is-out' : product.stock <= 3 ? 'is-low' : 'is-in';
    modal.dataset.productId = product.id;
    modal.dataset.size = '';
    if (content) {
      content.innerHTML = [
        '<div class="product-preview-layout">',
        '  <div class="product-preview-image-wrap"><img src="' + escapeHTML(product.image || DEFAULT_IMG) + '" alt="' + escapeHTML(product.team) + ' jersey"></div>',
        '  <div class="product-preview-info">',
        '    <div class="product-preview-kicker">' + escapeHTML(product.league) + '</div>',
        '    <h2 id="productPreviewTitle">' + escapeHTML(product.team) + '</h2>',
        '    <div class="product-preview-meta"><span>' + escapeHTML(product.season) + '</span><strong>' + money(product.price) + '</strong></div>',
        '    <span class="stock-badge ' + stockClass + '">' + escapeHTML(stockLabel(product)) + '</span>',
        '    <section class="product-preview-block"><h3>Stock by size</h3>' + productPreviewStockHTML(product) + '</section>',
        '    <section class="product-preview-block"><h3>Choose size</h3>' + productPreviewSizeHTML(product) + '</section>',
        '    <label class="cart-personalize-toggle product-preview-toggle"><input type="checkbox" data-preview-personalize> Personalize (+$5)</label>',
        '    <div class="product-preview-personalization-fields" hidden>',
        '      <label>Name<input class="input" type="text" data-preview-name maxlength="18" placeholder="Optional name"></label>',
        '      <label>Number<input class="input" type="text" data-preview-number inputmode="numeric" maxlength="2" placeholder="Optional number"></label>',
        '    </div>',
        '    <p class="product-card-error" data-product-error hidden></p>',
        '    <button type="button" class="btn-buy product-preview-add" data-preview-add-to-cart' + (product.stock <= 0 ? ' disabled aria-disabled="true"' : '') + '><i class="fa-solid fa-cart-plus"></i><span>' + (product.stock <= 0 ? 'Out of Stock' : 'Add to Cart') + '</span></button>',
        '  </div>',
        '</div>'
      ].join('');
    }
    modal.hidden = false;
    window.requestAnimationFrame(() => modal.classList.add('is-open'));
  }

  function initProductPreviewModal() {
    if (document.body.dataset.productPreviewBound === 'true') return;
    document.body.dataset.productPreviewBound = 'true';
    document.addEventListener('click', async (event) => {
      const modal = $('#productPreviewModal');
      if (!modal || modal.hidden) return;
      if (event.target === modal || event.target.closest('[data-product-preview-close]')) {
        closeProductPreviewModal();
        return;
      }
      const sizeButton = event.target.closest('[data-preview-size]');
      if (sizeButton && modal.contains(sizeButton)) {
        modal.dataset.size = sizeButton.dataset.previewSize || '';
        $$('[data-preview-size]', modal).forEach((button) => {
          const selected = button === sizeButton;
          button.classList.toggle('is-selected', selected);
          button.setAttribute('aria-pressed', selected ? 'true' : 'false');
        });
        setProductPreviewError(modal, '');
        return;
      }
      const addButton = event.target.closest('[data-preview-add-to-cart]');
      if (addButton && modal.contains(addButton)) {
        const product = productById(modal.dataset.productId);
        if (!product) return;
        const size = cleanSize(modal.dataset.size);
        if (!size) {
          setProductPreviewError(modal, 'Select a size before adding this jersey.');
          return;
        }
        const stockBySize = getProductStockBySize(product);
        if (Object.keys(stockBySize).length && Number(stockBySize[size] || 0) <= 0) {
          setProductPreviewError(modal, 'Selected size is out of stock.');
          return;
        }
        const personalize = Boolean(($('[data-preview-personalize]', modal) || {}).checked);
        const customName = ($('[data-preview-name]', modal) || {}).value || '';
        const customNumber = ($('[data-preview-number]', modal) || {}).value || '';
        const validationMessage = customizationValidationMessage(personalize, customName, customNumber);
        if (validationMessage) {
          setProductPreviewError(modal, validationMessage);
          return;
        }
        addButton.disabled = true;
        try {
          const added = await addToCart(product.id, { size, personalize, customName, customNumber }, modal);
          if (added) closeProductPreviewModal();
        } finally {
          const fresh = productById(product.id);
          addButton.disabled = Boolean(fresh && fresh.stock <= 0);
        }
      }
    });
    document.addEventListener('change', (event) => {
      const modal = $('#productPreviewModal');
      if (!modal || modal.hidden || !modal.contains(event.target)) return;
      if (event.target.closest('[data-preview-personalize]')) updateProductPreviewPersonalization(modal);
    });
    document.addEventListener('input', (event) => {
      const modal = $('#productPreviewModal');
      if (!modal || modal.hidden || !modal.contains(event.target)) return;
      if (event.target.closest('[data-preview-number]')) {
        event.target.value = String(event.target.value || '').replace(/\D/g, '').slice(0, 2);
      }
      if (event.target.closest('[data-preview-name], [data-preview-number]')) setProductPreviewError(modal, '');
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeProductPreviewModal();
    });
  }

  function getCurrentLeagueKey() {
    const bodyKey = document.body.dataset.leagueKey;
    if (bodyKey) return bodyKey;
    const bodyName = document.body.dataset.leagueName;
    if (bodyName) {
      const match = LEAGUES.find((league) => normalizeText(league.league) === normalizeText(bodyName));
      if (match) return match.key;
    }
    const page = currentPageFile();
    const matchByFile = LEAGUES.find((league) => page === league.file.toLowerCase());
    return matchByFile ? matchByFile.key : "";
  }

  function sortProducts(products, sortValue) {
    const sorted = products.slice();
    switch (sortValue) {
      case "name-asc":
        sorted.sort((a, b) => a.team.localeCompare(b.team));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.team.localeCompare(a.team));
        break;
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price || a.order - b.order);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price || a.order - b.order);
        break;
      case "stock-desc":
        sorted.sort((a, b) => b.stock - a.stock || a.order - b.order);
        break;
      case "popular":
        sorted.sort((a, b) => b.salesRank - a.salesRank || a.order - b.order);
        break;
      case "newest":
        sorted.sort((a, b) => b.order - a.order);
        break;
      default:
        sorted.sort((a, b) => a.order - b.order);
    }
    return sorted;
  }

  function applyProductFilters() {
    const grid = $('[data-products-grid]');
    if (!grid) return;
    const leagueKey = getCurrentLeagueKey();
    const searchInput = $('#teamSearch');
    const sortSelect = $('#leagueSortSelect');
    const stockSelect = $('#leagueStockFilter');
    const emptyNode = $('[data-products-empty]');
    const search = normalizeText(searchInput ? searchInput.value : "");
    const stockFilter = stockSelect ? stockSelect.value : "all";
    const sortValue = sortSelect ? sortSelect.value : "default";
    let products = PRODUCTS.filter((product) => !leagueKey || product.leagueKey === leagueKey);
    if (search) {
      products = products.filter((product) => {
        return normalizeText(product.team + " " + product.baseName + " " + product.league).includes(search);
      });
    }
    if (stockFilter === "in") products = products.filter((product) => product.stock > 0);
    if (stockFilter === "out") products = products.filter((product) => product.stock === 0);
    renderProducts(sortProducts(products, sortValue), grid, emptyNode);
    renderSuggestions(products, search);
  }

  function renderSuggestions(products, search) {
    const suggestions = $('#teamSuggestions');
    if (!suggestions) return;
    if (!search) {
      suggestions.hidden = true;
      suggestions.innerHTML = "";
      return;
    }
    const names = Array.from(new Set(products.map((product) => product.baseName))).slice(0, 6);
    if (!names.length) {
      suggestions.hidden = true;
      suggestions.innerHTML = "";
      return;
    }
    suggestions.innerHTML = names.map((name) => '<button type="button" data-suggestion="' + escapeHTML(name) + '">' + escapeHTML(name) + '</button>').join("");
    suggestions.hidden = false;
  }

  function calculateCartTotals(cart = getCart()) {
    const items = cart.reduce((sum, item) => {
      const product = productById(item.id);
      return sum + effectiveCartQuantity(product, item);
    }, 0);
    const subtotal = cart.reduce((sum, item) => {
      const product = productById(item.id);
      return sum + (product ? product.price * effectiveCartQuantity(product, item) : 0);
    }, 0);
    const customization = cart.reduce((sum, item) => {
      const product = productById(item.id);
      return sum + (hasCustomization(item) ? CUSTOMIZATION_FEE * effectiveCartQuantity(product, item) : 0);
    }, 0);
    const coupon = readJSON(STORAGE.coupon, null);
    let delivery = subtotal > 0 ? DELIVERY_FEE : 0;
    let discount = 0;
    let label = "Discount";
    if (coupon && subtotal > 0) {
      if (coupon.type === "free-delivery") {
        discount = delivery;
        label = "Free delivery";
      } else if (coupon.type === "percent") {
        // Round to 2 decimals (cents) so this matches the backend's
        // round(..., 2) discount calculation exactly. Using Math.round()
        // here would truncate $1.25 -> $1 and mislead the user.
        discount = Math.round((subtotal + customization) * (Number(coupon.value) || 0)) / 100;
        label = (coupon.value || 0) + "% discount";
      } else if (coupon.type === "amount") {
        discount = Math.min(subtotal + customization, Number(coupon.value) || 0);
        label = money(discount) + " discount";
      }
    }
    const totalRaw = subtotal + customization + delivery - discount;
    const total = Math.max(0, Math.round(totalRaw * 100) / 100);
    return { items, subtotal, customization, delivery, discount, label, total, coupon };
  }

  function cartSummary(cart) {
    return calculateCartTotals(cart);
  }

  function cartLineTotal(product, item) {
    return (product.price + (hasCustomization(item) ? CUSTOMIZATION_FEE : 0)) * effectiveCartQuantity(product, item);
  }

  function effectiveCartQuantity(product, item) {
    if (!product || product.stock <= 0) return 0;
    return clamp(parseInt(item.quantity || 1, 10) || 1, 1, product.stock);
  }

  function cartStockStatusText(product, item) {
    if (!product || product.stock <= 0) return 'Out of stock';
    const available = product.stock;
    if (item && item.quantity >= available) return 'Only ' + available + ' available in stock';
    if (available <= 3) return 'Only ' + available + ' in stock';
    return available + ' available in stock';
  }

  function sizeButtonsHTML(selectedSize, lineId) {
    const selected = cleanSize(selectedSize);
    return '<div class="cart-size-pills" role="group" aria-label="Select jersey size">' + SIZES.map((size) => {
      return '<button type="button" class="cart-size-pill' + (selected === size ? ' is-selected' : '') + '" data-cart-size-button data-line-id="' + escapeHTML(lineId) + '" data-size="' + size + '" aria-pressed="' + (selected === size ? 'true' : 'false') + '">' + size + '</button>';
    }).join('') + '</div>';
  }

  function nextCartLineId(item) {
    if (!item) return '';
    const customName = item.personalize ? item.customName : '';
    const customNumber = item.personalize ? item.customNumber : '';
    return item.size || item.personalize ? cartLineKey(item.id, item.size, customName, customNumber) : baseCartLineKey(item.id);
  }

  function updateCartConfiguration(lineId, updates) {
    const cart = getCart();
    const item = cart.find((entry) => entry.lineId === lineId);
    if (!item) return;
    if (Object.prototype.hasOwnProperty.call(updates, 'size')) item.size = cleanSize(updates.size);
    if (Object.prototype.hasOwnProperty.call(updates, 'personalize')) {
      item.personalize = Boolean(updates.personalize);
      if (!item.personalize) {
        item.customName = '';
        item.customNumber = '';
      }
    }
    if (item.personalize && Object.prototype.hasOwnProperty.call(updates, 'customName')) item.customName = cleanCustomName(updates.customName);
    if (item.personalize && Object.prototype.hasOwnProperty.call(updates, 'customNumber')) item.customNumber = cleanCustomNumber(updates.customNumber);
    const oldLineId = item.lineId;
    const newLineId = nextCartLineId(item);
    item.lineId = newLineId;
    const duplicate = cart.find((entry) => entry !== item && entry.lineId === newLineId);
    if (duplicate) {
      const product = productById(item.id);
      duplicate.quantity = clamp(duplicate.quantity + item.quantity, 1, product ? product.stock : duplicate.quantity + item.quantity);
      const index = cart.findIndex((entry) => entry.lineId === oldLineId || entry === item);
      if (index >= 0) cart.splice(index, 1);
    }
    saveCart(cart);
    renderCartPage();
    renderPaymentSummary();
  }

  function cartItemValidationMessage(item) {
    const product = productById(item.id);
    if (!product || product.stock <= 0) return 'This jersey is out of stock. Remove it before checkout.';
    if (item.quantity > product.stock) return 'Only ' + product.stock + ' available in stock.';
    if (!item.size) return 'Select a size before checkout.';
    if (hasMissingCustomization(item)) return 'Enter a name or number, or turn off personalization.';
    if (hasInvalidCustomizationName(item)) return 'Name must include at least one letter. Numbers are allowed, but the name cannot be numbers only.';
    if (hasInvalidCustomizationNumber(item)) return 'Number must be 99 or lower.';
    return '';
  }

  function showCartCheckoutError(message) {
    const checkout = $('#checkoutBtn');
    if (!checkout) {
      if (message) showToast(message, 'error');
      return;
    }
    let node = $('#cartCheckoutError');
    if (!node) {
      node = document.createElement('p');
      node.id = 'cartCheckoutError';
      node.className = 'cart-checkout-error';
      checkout.parentNode.insertBefore(node, checkout);
    }
    node.textContent = message || '';
    node.hidden = !message;
  }

  function validateCartForCheckout(showMessage = true) {
    const cart = getCart();
    const stockProblem = cart.find((item) => {
      const product = productById(item.id);
      return !product || product.stock <= 0 || item.quantity > product.stock;
    });
    const missingSize = cart.some((item) => !item.size);
    const missingPersonalization = cart.some(hasMissingCustomization);
    const invalidName = cart.some(hasInvalidCustomizationName);
    const invalidNumber = cart.some(hasInvalidCustomizationNumber);
    if (stockProblem || missingSize || missingPersonalization || invalidName || invalidNumber) {
      const stockProduct = stockProblem ? productById(stockProblem.id) : null;
      const message = stockProblem
        ? (stockProduct && stockProduct.stock > 0 ? 'Only ' + stockProduct.stock + ' available in stock for ' + stockProduct.team + '.' : 'Remove out-of-stock jerseys before checkout.')
        : (missingSize
          ? 'Please choose a size for every jersey before checkout.'
          : (missingPersonalization
            ? 'Enter a name or number, or turn off personalization.'
            : (invalidName
              ? 'Name must include at least one letter. Numbers are allowed, but the name cannot be numbers only.'
              : 'Personalized numbers must be 99 or lower.')));
      if (showMessage) {
        showCartCheckoutError(message);
        showToast(message, 'error');
      }
      return false;
    }
    if (showMessage) showCartCheckoutError('');
    return true;
  }

  function renderCartPage() {
    const list = $('#cartList');
    const empty = $('#cartEmpty');
    const layout = $('#cartLayout');
    if (!list || !empty || !layout) return;
    const cart = getCart();
    const summary = calculateCartTotals(cart);
    empty.hidden = cart.length > 0;
    layout.hidden = cart.length === 0;
    const clearButton = $('#clearCartBtn');
    if (clearButton) clearButton.disabled = cart.length === 0;
    if (!cart.length) {
      list.innerHTML = "";
    } else {
      list.innerHTML = cart.map((item) => {
        const product = productById(item.id);
        if (!product) return "";
        const atMax = item.quantity >= product.stock;
        const lineError = cartItemValidationMessage(item);
        const personalized = Boolean(item.personalize);
        const personalizationFields = personalized ? [
          '      <div class="cart-personalization-fields">',
          '        <label>Name<input type="text" data-cart-name data-line-id="' + escapeHTML(item.lineId) + '" maxlength="18" value="' + escapeHTML(item.customName || '') + '" placeholder="Optional"></label>',
          '        <label>Number<input type="number" data-cart-number data-line-id="' + escapeHTML(item.lineId) + '" min="0" max="99" value="' + escapeHTML(item.customNumber || '') + '" placeholder="Optional"></label>',
          '      </div>'
        ].join('') : '';
        return [
          '<article class="cart-item" data-cart-item="' + escapeHTML(item.lineId) + '">',
          '  <button type="button" class="cart-remove cart-remove-corner" data-cart-remove data-line-id="' + escapeHTML(item.lineId) + '" aria-label="Remove ' + escapeHTML(product.team) + '"><i class="fa-solid fa-xmark"></i></button>',
          '  <div class="cart-item-media"><img src="' + escapeHTML(product.image || DEFAULT_IMG) + '" alt="' + escapeHTML(product.team) + ' jersey" loading="lazy"></div>',
          '  <div class="cart-item-main">',
          '    <h3>' + escapeHTML(product.team) + '</h3>',
          '    <p class="cart-item-meta">' + escapeHTML(product.league) + ' - ' + escapeHTML(product.season) + '</p>',
          '    <p class="cart-stock-availability' + (product.stock <= 0 ? ' is-out' : item.quantity >= product.stock ? ' is-limit' : '') + '">' + escapeHTML(cartStockStatusText(product, item)) + '</p>',
          '    <div class="cart-config-form">',
          '      <div class="cart-size-field"><span>Size</span>' + sizeButtonsHTML(item.size, item.lineId) + '</div>',
          '      <label class="cart-personalize-toggle"><input type="checkbox" data-cart-personalize data-line-id="' + escapeHTML(item.lineId) + '"' + (personalized ? ' checked' : '') + '> Personalize (+$5)</label>',
          personalizationFields,
          '      <p class="cart-item-error"' + (lineError ? '' : ' hidden') + '>' + escapeHTML(lineError) + '</p>',
          '    </div>',

          '  </div>',
          '  <div class="cart-item-side">',
          '    <div class="cart-qty" aria-label="Quantity controls">',
          '      <button type="button" data-cart-dec data-line-id="' + escapeHTML(item.lineId) + '" aria-label="Decrease quantity">-</button>',
          '      <span>' + item.quantity + '</span>',
          '      <button type="button" data-cart-inc data-line-id="' + escapeHTML(item.lineId) + '" aria-label="Increase quantity"' + (atMax ? ' disabled' : '') + '>+</button>',
          '    </div>',
          '    <strong class="cart-line-total">' + money(cartLineTotal(product, item)) + '</strong>',

          '  </div>',
          '</article>'
        ].join("");
      }).join("");
    }
    const sumItems = $('#sumItems');
    const sumSubtotal = $('#sumSubtotal');
    const sumPrint = $('#sumPrint');
    const sumDelivery = $('#sumDelivery');
    const sumDiscountRow = $('#sumDiscountRow');
    const sumDiscountLabel = $('#sumDiscountLabel');
    const sumDiscount = $('#sumDiscount');
    const sumTotal = $('#sumTotal');
    const sumCouponBanner = $('#sumCouponBanner');
    const sumCouponCode = $('#sumCouponCode');
    if (sumItems) sumItems.textContent = String(summary.items);
    if (sumSubtotal) sumSubtotal.textContent = money(summary.subtotal);
    if (sumPrint) sumPrint.textContent = money(summary.customization);
    if (sumDelivery) sumDelivery.textContent = money(summary.delivery);
    if (sumDiscountRow) sumDiscountRow.hidden = summary.discount <= 0;
    if (sumDiscountLabel) sumDiscountLabel.textContent = summary.label;
    if (sumDiscount) sumDiscount.textContent = "-" + money(summary.discount);
    if (sumTotal) sumTotal.textContent = money(summary.total);
    if (sumCouponBanner) sumCouponBanner.hidden = !summary.coupon;
    if (sumCouponCode && summary.coupon) sumCouponCode.textContent = summary.coupon.code || "";
  }

  function renderCart() {
    renderCartPage();
  }

  function renderPaymentSummary() {
    const target = $('#paymentOrderSummary');
    if (target) {
      target.innerHTML = '';
      target.hidden = true;
    }
  }

  function renderWishlistPage() {
    const grid = $('#wlGrid');
    const empty = $('#wlEmpty');
    const clear = $('#wlClearBtn');
    if (!grid || !empty) return;
    const ids = getWishlist();
    const products = ids.map(productById).filter(Boolean);
    if (clear) clear.disabled = products.length === 0;
    empty.hidden = products.length > 0;
    grid.hidden = products.length === 0;
    renderProducts(products, grid, null);
    updateWishlistCount();
  }

  function initNavbar() {
    $$('.nav-links a, .footer-links a').forEach((link) => {
      const text = normalizeText(link.textContent);
      const href = normalizeText(link.getAttribute('href') || '');
      if (text.includes('admin') || href.includes('admin')) link.closest('li') ? link.closest('li').remove() : link.remove();
    });

    $$('.nav-links a').forEach((link) => {
      const href = decodeURIComponent((link.getAttribute('href') || '').split('#')[0]).toLowerCase();
      const page = currentPageFile();
      link.classList.toggle('active', href === page || (page === '' && href === 'home.html'));
      if (link.classList.contains('active')) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    const actions = $('.nav-actions');
    if (actions && !$('#wishlistBtn')) {
      const wishlistLink = document.createElement('a');
      wishlistLink.href = 'Wishlist.html';
      wishlistLink.className = 'icon-btn';
      wishlistLink.id = 'wishlistBtn';
      wishlistLink.title = 'Wishlist';
      wishlistLink.setAttribute('aria-label', 'Wishlist');
      wishlistLink.innerHTML = '<i class="fa-solid fa-heart"></i><span class="cart-badge" id="wishlistCount" data-wishlist-count>0</span>';
      const cart = $('#cartBtn', actions);
      actions.insertBefore(wishlistLink, cart || actions.firstChild);
    }

    const actions2 = $('.nav-actions');
    if (actions2 && !$('#cartBtn')) {
      const cartLink = document.createElement('a');
      cartLink.href = 'Cart.html';
      cartLink.className = 'icon-btn';
      cartLink.id = 'cartBtn';
      cartLink.title = 'Cart';
      cartLink.setAttribute('aria-label', 'Cart');
      cartLink.innerHTML = '<i class="fa-solid fa-cart-shopping"></i><span class="cart-badge" id="cartCount">0</span>';
      actions2.appendChild(cartLink);
    }

    const user = getUser();
    let authControl = $('#logoutBtn');
    if (!authControl && actions) {
      authControl = document.createElement('button');
      authControl.type = 'button';
      authControl.id = 'logoutBtn';
      actions.appendChild(authControl);
    }
    if (authControl) {
      authControl.className = user ? 'logout-btn' : 'signin-btn';
      authControl.innerHTML = user ? '<i class="fa-solid fa-right-from-bracket"></i> Logout' : '<i class="fa-solid fa-user"></i> Sign In';
      authControl.onclick = () => {
        if (getUser()) {
          setUser(null);
          initNavbar();
          showToast('Signed out.');
        } else {
          redirectWithinSite('Auth.html');
        }
      };
    }
    updateCartCount();
    updateWishlistCount();
  }

  function initHomePage() {
    const heroCount = $('#hbCount');
    if (heroCount) heroCount.textContent = String(PRODUCTS.length);
    $$('.stat-num, .astat-num').forEach((node) => {
      const target = Number(node.dataset.target || node.textContent) || 0;
      node.textContent = String(target);
    });
  }

  function closeLeagueDropdowns(except = null) {
    $$('.league-custom-select.is-open').forEach((dropdown) => {
      if (dropdown === except) return;
      dropdown.classList.remove('is-open');
      const button = $('.league-custom-toggle', dropdown);
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  }

  function closePremiumSelects(except = null) {
    $$('.premium-select.is-open').forEach((dropdown) => {
      if (dropdown === except) return;
      dropdown.classList.remove('is-open');
      const button = $('.premium-select-trigger', dropdown);
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  }

  function premiumSelectOptionHTML(select, option) {
    if (select.id === 'phoneCountry') {
      const rule = phoneCountryByCode(option.value);
      if (rule) {
        // Note: was `phoneCountryFlagHTML(rule)` which is undefined. The
        // canonical helper is `phoneFlagMarkup(rule, attr)`. Calling the
        // wrong name threw inside refresh() and silently broke the rest of
        // the premium-select wrapping pass (Governorate, etc.).
        return '<span class="premium-select-phone-option">' + phoneFlagMarkup(rule, '') + '<span>' + escapeHTML(rule.name) + '</span><strong>' + escapeHTML(rule.dial) + '</strong></span>';
      }
    }
    return '<span>' + escapeHTML(option.textContent || option.value) + '</span>';
  }

  function premiumSelectValueHTML(select, option) {
    if (select.id === 'phoneCountry') {
      const rule = phoneCountryByCode(option.value);
      if (rule) return '<span>' + escapeHTML(rule.name) + '</span>';
    }
    return premiumSelectOptionHTML(select, option);
  }

  function syncPremiumSelect(select) {
    const api = select && select._premiumSelect;
    if (api && typeof api.refresh === 'function') api.refresh();
  }

  function initPremiumSelect(select) {
    if (!select || select.dataset.premiumSelect === 'skip') return;
    if (select.classList.contains('league-native-select')) return;
    if (select._premiumSelect) {
      select._premiumSelect.refresh();
      return;
    }
    select.dataset.premiumSelect = 'true';
    select.classList.add('premium-select-native');
    select.setAttribute('aria-hidden', 'true');
    select.tabIndex = -1;

    const dropdown = document.createElement('div');
    dropdown.className = 'premium-select' + (select.id === 'phoneCountry' ? ' premium-select--phone' : '');
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'premium-select-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    const menu = document.createElement('div');
    menu.className = 'premium-select-menu';
    menu.setAttribute('role', 'listbox');
    menu.tabIndex = -1;

    const refresh = () => {
      const options = Array.from(select.options || []);
      const selected = options.find((option) => option.value === select.value) || options[select.selectedIndex] || options[0];
      trigger.disabled = select.disabled;
      trigger.innerHTML = [
        '<span class="premium-select-value">',
        selected ? premiumSelectValueHTML(select, selected) : '<span>Select</span>',
        '</span>',
        '<i class="fa-solid fa-chevron-down premium-select-chevron" aria-hidden="true"></i>'
      ].join('');
      menu.innerHTML = '';
      options.forEach((option) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'premium-select-option';
        item.dataset.value = option.value;
        item.disabled = option.disabled;
        item.setAttribute('role', 'option');
        item.setAttribute('aria-selected', option.value === select.value ? 'true' : 'false');
        item.classList.toggle('is-active', option.value === select.value);
        item.innerHTML = premiumSelectOptionHTML(select, option);
        item.addEventListener('click', (event) => {
          event.preventDefault();
          if (option.disabled) return;
          select.value = option.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
          closePremiumSelects();
          trigger.focus();
        });
        menu.appendChild(item);
      });
    };

    const openDropdown = () => {
      closePremiumSelects(dropdown);
      dropdown.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      const active = $('.premium-select-option.is-active', menu) || $('.premium-select-option:not(:disabled)', menu);
      window.setTimeout(() => { if (active) active.focus(); }, 0);
    };
    const closeDropdown = () => {
      dropdown.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    };
    const moveFocus = (direction) => {
      const items = $$('.premium-select-option:not(:disabled)', menu);
      if (!items.length) return;
      const index = Math.max(0, items.indexOf(document.activeElement));
      const next = items[clamp(index + direction, 0, items.length - 1)];
      if (next) next.focus();
    };

    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      if (dropdown.classList.contains('is-open')) closeDropdown();
      else openDropdown();
    });
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openDropdown();
      }
    });
    menu.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDropdown();
        trigger.focus();
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        moveFocus(event.key === 'ArrowDown' ? 1 : -1);
      }
    });
    select.addEventListener('change', refresh);
    dropdown.appendChild(trigger);
    dropdown.appendChild(menu);
    select.insertAdjacentElement('afterend', dropdown);
    select._premiumSelect = { refresh };
    refresh();
  }

  function initPremiumSelects(scope = document) {
    const root = scope || document;
    const selectors = [
      '#phoneCountry',
      '#lbState',
      'select.filter-select',
      'select.ek-status-select',
      '#ek2CouponType',
      '#ek2AssignUserSelect',
      'body.admin-page select.filter-select',
      'body.admin-page select.ek-status-select',
      'body.admin-page #ek2CouponType',
      'body.admin-page .admin-product-form select'
    ].join(',');
    // Defensive: a single bad select must not stop the loop and prevent the
    // rest of the page from getting its premium dropdowns.
    $$(selectors, root).forEach((s) => { try { initPremiumSelect(s); } catch (e) { /* swallow */ } });
    if (!document.body.dataset.premiumSelectBound) {
      document.body.dataset.premiumSelectBound = 'true';
      document.addEventListener('click', (event) => {
        if (!event.target.closest('.premium-select')) closePremiumSelects();
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closePremiumSelects();
      });
    }
  }

  function initLeagueSearchIcon() {
    const input = $('#teamSearch');
    if (!input || input.closest('.league-search-shell')) return;
    const shell = document.createElement('span');
    shell.className = 'league-search-shell';
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-magnifying-glass';
    icon.setAttribute('aria-hidden', 'true');
    input.parentNode.insertBefore(shell, input);
    shell.appendChild(icon);
    shell.appendChild(input);
  }

  function initLeagueCustomDropdowns() {
    const configs = [
      { id: 'leagueSortSelect', icon: 'fa-arrow-down-wide-short' },
      { id: 'leagueStockFilter', icon: 'fa-box-open' }
    ];
    configs.forEach((config) => {
      const select = $('#' + config.id);
      if (!select || select.dataset.customDropdown === 'true') return;
      select.dataset.customDropdown = 'true';
      select.classList.add('league-native-select');
      select.setAttribute('aria-hidden', 'true');
      select.tabIndex = -1;
      const label = select.closest('.league-control');
      if (label) label.classList.add('has-custom-select');
      const dropdown = document.createElement('div');
      dropdown.className = 'league-custom-select';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'league-custom-toggle';
      button.setAttribute('aria-haspopup', 'listbox');
      button.setAttribute('aria-expanded', 'false');
      const menuId = config.id + 'Menu';
      button.setAttribute('aria-controls', menuId);
      const menu = document.createElement('div');
      menu.className = 'league-custom-menu';
      menu.id = menuId;
      menu.setAttribute('role', 'listbox');
      menu.tabIndex = -1;

      const optionButtons = Array.from(select.options).map((option) => {
        const optionButton = document.createElement('button');
        optionButton.type = 'button';
        optionButton.className = 'league-custom-option';
        optionButton.dataset.value = option.value;
        optionButton.setAttribute('role', 'option');
        optionButton.innerHTML = '<span>' + escapeHTML(option.textContent) + '</span>';
        optionButton.addEventListener('click', (event) => {
          event.preventDefault();
          select.value = option.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
          closeLeagueDropdowns();
          button.focus();
        });
        menu.appendChild(optionButton);
        return optionButton;
      });

      const selectedText = () => {
        const selected = select.options[select.selectedIndex];
        return selected ? selected.textContent : '';
      };
      const updateButton = () => {
        button.innerHTML = [
          '<i class="fa-solid ' + config.icon + ' league-custom-icon" aria-hidden="true"></i>',
          '<span class="league-custom-value">' + escapeHTML(selectedText()) + '</span>',
          '<i class="fa-solid fa-chevron-down league-custom-chevron" aria-hidden="true"></i>'
        ].join('');
        optionButtons.forEach((optionButton) => {
          const selected = optionButton.dataset.value === select.value;
          optionButton.classList.toggle('is-selected', selected);
          optionButton.setAttribute('aria-selected', selected ? 'true' : 'false');
        });
      };
      const openDropdown = () => {
        closeLeagueDropdowns(dropdown);
        dropdown.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      };
      const closeDropdown = () => {
        dropdown.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
      };
      const focusOption = (direction) => {
        const current = document.activeElement;
        const index = optionButtons.indexOf(current);
        const nextIndex = index < 0 ? 0 : clamp(index + direction, 0, optionButtons.length - 1);
        const next = optionButtons[nextIndex];
        if (next) next.focus();
      };

      button.addEventListener('click', (event) => {
        event.preventDefault();
        if (dropdown.classList.contains('is-open')) closeDropdown();
        else openDropdown();
      });
      button.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openDropdown();
          const selected = optionButtons.find((optionButton) => optionButton.dataset.value === select.value) || optionButtons[0];
          if (selected) selected.focus();
        }
      });
      menu.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeDropdown();
          button.focus();
          return;
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          focusOption(event.key === 'ArrowDown' ? 1 : -1);
        }
      });
      select.addEventListener('change', updateButton);
      updateButton();
      dropdown.appendChild(button);
      dropdown.appendChild(menu);
      select.insertAdjacentElement('afterend', dropdown);
    });
    if (!document.body.dataset.leagueDropdownBound) {
      document.body.dataset.leagueDropdownBound = 'true';
      document.addEventListener('click', (event) => {
        if (!event.target.closest('.league-custom-select')) closeLeagueDropdowns();
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeLeagueDropdowns();
      });
    }
  }

  function initLeaguePages() {
    const grid = $('[data-products-grid]');
    if (!grid) return;
    initProductPreviewModal();
    initLeagueSearchIcon();
    initLeagueCustomDropdowns();
    const searchInput = $('#teamSearch');
    const sortSelect = $('#leagueSortSelect');
    const stockSelect = $('#leagueStockFilter');
    [searchInput, sortSelect, stockSelect].filter(Boolean).forEach((control) => {
      control.addEventListener('input', applyProductFilters);
      control.addEventListener('change', applyProductFilters);
    });
    applyProductFilters();
  }

  function initCartPage() {
    if (!$('#cartList')) return;
    const clear = $('#clearCartBtn');
    if (clear) {
      clear.addEventListener('click', () => {
        saveCart([]);
        renderCartPage();
      });
    }
    const checkout = $('#checkoutBtn');
    if (checkout) {
      checkout.addEventListener('click', (event) => {
        if (!isSignedIn()) {
          event.preventDefault();
          localStorage.setItem(STORAGE.redirect, 'Payment.html');
          showCartCheckoutError('Sign in to continue to secure payment.');
          showToast('Sign in to continue to secure payment.', 'error');
          markInternalNavigation();
          window.setTimeout(() => redirectWithinSite('Auth.html?mode=signin&redirect=Payment.html'), 250);
          return;
        }
        if (!validateCartForCheckout(true)) {
          event.preventDefault();
          return;
        }
        markInternalNavigation();
      });
    }
    renderCartPage();
  }

  function initWishlistPage() {
    if (!$('#wlGrid')) return;
    const clear = $('#wlClearBtn');
    if (clear) {
      clear.addEventListener('click', () => {
        saveWishlist([]);
        renderWishlistPage();
        showToast('Wishlist cleared.');
      });
    }
    renderWishlistPage();
  }

  function messageBox(node, message, type) {
    if (!node) return;
    node.textContent = message;
    node.className = 'auth-message ' + (type || 'info');
    node.hidden = false;
  }

  function showAuthView(mode) {
    const signin = $('#signinView');
    const signup = $('#signupView');
    if (!signin || !signup) return;
    const wantsSignup = mode === 'signup';
    signin.hidden = wantsSignup;
    signup.hidden = !wantsSignup;
    const url = new URL(window.location.href);
    url.searchParams.set('mode', wantsSignup ? 'signup' : 'signin');
    window.history.replaceState({}, '', url);
    if (wantsSignup) updateSignupProgress();
  }

  function togglePassword(inputId, buttonId) {
    const input = $('#' + inputId);
    const button = $('#' + buttonId);
    if (!input || !button) return;
    attachPasswordToggle(input, button);
  }

  function attachPasswordToggle(input, button) {
    if (!input || !button) return;
    if (button.dataset.pwToggleBound === '1') return;
    button.dataset.pwToggleBound = '1';
    if (button.tagName === 'BUTTON' && !button.getAttribute('type')) button.setAttribute('type', 'button');
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      button.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      button.setAttribute('title', show ? 'Hide password' : 'Show password');
      button.innerHTML = '<i class="fa-regular ' + (show ? 'fa-eye-slash' : 'fa-eye') + '"></i>';
    });
  }

  function decoratePasswordInputsWithEye(scope) {
    const root = scope || document;
    const inputs = root.querySelectorAll('input[type="password"]');
    inputs.forEach((input) => {
      if (input.dataset.pwEyeDecorated === '1') return;
      // Skip if parent already provides a toggle (Auth uses .input-wrap with .pw-toggle-btn).
      const parent = input.parentElement;
      if (parent && parent.classList.contains('input-wrap') && parent.querySelector('.pw-toggle-btn')) {
        const existingBtn = parent.querySelector('.pw-toggle-btn');
        attachPasswordToggle(input, existingBtn);
        input.dataset.pwEyeDecorated = '1';
        return;
      }
      // Wrap the input so we can absolutely-position the toggle, matching Auth's .input-wrap style.
      const wrap = document.createElement('span');
      wrap.className = 'input-wrap pw-eye-wrap';
      input.parentNode.insertBefore(wrap, input);
      wrap.appendChild(input);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pw-toggle-btn';
      btn.setAttribute('aria-label', 'Show password');
      btn.setAttribute('title', 'Show password');
      btn.innerHTML = '<i class="fa-regular fa-eye"></i>';
      wrap.appendChild(btn);
      attachPasswordToggle(input, btn);
      input.dataset.pwEyeDecorated = '1';
    });
  }

  function getSignupStepStatus() {
    const nameField = $('#name');
    const emailField = $('#signupEmail');
    const birthdateField = $('#birthdate');
    const nativeDate = $('#birthdateNative');
    const passwordField = $('#signupPassword');
    const confirmField = $('#confirm');
    const birthdateValue = String((birthdateField && birthdateField.value) || (nativeDate && nativeDate.value) || '').trim();
    const password = String((passwordField && passwordField.value) || '');
    const confirm = String((confirmField && confirmField.value) || '');
    const accountComplete = (!nameField || isValidName(nameField.value)) && (!emailField || isValidEmail(emailField.value));
    const detailsComplete = (!birthdateField && !nativeDate) || !birthdateValidationMessage(birthdateValue);
    const securityComplete = (!passwordField || !passwordValidationMessage(password)) && (!confirmField || (Boolean(confirm) && password === confirm));
    const complete = [false, false, false, false];
    let activeIndex = 0;
    if (accountComplete) {
      complete[0] = true;
      activeIndex = 1;
    }
    if (accountComplete && detailsComplete) {
      complete[1] = true;
      activeIndex = 2;
    }
    if (accountComplete && detailsComplete && securityComplete) {
      complete[2] = true;
      complete[3] = true;
      activeIndex = 3;
    }
    return {
      activeIndex,
      complete,
      progress: complete.filter(Boolean).length
    };
  }

  function updateSignupProgress(forceComplete = false) {
    const progress = $('#signupProgress');
    if (!progress) return;
    const steps = $$('[data-signup-step]', progress);
    if (!steps.length) return;
    const status = forceComplete ? { activeIndex: steps.length - 1, complete: steps.map(() => true), progress: steps.length } : getSignupStepStatus();
    progress.dataset.progress = String(status.progress);
    progress.setAttribute('aria-valuenow', String(status.progress));
    steps.forEach((step, index) => {
      const complete = Boolean(status.complete[index]);
      const active = index === status.activeIndex && (!complete || index === steps.length - 1);
      step.classList.toggle('is-complete', complete);
      step.classList.toggle('is-active', active);
      if (active) step.setAttribute('aria-current', 'step');
      else step.removeAttribute('aria-current');
    });
  }

  function initSignupProgress() {
    const progress = $('#signupProgress');
    if (!progress) return;
    ['name', 'signupEmail', 'birthdate', 'birthdateNative', 'signupPassword', 'confirm'].forEach((id) => {
      const field = $('#' + id);
      if (!field) return;
      field.addEventListener('input', () => updateSignupProgress());
      field.addEventListener('change', () => updateSignupProgress());
    });
    updateSignupProgress();
  }

  function initAuthPage() {
    if (!$('#signinView') || !$('#signupView')) return;
    const params = new URLSearchParams(window.location.search);
    const redirectParam = String(params.get('redirect') || '').trim();
    if (/^Payment\.html$/i.test(redirectParam)) localStorage.setItem(STORAGE.redirect, 'Payment.html');
    else clearLoginRedirect();
    showAuthView(params.get('mode') === 'signup' ? 'signup' : 'signin');
    const emailPrefill = canonicalEmail(params.get('email') || '');
    if (emailPrefill && $('#email')) $('#email').value = emailPrefill;
    const switchToSignup = $('#switchToSignup');
    const switchToSignin = $('#switchToSignin');
    if (switchToSignup) switchToSignup.addEventListener('click', () => showAuthView('signup'));
    if (switchToSignin) switchToSignin.addEventListener('click', () => showAuthView('signin'));
    togglePassword('password', 'toggleSigninPassword');
    togglePassword('signupPassword', 'toggleSignupPassword');
    togglePassword('confirm', 'toggleSignupConfirm');

    const nativeDate = $('#birthdateNative');
    const displayDate = $('#birthdate');
    const dateButton = $('#birthDatePickerBtn');
    if (nativeDate && displayDate) {
      nativeDate.addEventListener('change', () => {
        if (!nativeDate.value) return;
        const parts = nativeDate.value.split('-');
        displayDate.value = parts[2] + '/' + parts[1] + '/' + parts[0];
      });
    }
    if (dateButton && nativeDate) dateButton.addEventListener('click', () => nativeDate.showPicker ? nativeDate.showPicker() : nativeDate.focus());
    initSignupProgress();

    const signinForm = $('#signinForm');
    if (signinForm) {
      // Live per-field validation: blur shows the inline message under the
      // field; the user does not have to guess what is wrong.
      attachLiveFieldValidation($('#email'), emailErrorMessage);
      attachLiveFieldValidation($('#password'), (v) => v ? '' : 'Enter your password.');
      signinForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = String(($('#email') || {}).value || '').trim();
        const password = String(($('#password') || {}).value || '');
        const box = $('#messageBox');
        const emailField = $('#email');
        const passwordField = $('#password');
        const emailErr = emailErrorMessage(email);
        const passwordErr = !password ? 'Enter your password.' : '';
        setInlineFieldError(emailField, emailErr);
        setInlineFieldError(passwordField, passwordErr);
        if (emailErr) {
          messageBox(box, emailErr, 'error');
          return;
        }
        if (passwordErr) {
          messageBox(box, passwordErr, 'error');
          return;
        }
        const normalizedEmail = canonicalEmail(email);
        const res = await BackendBridge.apiFetch('/auth/login', {
          method: 'POST',
          body: { email: normalizedEmail, password: password }
        });
        if (!res || !res.ok) {
          const msg = (res && res.error && res.error.message) || 'Email or password is incorrect.';
          messageBox(box, msg, 'error');
          return;
        }
        const u = BackendBridge.backendUserToLocal(res.data && res.data.user);
        if (BackendBridge.clearCsrfToken) BackendBridge.clearCsrfToken();
        BackendBridge.setMem(STORAGE.user, u);
        BackendBridge.setMem(STORAGE.session, {
          id: u.id,
          email: u.email,
          name: u.name,
          role: u.role,
          createdAt: u.createdAt || new Date().toISOString(),
          lastLoginAt: u.lastLoginAt || "",
          birthdate: u.birthdate || "",
          phone: u.phone || "",
          signedInAt: new Date().toISOString()
        });
        const isAdmin = u.role === 'admin';
        // Merge guest cart/wishlist into the user account BEFORE re-hydrating
        // local caches. Admins never have a guest cart to merge.
        if (!isAdmin) {
          try { await BackendBridge.apiFetch('/auth/merge-guest', { method: 'POST' }); } catch (e) {}
        }
        // Re-hydrate cart/wishlist/orders for the now-signed-in user
        try {
          const cart = await BackendBridge.apiFetch('/cart');
          BackendBridge.setMem(STORAGE.cart, (cart && cart.ok) ? BackendBridge.backendCartToLocal(cart.data && cart.data.items) : []);
          const wl = await BackendBridge.apiFetch('/wishlist');
          BackendBridge.setMem(STORAGE.wishlist, (wl && wl.ok) ? BackendBridge.backendWishlistToLocal(wl.data && wl.data.items) : []);
          const od = await BackendBridge.apiFetch('/orders');
          BackendBridge.setMem(STORAGE.orders, (od && od.ok) ? BackendBridge.backendOrdersToLocal(od.data && od.data.orders) : []);
        } catch (e) {}
        if (isAdmin) {
          clearLoginRedirect();
          messageBox(box, 'Admin signed in. Redirecting to dashboard...', 'success');
          initNavbar();
          updateCartCount(); updateWishlistCount();
          markInternalNavigation();
          window.setTimeout(() => redirectWithinSite('Admin.html'), 450);
          return;
        }
        const redirectTarget = getSafeLoginRedirect();
        if (redirectTarget) clearLoginRedirect();
        messageBox(box, redirectTarget ? 'Signed in. Redirecting to secure payment...' : 'Signed in. Redirecting to the shop...', 'success');
        initNavbar();
        updateCartCount(); updateWishlistCount();
        markInternalNavigation();
        window.setTimeout(() => redirectWithinSite(redirectTarget || 'Home.html'), 450);
      });
    }

    const signupForm = $('#signupForm');
    if (signupForm) {
      // Live per-field validation. Each inline error is reused on submit so
      // every blocking issue is visible at once instead of one-at-a-time.
      const nameSignupField = $('#name');
      const emailSignupField = $('#signupEmail');
      const birthdateSignupField = $('#birthdate');
      const passwordSignupField = $('#signupPassword');
      const confirmSignupField = $('#confirm');
      attachLiveFieldValidation(nameSignupField, nameErrorMessage);
      attachLiveFieldValidation(emailSignupField, emailErrorMessage);
      attachLiveFieldValidation(birthdateSignupField, (v) => birthdateValidationMessage(v));
      attachLiveFieldValidation(passwordSignupField, (v) => passwordValidationMessage(v));
      attachLiveFieldValidation(confirmSignupField, (v) => confirmPasswordErrorMessage(v, (passwordSignupField || {}).value || ''));
      // Password and confirm need to stay in sync: changing the password
      // re-validates the confirm field if it was already shown invalid.
      if (passwordSignupField && confirmSignupField) {
        passwordSignupField.addEventListener('input', () => {
          if (confirmSignupField.classList.contains('is-invalid')) {
            setInlineFieldError(confirmSignupField, confirmPasswordErrorMessage(confirmSignupField.value, passwordSignupField.value));
          }
        });
      }
      signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = String(($('#name') || {}).value || '').trim();
        const email = canonicalEmail(($('#signupEmail') || {}).value || '');
        const birthdateValue = String((displayDate || {}).value || (nativeDate || {}).value || '').trim();
        const password = ($('#signupPassword') || {}).value || '';
        const confirm = ($('#confirm') || {}).value || '';
        const box = $('#signupMessageBox');
        const nameErr = nameErrorMessage(name);
        const emailErr = emailErrorMessage(email);
        const birthdateError = birthdateValidationMessage(birthdateValue);
        const passwordError = passwordValidationMessage(password);
        const confirmError = confirmPasswordErrorMessage(confirm, password);
        setInlineFieldError(nameSignupField, nameErr);
        setInlineFieldError(emailSignupField, emailErr);
        setInlineFieldError(birthdateSignupField, birthdateError);
        setInlineFieldError(passwordSignupField, passwordError);
        setInlineFieldError(confirmSignupField, confirmError);
        const firstError = nameErr || emailErr || birthdateError || passwordError || confirmError;
        if (firstError) {
          messageBox(box, firstError, 'error');
          return;
        }
        const res = await BackendBridge.apiFetch('/auth/signup', {
          method: 'POST',
          body: { name, email, password, birthdate: birthdateValue }
        });
        if (!res || !res.ok) {
          const msg = (res && res.error && res.error.message) || 'Sign-up failed. Please try again.';
          messageBox(box, msg, 'error');
          return;
        }
        messageBox(box, 'Account created. Sign in with your new account.', 'success');
        updateSignupProgress(true);
        window.setTimeout(() => {
          const signinEmail = $('#email');
          const signinPassword = $('#password');
          if (signinEmail) signinEmail.value = email;
          if (signinPassword) signinPassword.value = '';
          showAuthView('signin');
          const signInBox = $('#messageBox');
          messageBox(signInBox, 'Account created. Enter your password to sign in.', 'success');
        }, 350);
      });
    }
  }

  function initCareersPage() {
    const grid = $('#jobsGrid');
    if (!grid) return;
    const jobs = [
      { title: 'Storefront Operations Specialist', type: 'Full-time', location: 'Tripoli, Lebanon', desc: 'Coordinate product listings, stock reviews, and customer order flow.' },
      { title: 'Customer Support Associate', type: 'Part-time', location: 'Remote', desc: 'Help fans with sizing, order updates, returns, and product questions.' },
      { title: 'Front-End UI Contractor', type: 'Contract', location: 'Hybrid', desc: 'Polish product pages, accessibility, and responsive storefront behavior.' }
    ];
    function render(filter) {
      const visible = filter === 'all' ? jobs : jobs.filter((job) => job.type === filter);
      grid.innerHTML = visible.map((job) => {
        const url = 'Contact Us.html?job=' + encodeURIComponent(job.title);
        return '<article class="job-card"><span>' + escapeHTML(job.type) + '</span><h3>' + escapeHTML(job.title) + '</h3><p>' + escapeHTML(job.desc) + '</p><small>' + escapeHTML(job.location) + '</small><a class="job-apply" href="' + url + '"><i class="fa-solid fa-paper-plane"></i> Apply</a></article>';
      }).join('');
    }
    $$('.filter-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        $$('.filter-tab').forEach((item) => item.classList.remove('active'));
        tab.classList.add('active');
        render(tab.dataset.filter || 'all');
      });
    });
    render('all');
  }

  function initContactPage() {
    const form = $('#contactForm');
    if (!form) return;
    const result = $('#formResult') || $('#contactResult') || $('#contactMsg');
    const resultText = $('#contactMsgText');
    const params = new URLSearchParams(window.location.search);
    const selectedJob = (params.get('job') || params.get('role') || '').trim();
    const applyBanner = $('#applyBanner');
    const applyName = $('#applyRoleName');
    const cvField = $('#cvField');
    const subject = $('#cf-subject');
    const submitLabel = $('#submitLabel');
    const errorSummary = $('#formErrorSummary');
    if (result) result.hidden = true;
    prefillIdentityFields('#cf-name', '#cf-email');
    if (applyBanner) applyBanner.hidden = !selectedJob;
    if (applyName) applyName.textContent = selectedJob || 'General Inquiry';
    if (cvField) cvField.hidden = !selectedJob;
    if (selectedJob && submitLabel) submitLabel.textContent = 'Submit Application';
    if (selectedJob && subject) {
      let option = Array.from(subject.options).find((item) => item.value === 'Job application');
      if (!option) {
        option = document.createElement('option');
        option.value = 'Job application';
        option.textContent = 'Job application';
        subject.appendChild(option);
      }
      subject.value = 'Job application';
    }
    $$('.field-error, #formErrorSummary, #cvError').forEach((node) => { node.hidden = true; });
    const setFieldError = (id, show) => {
      const node = $('#err-' + id);
      if (node) node.hidden = !show;
    };
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = String(($('#cf-name') || {}).value || '').trim();
      const email = canonicalEmail(($('#cf-email') || {}).value || '');
      const subjectValue = String(($('#cf-subject') || {}).value || '').trim();
      const messageValue = String(($('#cf-message') || {}).value || '').trim();
      const nameField = $('#cf-name');
      const emailField = $('#cf-email');
      const subjectField = $('#cf-subject');
      const messageField = $('#cf-message');
      const validName = isValidName(name);
      const validEmail = isValidEmail(email);
      setFieldError('name', !validName);
      setFieldError('email', !validEmail);
      setFieldError('subject', !subjectValue);
      setFieldError('message', !messageValue);
      setFieldInvalid(nameField, !validName);
      setFieldInvalid(emailField, !validEmail);
      setFieldInvalid(subjectField, !subjectValue);
      setFieldInvalid(messageField, !messageValue);
      const valid = Boolean(validName && validEmail && subjectValue && messageValue);
      if (errorSummary) {
        errorSummary.textContent = valid ? '' : 'Please complete the highlighted fields before sending.';
        errorSummary.hidden = valid;
      }
      if (!valid) return;
      // Read optional CV upload (base64) from the file input the ek2 layer wires up
      const cvInput = $('#cvUpload') || $('#cvInput') || $('#cf-cv');
      let cv_blob = '';
      let cv_filename = '';
      let cv_mime = '';
      if (cvInput && cvInput.files && cvInput.files[0]) {
        try {
          const file = cvInput.files[0];
          cv_filename = file.name || '';
          cv_mime = file.type || '';
          cv_blob = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result || ''));
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
          });
        } catch (e) { cv_blob = ''; }
      }
      const payload = {
        type: selectedJob ? 'application' : 'contact',
        name,
        email,
        subject: selectedJob || subjectValue,
        message: messageValue,
        role: selectedJob || '',
        cv_blob: cv_blob || undefined,
        cv_filename: cv_filename || undefined,
        cv_mime: cv_mime || undefined
      };
      const res = await BackendBridge.apiFetch('/messages', { method: 'POST', body: payload });
      if (!res || !res.ok) {
        const msg = (res && res.error && res.error.message) || 'Could not send your message. Please try again.';
        if (errorSummary) { errorSummary.textContent = msg; errorSummary.hidden = false; }
        return;
      }
      if (result) {
        const message = selectedJob ? 'Application received. We will review it and contact you within 24-48 hours.' : 'Thanks. Your message has been sent to the Elite Kits team.';
        if (resultText) resultText.textContent = message;
        else result.textContent = message;
        result.className = 'form-result success';
        result.hidden = false;
      }
      form.reset();
      // Also clear the custom CV upload chip (filename + × button).
      // form.reset() clears the file input's value but does not fire a change
      // event, so the chip stays visible. Dispatching change re-runs the
      // upload handler which calls showFile(null) and hides the chip.
      const cvInputAfterReset = $('#cvUpload') || $('#cvInput') || $('#cf-cv');
      if (cvInputAfterReset) {
        cvInputAfterReset.value = '';
        cvInputAfterReset.dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (selectedJob && subject) subject.value = 'Job application';
    });
  }

  function initSizeGuidePage() {
    const tabs = $$('.size-tab');
    if (!tabs.length) return;
    const showPanel = (target) => {
      const panelId = target ? (target.startsWith('table-') ? target : 'table-' + target) : '';
      $$('.size-table-wrap, .size-panel').forEach((panel) => {
        panel.hidden = Boolean(panelId) && panel.id !== panelId;
      });
    };
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.target || tab.dataset.sizeTab || tab.dataset.table;
        tabs.forEach((item) => item.classList.remove('active'));
        tab.classList.add('active');
        showPanel(target);
      });
    });
    const active = tabs.find((tab) => tab.classList.contains('active')) || tabs[0];
    showPanel(active ? (active.dataset.target || active.dataset.sizeTab || active.dataset.table) : '');
    const finder = $('#findSizeBtn');
    if (finder) {
      finder.addEventListener('click', () => {
        const chest = Number(($('#chestInput') || {}).value || 0);
        const fit = (($('#fitSelect') || {}).value || 'regular').toLowerCase();
        let recommended = '';
        if (chest) {
          if (chest <= 84) recommended = 'XS';
          else if (chest <= 91) recommended = 'S';
          else if (chest <= 99) recommended = 'M';
          else if (chest <= 107) recommended = 'L';
          else if (chest <= 116) recommended = 'XL';
          else recommended = 'XXL';
          if (fit === 'relaxed' && recommended !== 'XXL') recommended = SIZES[Math.min(SIZES.indexOf(recommended) + 1, SIZES.length - 1)];
          if (fit === 'slim' && recommended !== 'XS') recommended = SIZES[Math.max(SIZES.indexOf(recommended) - 1, 0)];
        }
        const result = $('#finderResult');
        const size = $('#recSize');
        const note = $('#recNote');
        if (result) result.classList.add('is-visible');
        if (size) size.textContent = recommended || 'M';
        if (note) note.textContent = chest ? 'Recommended from your chest measurement and fit preference.' : 'Enter your chest measurement for a more accurate recommendation.';
      });
    }
  }

  // Populate the country <select>, sync flag + dial-code display, autofill
  // from the user's profile or default saved address, and wire live validation
  // feedback. Idempotent — safe to call multiple times.
  function initPaymentPhoneControls() {
    const select = document.getElementById('phoneCountry');
    if (!select) return;
    const flagSpan = document.querySelector('[data-phone-flag]');
    const dialSpan = document.querySelector('[data-phone-dial]');
    const phoneInput = document.getElementById('phoneNumber');
    const errorNode = document.getElementById('phoneError');

    if (!select.options.length) {
      const sorted = PHONE_COUNTRIES.slice().sort((a, b) => a.name.localeCompare(b.name));
      sorted.forEach((c) => {
        const opt = document.createElement('option');
        opt.value = c.code;
        opt.textContent = phoneCountryOptionLabel(c);
        opt.title = c.name + ' ' + c.dial;
        opt.setAttribute('aria-label', c.name + ' ' + c.dial);
        opt.dataset.dial = c.dial;
        opt.dataset.iso = c.code;
        select.appendChild(opt);
      });
      // Browsers auto-select the first <option> after we append them.
      // Force the project default (Lebanon) before autofill can override it.
      select.value = DEFAULT_PHONE_COUNTRY;
    }

    function syncCountryUI() {
      const rule = phoneCountryByCode(select.value);
      if (!rule) return;
      syncPhoneFlag(flagSpan, rule);
      if (dialSpan) dialSpan.textContent = rule.dial;
      select.title = rule.name + ' ' + rule.dial;
      select.setAttribute('aria-label', 'Phone country: ' + rule.name + ' ' + rule.dial);
      if (phoneInput) {
        const maxLen = Math.max.apply(null, rule.lengths);
        phoneInput.setAttribute('inputmode', 'tel');
        phoneInput.setAttribute('maxlength', String(maxLen + 6));
        phoneInput.setAttribute('placeholder', samplePhonePlaceholder(rule));
      }
    }
    function setPhoneError(message) {
      if (!errorNode) return;
      errorNode.textContent = message || '';
      errorNode.hidden = !message;
      if (phoneInput) setFieldInvalid(phoneInput, Boolean(message));
    }
    function liveValidate() {
      if (!phoneInput) return;
      const raw = phoneInput.value;
      if (!raw.trim()) { setPhoneError(''); return; }
      const res = validatePhoneInput(select.value, raw);
      setPhoneError(res.ok ? '' : res.message);
    }

    syncCountryUI();
    // Track when the user manually changes the country so the async autofill
    // below cannot silently overwrite their selection (previously the autofill
    // resolved AFTER the user had clicked an option, making it feel like the
    // country selector did not work).
    select.dataset.userTouched = '';
    select.addEventListener('change', () => {
      select.dataset.userTouched = '1';
      syncCountryUI();
      liveValidate();
    });
    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        // Keep digits + space/dash visible but strip other characters early.
        phoneInput.value = phoneInput.value.replace(/[^\d\s().\-+]/g, '');
        liveValidate();
      });
      phoneInput.addEventListener('blur', liveValidate);
    }

    // Autofill from the currently signed-in user's saved phone, then from the
    // default saved address. Order matches the rest of Payment autofill.
    initPremiumSelects(select.closest('[data-phone-row]') || document);
    autofillPaymentPhone(select, phoneInput).then(() => {
      syncCountryUI();
      syncPremiumSelect(select);
    });
  }

  function samplePhonePlaceholder(rule) {
    if (!rule) return '';
    // Generate a length-correct sample like "70 123 456" without claiming a real number.
    const minLen = Math.min.apply(null, rule.lengths);
    const digits = '70123456789'.slice(0, minLen);
    return digits.replace(/(\d{2,3})(?=\d)/g, '$1 ').trim();
  }

  async function autofillPaymentPhone(selectEl, phoneInput) {
    if (!selectEl || !phoneInput) return;
    if (String(phoneInput.value || '').trim()) return;
    // If the user already clicked a country before profile/address fetch
    // resolved, do not overwrite their choice. This was the root cause of
    // "country selector cannot be selected" - autofill was racing user input.
    if (selectEl.dataset && selectEl.dataset.userTouched === '1') return;
    let countryCode = '';
    let national = '';
    try {
      const profile = await BackendBridge.apiFetch('/account/profile');
      const u = profile && profile.ok && profile.data && profile.data.user;
      if (u && u.phone_country_code && u.phone_national) {
        countryCode = u.phone_country_code;
        national = u.phone_national;
      } else if (u && u.phone_e164) {
        const guess = guessCountryFromE164(u.phone_e164);
        if (guess) { countryCode = guess.code; national = guess.national; }
      }
    } catch (e) {}
    if (!countryCode || !national) {
      try {
        const addr = await BackendBridge.apiFetch('/addresses/default');
        const a = addr && addr.ok && addr.data && addr.data.address;
        if (a && a.phone_country_code && a.phone_national) {
          countryCode = a.phone_country_code;
          national = a.phone_national;
        } else if (a && a.phone_e164) {
          const guess = guessCountryFromE164(a.phone_e164);
          if (guess) { countryCode = guess.code; national = guess.national; }
        }
      } catch (e) {}
    }
    // Final guard before write - user may have selected during the await above.
    if (selectEl.dataset && selectEl.dataset.userTouched === '1') return;
    if (countryCode && phoneCountryByCode(countryCode)) selectEl.value = countryCode;
    if (national) phoneInput.value = national;
  }

  function guessCountryFromE164(e164) {
    const s = String(e164 || '').trim();
    if (!s || s[0] !== '+') return null;
    // Try longest-prefix match against known dial codes.
    const candidates = PHONE_COUNTRIES.slice().sort((a, b) => b.dial.length - a.dial.length);
    for (const c of candidates) {
      if (s.startsWith(c.dial)) {
        return { code: c.code, national: s.slice(c.dial.length).replace(/\D/g, '') };
      }
    }
    return null;
  }

  async function revalidatePaymentCoupon(banner) {
    const cached = readJSON(STORAGE.coupon, null);
    const code = cached && (cached.code || cached.couponCode || '');
    if (!code) {
      // Defensive: nothing to validate. Make absolutely sure no stale label is shown.
      if (banner) banner.hidden = true;
      return;
    }
    // Ask the backend to re-validate the coupon for this signed-in user.
    // If the coupon is missing, soft-deleted, expired, assigned to someone
    // else, or already used, the backend returns ok:false and we MUST clear
    // the cached value and keep the banner hidden.
    let res = null;
    try {
      res = await BackendBridge.apiFetch('/coupons/apply', {
        method: 'POST',
        body: { code: String(code).toUpperCase() }
      });
    } catch (e) { res = null; }
    if (!res || !res.ok || !res.data) {
      BackendBridge.setMem(STORAGE.coupon, null);
      try { sessionStorage.removeItem('elitekits_applied_coupon_v1'); } catch (e) {}
      if (banner) banner.hidden = true;
      return;
    }
    // Backend confirmed - refresh the cache with the authoritative coupon
    // record and reveal the banner.
    const verified = {
      code: res.data.code || code,
      type: res.data.type || cached.type || '',
      value: res.data.value != null ? res.data.value : cached.value,
      description: cached.description || '',
      expiresAt: res.data.expires_at || cached.expiresAt || null,
      createdAt: cached.createdAt || ''
    };
    BackendBridge.setMem(STORAGE.coupon, verified);
    try { sessionStorage.setItem('elitekits_applied_coupon_v1', JSON.stringify(verified)); } catch (e) {}
    const codeEl = $('#payCouponCode');
    const descEl = $('#payCouponDesc');
    if (codeEl) codeEl.textContent = verified.code;
    if (descEl) descEl.textContent = verified.description || '';
    if (banner) banner.hidden = false;
  }

  function initPaymentPage() {
    const form = $('.payment-form');
    if (!form) return;
    if (!isSignedIn()) {
      localStorage.setItem(STORAGE.redirect, 'Payment.html');
      markInternalNavigation();
      redirectWithinSite('Auth.html?mode=signin&redirect=Payment.html');
      return;
    }
    prefillIdentityFields('#name', '#email');
    initPaymentPhoneControls();
    // Promote the Governorate selector (and any other premium-eligible select
    // in the payment form) to the same custom dropdown system used for the
    // phone country control. This must run AFTER the form exists.
    initPremiumSelects(form);
    renderPaymentSummary();

    // Input formatters / length caps -------------------------------------
    // Card number: max 16 digits, displayed grouped as "1234 5678 9012 3456"
    const cardField = $('#card');
    if (cardField) {
      cardField.setAttribute('maxlength', '19');  // 16 digits + 3 spaces
      cardField.setAttribute('autocomplete', 'cc-number');
      cardField.setAttribute('inputmode', 'numeric');
      cardField.addEventListener('input', () => {
        const digits = cardField.value.replace(/\D/g, '').slice(0, 16);
        const grouped = digits.match(/.{1,4}/g);
        cardField.value = grouped ? grouped.join(' ') : '';
      });
    }
    // Expiry: MM/YY auto-format, max 5 chars
    const expField = $('#expiry');
    if (expField) {
      expField.setAttribute('maxlength', '5');
      expField.setAttribute('inputmode', 'numeric');
      expField.addEventListener('input', () => {
        let d = expField.value.replace(/\D/g, '').slice(0, 4);
        if (d.length >= 3) d = d.slice(0, 2) + '/' + d.slice(2);
        expField.value = d;
      });
    }
    // CVV: exactly 3 digits (Lebanon-only project)
    const cvvField = $('#cvv');
    if (cvvField) {
      cvvField.setAttribute('maxlength', '3');
      cvvField.setAttribute('inputmode', 'numeric');
      cvvField.addEventListener('input', () => {
        cvvField.value = cvvField.value.replace(/\D/g, '').slice(0, 3);
      });
    }
    // --------------------------------------------------------------------
    // Live validation: blur shows the per-field error message; subsequent
    // typing refines it. We attach AFTER the input formatters above so the
    // formatted value is what gets validated.
    attachLiveFieldValidation($('#name', form), nameErrorMessage);
    attachLiveFieldValidation($('#email', form), emailErrorMessage);
    attachLiveFieldValidation(cardField, cardErrorMessage);
    attachLiveFieldValidation(expField, expiryErrorMessage);
    attachLiveFieldValidation(cvvField, cvvErrorMessage);
    attachLiveFieldValidation($('#city', form), cityErrorMessage);
    attachLiveFieldValidation($('#road', form), roadErrorMessage);
    const govField = $('#lbState', form);
    if (govField && !govField.dataset.liveValidationBound) {
      govField.dataset.liveValidationBound = '1';
      govField.addEventListener('change', () => {
        const v = String(govField.value || '').trim();
        setInlineFieldError(govField, v ? '' : 'Choose a governorate.');
      });
    }
    const phoneNumberLive = $('#phoneNumber', form);
    const phoneCountryLive = $('#phoneCountry', form);
    if (phoneNumberLive && !phoneNumberLive.dataset.liveValidationBound) {
      phoneNumberLive.dataset.liveValidationBound = '1';
      const validatePhone = () => {
        const r = validatePhoneInput(phoneCountryLive && phoneCountryLive.value, phoneNumberLive.value);
        setInlineFieldError(phoneNumberLive, r.ok ? '' : (r.message || 'Enter a valid phone number for the selected country.'));
      };
      phoneNumberLive.addEventListener('blur', validatePhone);
      phoneNumberLive.addEventListener('input', () => {
        if (phoneNumberLive.classList.contains('is-invalid')) validatePhone();
      });
      if (phoneCountryLive) phoneCountryLive.addEventListener('change', () => {
        if (phoneNumberLive.classList.contains('is-invalid')) validatePhone();
      });
    }

    const banner = $('#paymentCouponBanner');
    const rating = $('#ratingPanel');
    const success = $('#paymentSuccess');
    const ratingNote = $('#ratingNote');
    // Force banner + rating + success states hidden on page load. The banner is
    // only revealed after backend re-verifies the stored coupon. The rating is
    // only revealed after a successful checkout response.
    if (banner) banner.hidden = true;
    if (rating) rating.hidden = true;
    if (success) success.hidden = true;
    if (ratingNote) {
      ratingNote.textContent = '';
      ratingNote.hidden = true;
    }
    // Re-validate the cached coupon against the backend. Stale MEM /
    // sessionStorage values must never be treated as truth - the backend is
    // the only source that knows if the coupon still exists, is active, is
    // unexpired, and is owned by the signed-in user.
    revalidatePaymentCoupon(banner);
    let lastPaidOrder = null;
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!validatePaymentForm(form)) return;
      const cart = getCart();
      if (!cart.length) {
        showToast('Your cart is empty.', 'error');
        return;
      }
      if (!validateCartForCheckout(true)) {
        return;
      }
      const address = {
        governorate: String(($('#lbState') || {}).value || '').trim(),
        city: String(($('#city') || {}).value || '').trim(),
        road: String(($('#road') || {}).value || '').trim()
      };
      const cardNumber = String(($('#card') || {}).value || '').replace(/\D/g, '').trim();
      const cardName = String(($('#name') || {}).value || '').trim();
      const expiry = String(($('#expiry') || {}).value || '').trim();
      const cvv = String(($('#cvv') || {}).value || '').trim();
      const couponApplied = readJSON(STORAGE.coupon, null);
      const phoneCountryField = $('#phoneCountry');
      const phoneNumberField = $('#phoneNumber');
      const phoneResult = validatePhoneInput(
        phoneCountryField && phoneCountryField.value,
        phoneNumberField && phoneNumberField.value
      );
      // validatePaymentForm already enforced this, but keep a defensive guard
      // so a tampered DOM cannot send an unvalidated payload.
      if (!phoneResult.ok) {
        showToast(phoneResult.message, 'error');
        return;
      }
      const res = await BackendBridge.apiFetch('/orders/checkout', {
        method: 'POST',
        body: {
          customer_name: String(($('#name') || {}).value || '').trim(),
          email: canonicalEmail(($('#email') || {}).value || ''),
          state: address.governorate,
          city: address.city,
          road: address.road,
          card_number: cardNumber,
          card_holder: cardName,
          expiry: expiry,
          cvv: cvv,
          coupon_country_code: phoneResult.countryCode,
          phone_country_code: phoneResult.countryCode,
          phone_country: phoneResult.country,
          phone_dial_code: phoneResult.dialCode,
          phone_national: phoneResult.national,
          phone_e164: phoneResult.e164,
          coupon_code: couponApplied ? couponApplied.code : '',
          delivery_fee: DELIVERY_FEE,
          customization_fee: CUSTOMIZATION_FEE
        }
      });
      if (!res || !res.ok) {
        const msg = (res && res.error && res.error.message) || 'Payment could not be processed.';
        showToast(msg, 'error');
        return;
      }
      const serverOrder = res.data && res.data.order;
      const order = serverOrder ? BackendBridge.backendOrdersToLocal([serverOrder])[0] : null;
      // Refresh local caches from server state
      try {
        const cartRes = await BackendBridge.apiFetch('/cart');
        BackendBridge.setMem(STORAGE.cart, (cartRes && cartRes.ok) ? BackendBridge.backendCartToLocal(cartRes.data && cartRes.data.items) : []);
        const od = await BackendBridge.apiFetch('/orders');
        BackendBridge.setMem(STORAGE.orders, (od && od.ok) ? BackendBridge.backendOrdersToLocal(od.data && od.data.orders) : []);
        const prods = await BackendBridge.apiFetch('/products');
        if (prods && prods.ok && prods.data) {
          BackendBridge.setMem(STORAGE.stock, BackendBridge.backendProductsToStockMap ? BackendBridge.backendProductsToStockMap(prods.data.products) : {});
          BackendBridge._serverProducts = prods.data.products || [];
          applyBackendProductDetails(BackendBridge._serverProducts || []);
          applyStockOverrides();
        }
      } catch (e) {}
      // Clear applied coupon from both MEM and sessionStorage (a coupon is
      // single-use per order — after a successful checkout, don't auto-apply
      // it again on the next order).
      BackendBridge.setMem(STORAGE.coupon, null);
      try { sessionStorage.removeItem("elitekits_applied_coupon_v1"); } catch (e) {}
      lastPaidOrder = order;
      renderPaymentSummary();
      updateCartCount();
      if (success) {
        success.innerHTML = '<i class="fa-solid fa-circle-check"></i><span>Payment confirmed. Your order ID is ' + escapeHTML(order ? order.id : '') + '.</span>';
        success.hidden = false;
      }
      if (rating) rating.hidden = false;
      showToast('Payment confirmed.');
    });
    const stars = $$('.star');
    let selectedRating = 0;
    stars.forEach((star) => {
      star.addEventListener('click', () => {
        selectedRating = Number(star.dataset.star) || 0;
        stars.forEach((item) => item.classList.toggle('is-selected', Number(item.dataset.star) <= selectedRating));
      });
    });
    const submitRating = $('#submitRating');
    if (submitRating) {
      submitRating.addEventListener('click', async () => {
        // Rating must be tied to the order we just paid for. If lastPaidOrder
        // is empty the rating panel should not be visible at all - block here
        // as a defense in depth (and show the user an explicit error).
        if (!lastPaidOrder || !lastPaidOrder.id) {
          showToast('No order to rate yet. Please complete checkout first.', 'error');
          return;
        }
        const rv = selectedRating || 5;
        submitRating.disabled = true;
        const rateRes = await BackendBridge.apiFetch('/orders/' + encodeURIComponent(lastPaidOrder.id) + '/rating', {
          method: 'POST',
          body: { rating: rv }
        });
        if (!rateRes || !rateRes.ok) {
          submitRating.disabled = false;
          showToast((rateRes && rateRes.error && rateRes.error.message) || 'Could not save rating.', 'error');
          return;
        }
        try {
          const rs = await BackendBridge.apiFetch('/ratings');
          BackendBridge.setMem(STORAGE.ratings, (rs && rs.ok) ? BackendBridge.backendRatingsToLocal(rs.data && rs.data.ratings) : []);
        } catch (e) {}
        const note = $('#ratingNote');
        if (note) {
          note.textContent = 'Thanks for rating your experience. Redirecting to the shop...';
          note.hidden = false;
        }
        showToast('Thanks for your rating!', 'success');
        try { form.reset(); } catch (e) {}
        markInternalNavigation();
        window.setTimeout(() => redirectWithinSite('Home.html'), 1200);
      });
    }
    const skipRating = $('#skipRating');
    if (skipRating && rating) {
      skipRating.addEventListener('click', () => {
        rating.hidden = true;
        try { form.reset(); } catch (e) {}
        markInternalNavigation();
        window.setTimeout(() => redirectWithinSite('Home.html'), 600);
      });
    }
  }

  function initSpinWheelPage() {
    const canvas = $('#spinCanvas');
    const spinBtn = $('#spinBtn');
    if (!canvas || !spinBtn || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const prizes = [
      { label: '10% OFF',       type: 'percent',       value: 10, color: '#0b5cff', textColor: '#ffffff' },
      { label: 'Free Delivery', type: 'free-delivery', value: 0,  color: '#67e8f9', textColor: '#061225' },
      { label: '5% OFF',        type: 'percent',       value: 5,  color: '#1f7aff', textColor: '#ffffff' },
      { label: 'Try Again',     type: 'none',          value: 0,  color: '#c1121f', textColor: '#ffffff' },
      { label: '15% OFF',       type: 'percent',       value: 15, color: '#071a3a', textColor: '#ffffff' },
      { label: 'Free Delivery', type: 'free-delivery', value: 0,  color: '#ffffff', textColor: '#061225' }
    ];
    let currentRotation = 0;
    let spinning = false;
    function draw(rotation) {
      const size = canvas.width;
      const center = size / 2;
      currentRotation = rotation || 0;
      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(currentRotation);
      prizes.forEach((prize, index) => {
        const start = index * Math.PI * 2 / prizes.length;
        const end = (index + 1) * Math.PI * 2 / prizes.length;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, center - 14, start, end);
        ctx.closePath();
        ctx.fillStyle = prize.color;
        ctx.fill();
        ctx.strokeStyle = '#67e8f9';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.save();
        ctx.rotate(start + (end - start) / 2);
        ctx.fillStyle = prize.textColor || '#ffffff';
        ctx.font = '700 20px Barlow, Arial, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(prize.label, center - 36, 8);
        ctx.restore();
      });
      ctx.restore();
      ctx.beginPath();
      ctx.arc(center, center, center - 10, 0, Math.PI * 2);
      ctx.strokeStyle = '#67e8f9';
      ctx.lineWidth = 10;
      ctx.stroke();
    }
    function couponCode() {
      return 'ELITE-' + Math.random().toString(36).slice(2, 6).toUpperCase();
    }
    function renderPrizeList() {
      const list = $('#prizeList');
      if (!list) return;
      list.innerHTML = prizes.map((prize) => '<div class="prize-row"><span>' + escapeHTML(prize.label) + '</span><small>' + (prize.type === 'none' ? 'Common' : 'Reward') + '</small></div>').join('');
    }
    function getTodaySpin() {
      const spin = readJSON(STORAGE.spin, null);
      if (!spin || !spin.date) return null;
      if (localDateKey(new Date(spin.date)) !== localDateKey()) {
        BackendBridge.setMem(STORAGE.spin, null);
        BackendBridge.setMem(STORAGE.coupon, null);
        try { sessionStorage.removeItem("elitekits_applied_coupon_v1"); } catch (e) {}
        return null;
      }
      return spin;
    }
    function setResultState(spin) {
      const title = $('#resultTitle');
      const prizeNode = $('#resultPrize');
      const desc = $('#resultDesc');
      const icon = $('#resultIcon');
      const couponSection = $('#couponSection');
      if (!spin) {
        if (title) title.textContent = 'Spin the wheel to reveal your reward.';
        if (prizeNode) prizeNode.textContent = '';
        if (desc) desc.textContent = 'Your daily reward is hidden until the wheel stops.';
        if (icon) icon.textContent = '?';
      if (couponSection) couponSection.hidden = true;
        const expiry = $('#couponExpiry');
        if (expiry) expiry.textContent = '';
        return;
      }
      const won = spin.type ? spin.type !== 'none' : Boolean(spin.prize && spin.prize !== 'Try Again');
      if (title) title.textContent = won ? 'Your Daily Reward' : 'Try Again Tomorrow';
      if (prizeNode) prizeNode.textContent = spin.prize || '';
      if (desc) desc.textContent = won ? 'Use this reward from your cart summary.' : 'No coupon this spin, but your next chance refreshes tomorrow.';
      if (icon) icon.textContent = won ? '$' : '0';
      if (couponSection) couponSection.hidden = !won;
      const code = $('#couponCode');
      if (code && spin.couponCode) code.textContent = spin.couponCode;
      const expiry = $('#couponExpiry');
      if (expiry) {
        const expires = spin.expiresAt ? new Date(spin.expiresAt) : null;
        expiry.textContent = won && expires && !Number.isNaN(expires.getTime())
          ? 'Expires at 00:00 tonight.'
          : '';
      }
    }
    function setSpinStatus() {
      const title = $('#swStatusTitle');
      const sub = $('#swStatusSub');
      const spin = getTodaySpin();
      const spun = Boolean(spin);
      spinBtn.disabled = spun;
      spinBtn.classList.toggle('is-locked', spun);
      if (title) title.textContent = spun ? 'Daily spin used' : 'Daily spin available';
      if (sub) sub.textContent = spun ? 'Your next spin unlocks at 00:00 tonight.' : 'One spin is ready for you today.';
      setResultState(spin);
    }
    function finishSpin(prize, index) {
      const won = prize.type !== 'none';
      let coupon = null;
      if (won) {
        coupon = {
          code: prize.couponCode || couponCode(),
          type: prize.type,
          value: prize.value,
          description: prize.label,
          createdAt: new Date().toISOString(),
          expiresAt: prize.expiresAt || ''
        };
        // Cache the coupon in MEM so the current page sees it immediately,
        // AND mirror it to sessionStorage so it survives navigation to Cart
        // and Payment. (The server already created the coupon during /api/spin.)
        BackendBridge.setMem(STORAGE.coupon, coupon);
        try {
          sessionStorage.setItem("elitekits_applied_coupon_v1", JSON.stringify(coupon));
        } catch (e) {}
      }
      const spin = { date: new Date().toISOString(), prize: prize.label, type: prize.type, value: prize.value, couponCode: coupon ? coupon.code : '', expiresAt: prize.expiresAt || '', index };
      // Cache the spin locally; server already recorded it during /api/spin.
      BackendBridge.setMem(STORAGE.spin, spin);
      spinning = false;
      spinBtn.disabled = true;
      const wheel = $('.wheel-outer');
      if (wheel) wheel.classList.remove('is-spinning');
      updateFloatingSpinVisibility();
      setSpinStatus();
      showToast(won ? 'Reward unlocked: ' + prize.label : 'Spin complete. Try again tomorrow.');
    }
    function animateSpin(prize, index) {
  const wheel = $('.wheel-outer');
  if (wheel) wheel.classList.add('is-spinning');
  const sliceAngle  = (Math.PI * 2) / prizes.length;
  const sliceCenter = (index + 0.5) * sliceAngle;     // center angle of chosen slice
  const pointerAngle = -Math.PI / 2;                  // pointer sits at top (12 o'clock)
  const start  = currentRotation;
  // After rotation, slice center should align with the pointer.
  // Add 5 full spins for the visual effect.
  const target = start
               + (Math.PI * 2 * 5)
               + (pointerAngle - sliceCenter - (start % (Math.PI * 2)));
  const duration = 3200;
  const started  = Date.now();
  const frame = () => {
    const elapsed  = Date.now() - started;
    const progress = Math.min(1, elapsed / duration);
    const eased    = 1 - Math.pow(1 - progress, 3);
    draw(start + (target - start) * eased);
    if (progress < 1) {
      if (window.requestAnimationFrame) window.requestAnimationFrame(frame);
      else window.setTimeout(frame, 16);
    } else {
      finishSpin(prize, index);
    }
  };
  frame();
}
    draw(0);
    renderPrizeList();
    setSpinStatus();
    spinBtn.addEventListener('click', async () => {
      if (spinning) return;
      if (hasSpunToday()) {
        setSpinStatus();
        showToast('Your next spin unlocks at 00:00 tonight.', 'error');
        return;
      }
      // Require signed-in to spin (backend will reject otherwise)
      if (!isSignedIn()) {
        showToast('Please sign in to use the daily spin.', 'error');
        markInternalNavigation();
        redirectWithinSite('Auth.html?mode=signin');
        return;
      }
      spinning = true;
      spinBtn.disabled = true;
      // Ask the server to pick the prize so we have a single source of truth
      const res = await BackendBridge.apiFetch('/spin', { method: 'POST' });
      if (!res || !res.ok) {
        spinning = false;
        spinBtn.disabled = false;
        const msg = (res && res.error && res.error.message) || 'Spin failed. Try again later.';
        showToast(msg, 'error');
        return;
      }
      const serverPrize = res.data || {};
      // Pick the wheel segment that matches the server's prize.
      // Backend labels ("10% off", "Free delivery", "Try again tomorrow") don't
      // exactly match the frontend wheel labels ("10% OFF", "Free Delivery",
      // "Try Again"), so match by:
      //   1. case-insensitive label equality
      //   2. percentage value (e.g. "10% off" -> any "10% OFF" slice)
      //   3. free-delivery type
      //   4. fall back to a "Try Again" slice
      function findPrizeIndex() {
        const srvLabel = String(serverPrize.prize_label || '').toLowerCase().trim();
        const srvId = String(serverPrize.prize_id || '').toUpperCase();
        // 1) exact case-insensitive label match
        let i = prizes.findIndex((p) => String(p.label || '').toLowerCase().trim() === srvLabel);
        if (i >= 0) return i;
        // 2) percent match — extract digits from server label, find any slice with same percent
        const percentMatch = srvLabel.match(/(\d+)\s*%/);
        if (percentMatch) {
          const pct = Number(percentMatch[1]);
          i = prizes.findIndex((p) => p.type === 'percent' && Number(p.value) === pct);
          if (i >= 0) return i;
        }
        // 3) explicit free-delivery
        if (/free.*deliver|deliver.*free/.test(srvLabel) || srvId === 'FREEDEL') {
          i = prizes.findIndex((p) => p.type === 'free-delivery');
          if (i >= 0) return i;
        }
        // 4) Try Again
        if (/try.*again/.test(srvLabel) || srvId === 'TRYAGAIN') {
          i = prizes.findIndex((p) => p.type === 'none');
          if (i >= 0) return i;
        }
        // Final fallback — any "try again" segment, else slice 0
        i = prizes.findIndex((p) => p.type === 'none');
        return i >= 0 ? i : 0;
      }
      const index = findPrizeIndex();
      const prize = Object.assign({}, prizes[index], {
        couponCode: serverPrize.coupon_code || '',
        expiresAt: serverPrize.expires_at || '',
        // Override the wheel's static label with the server's authoritative one
        // so the result card shows what the server actually awarded.
        label: serverPrize.prize_label || prizes[index].label
      });
      animateSpin(prize, index);
    });
    const hub = $('#hubBtn');
    if (hub) hub.addEventListener('click', () => spinBtn.click());
    const copy = $('#couponCopy');
    if (copy) copy.addEventListener('click', () => {
      const code = ($('#couponCode') || {}).textContent || '';
      if (code && navigator.clipboard) navigator.clipboard.writeText(code);
      showToast('Coupon code copied.');
    });
    const close = $('#modalClose');
    const modal = $('#winModal');
    if (close && modal) close.addEventListener('click', () => { modal.hidden = true; });
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 2);
    window.setTimeout(setSpinStatus, Math.max(1000, midnight.getTime() - now.getTime()));
  }

  function localDateKey(date = new Date()) {
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  }

  function isSessionSpinCouponExpired(coupon) {
    if (!coupon) return false;
    if (coupon.expiresAt) {
      const expiry = new Date(coupon.expiresAt);
      if (!Number.isNaN(expiry.getTime()) && expiry <= new Date()) return true;
    }
    if (coupon.createdAt) {
      const created = new Date(coupon.createdAt);
      if (!Number.isNaN(created.getTime()) && localDateKey(created) !== localDateKey()) return true;
    }
    return false;
  }

  function hasSpunToday() {
    const spin = readJSON(STORAGE.spin, null);
    if (!spin || !spin.date) return false;
    const current = localDateKey(new Date(spin.date)) === localDateKey();
    if (!current) {
      BackendBridge.setMem(STORAGE.spin, null);
      BackendBridge.setMem(STORAGE.coupon, null);
      try { sessionStorage.removeItem("elitekits_applied_coupon_v1"); } catch (e) {}
    }
    return current;
  }

  function updateFloatingSpinVisibility() {
    const spin = $('#floatingSpin');
    if (spin) spin.hidden = hasSpunToday();
  }

  function initSpinWheelDailyReset() {
    updateFloatingSpinVisibility();
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 2);
    window.setTimeout(updateFloatingSpinVisibility, Math.max(1000, midnight.getTime() - now.getTime()));
  }

  function initAssistantWidget() {
    const toggle = $('#floatingAssistant');
    const widget = $('#assistantWidget');
    if (!toggle || !widget) return;
    const answer = $('#assistantAnswer');
    const input = $('#assistantInput');
    const ask = $('#assistantAsk');
    const close = $('#assistantClose');
    const fallback = 'We will contact you within 24&ndash;48 hours.';
    const responses = {
      sizing: 'For sizing help, open the Size Guide page: <a href="Size Guide.html">View Size Guide</a>.',
      delivery: 'Delivery is tracked. Local delivery timing depends on address and order volume.',
      customization: 'You can add an optional name and number from your cart before checkout. Personalization adds +$5 per jersey.',
      returns: 'Returns are available for eligible non-customized jerseys within the stated return window.'
    };
    const syncAssistantOffset = () => {
      const stack = $('.floating-actions');
      if (stack) widget.style.setProperty('--assistant-stack-height', `${stack.offsetHeight}px`);
    };
    const setAnswer = (html) => {
      if (answer) {
        answer.innerHTML = html;
        answer.hidden = false;
      }
    };
    const setOpen = (open) => {
      syncAssistantOffset();
      if (open) {
        widget.hidden = false;
        window.requestAnimationFrame(() => widget.classList.add('is-open'));
      } else {
        widget.classList.remove('is-open');
        window.setTimeout(() => {
          if (!widget.classList.contains('is-open')) widget.hidden = true;
        }, 180);
      }
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', () => setOpen(widget.hidden || !widget.classList.contains('is-open')));
    if (close) close.addEventListener('click', () => setOpen(false));
    $$('[data-assistant-question]', widget).forEach((button) => {
      button.addEventListener('click', () => setAnswer(responses[button.dataset.assistantQuestion] || fallback));
    });
    if (ask && input) {
      ask.addEventListener('click', () => {
        const question = normalizeText(input.value);
        if (question.includes('size') || question.includes('fit')) setAnswer(responses.sizing);
        else if (question.includes('delivery') || question.includes('shipping')) setAnswer(responses.delivery);
        else if (question.includes('custom') || question.includes('name') || question.includes('number')) setAnswer(responses.customization);
        else if (question.includes('return') || question.includes('exchange')) setAnswer(responses.returns);
        else setAnswer(fallback);
      });
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          ask.click();
        }
      });
    }
    window.addEventListener('resize', syncAssistantOffset);
    syncAssistantOffset();
  }

  function initFloatingActions() {
    if (document.body.classList.contains('auth-page') || document.body.classList.contains('admin-page')) return;
    if ($('.floating-actions')) return;
    const stack = document.createElement('div');
    stack.className = 'floating-actions';
    stack.setAttribute('aria-label', 'Quick actions');
    stack.innerHTML = [
      '<button type="button" class="floating-action" id="floatingAssistant" aria-label="Message assistant" aria-expanded="false"><i class="fa-solid fa-message"></i></button>',
      '<button type="button" class="floating-action" id="floatingBackTop" aria-label="Back to top"><i class="fa-solid fa-chevron-up"></i></button>',
      '<a class="floating-action" id="floatingSpin" href="SpinWheel.html" aria-label="Spin the Wheel"><i class="fa-solid fa-gift"></i></a>'
    ].join('');
    document.body.appendChild(stack);
    const widget = document.createElement('section');
    widget.className = 'assistant-widget';
    widget.id = 'assistantWidget';
    widget.hidden = true;
    widget.innerHTML = [
      '<div class="assistant-head"><div class="assistant-head-icon"><i class="fa-solid fa-headset"></i></div><div class="assistant-head-copy"><h2>Elite Kits Assistant</h2><span>Fast help for jerseys, sizing, delivery, and returns</span></div><button type="button" id="assistantClose" class="assistant-close" aria-label="Close assistant"><i class="fa-solid fa-xmark"></i></button></div>',
      '<div class="assistant-body">',
      '<p class="assistant-intro"><i class="fa-solid fa-message"></i><span>Hi, I can help you with sizing, delivery, customization, and returns.</span></p>',
      '<div class="assistant-questions">',
      '<button type="button" data-assistant-question="sizing"><i class="fa-solid fa-ruler"></i><span>Sizing help</span></button>',
      '<button type="button" data-assistant-question="delivery"><i class="fa-solid fa-truck-fast"></i><span>Delivery</span></button>',
      '<button type="button" data-assistant-question="customization"><i class="fa-solid fa-shirt"></i><span>Customization</span></button>',
      '<button type="button" data-assistant-question="returns"><i class="fa-solid fa-rotate-left"></i><span>Returns</span></button>',
      '</div>',
      '<p class="assistant-answer" id="assistantAnswer" hidden></p>',
      '<div class="assistant-custom"><input id="assistantInput" type="text" placeholder="Ask another question" aria-label="Ask the Elite Kits assistant"><button type="button" id="assistantAsk"><span>Ask</span><i class="fa-solid fa-arrow-right"></i></button></div>',
      '</div>'
    ].join('');
    document.body.appendChild(widget);
    const back = $('#floatingBackTop');
    if (back) back.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    initAssistantWidget();
    initSpinWheelDailyReset();
  }

  function closeAdminModal(modal) {
    if (!modal) return;
    modal.hidden = true;
    modal.classList.remove('is-open');
  }

  function openAdminModal(modal) {
    if (!modal) return;
    modal.hidden = false;
    modal.classList.add('is-open');
  }

  function closeAdminModals() {
    const msgFoot = $('#msgModal') ? $('.modal-foot', $('#msgModal')) : null;
    if (msgFoot) msgFoot.hidden = false;
    closeAdminModal($('#msgModal'));
    closeAdminModal($('#orderModal'));
  }

  function openAdminOrderModal(orderId) {
    const order = readJSON(STORAGE.orders, []).find((entry) => entry.id === orderId);
    const modal = $('#orderModal');
    if (!order || !modal) return;
    const title = $('#modalOrderId');
    const body = $('#modalBody');
    const status = $('#modalStatus');
    if (title) title.textContent = 'Order ' + order.id;
    if (status) {
      status.value = order.status || 'Confirmed';
      syncPremiumSelect(status);
    }
    if (body) {
      const itemRows = (order.items || []).map((item) => {
        const product = productById(item.id);
        if (!product) return '';
        const details = [
          item.size ? 'Size ' + escapeHTML(item.size) : 'Size pending',
          hasCustomization(item) ? 'Custom: ' + escapeHTML([item.customName, item.customNumber].filter(Boolean).join(' / ')) : 'No personalization'
        ].join(' - ');
        return '<li><strong>' + escapeHTML(product.team) + '</strong><span>' + details + ' x ' + (item.quantity || 1) + '</span></li>';
      }).join('');
      const addressText = orderAddressText(order);
      const phoneDisplay = order.phoneE164 || (order.phoneDialCode && order.phoneNational ? order.phoneDialCode + order.phoneNational : '');
      const phoneRow = phoneDisplay
        ? '<p><strong>Phone:</strong> ' + escapeHTML(phoneDisplay) + (order.phoneCountry ? ' <span class="admin-phone-country">(' + escapeHTML(order.phoneCountry) + ')</span>' : '') + '</p>'
        : '<p><strong>Phone:</strong> -</p>';
      body.innerHTML = '<div class="admin-modal-summary"><p><strong>Customer:</strong> ' + escapeHTML(order.customer || 'Guest') + '</p><p><strong>Email:</strong> ' + escapeHTML(order.email || '-') + '</p>' + phoneRow + '<p><strong>Total:</strong> ' + money(order.total || 0) + '</p><p><strong>Date:</strong> ' + escapeHTML((order.createdAt || '').slice(0, 10)) + '</p><p><strong>Address:</strong> ' + escapeHTML(addressText) + '</p></div><ul class="admin-modal-items">' + itemRows + '</ul><div class="admin-order-timeline"><h3>Status Timeline</h3>' + ek2OrderTimelineHTML(order) + '</div>';
    }
    openAdminModal(modal);
  }

  async function openAdminMessageModal(messageId) {
    const message = readJSON(STORAGE.messages, []).find((entry) => String(entry.id) === String(messageId));
    const modal = $('#msgModal');
    if (!message || !modal) return;
    modal.dataset.messageId = String(messageId);
    const markReadButton = $('#msgMarkReadBtn');
    if (markReadButton) {
      // Career applications no longer expose the Mark-as-Read / Read button.
      // Opening the modal already auto-marks the application as read below,
      // so the explicit button was always disabled and unusable for that
      // flow. Contact messages keep the button.
      const isApplication = message.type === 'application';
      if (isApplication) {
        markReadButton.hidden = true;
      } else {
        markReadButton.hidden = false;
        markReadButton.disabled = Boolean(message.read);
        markReadButton.textContent = message.read ? 'Read' : 'Mark as Read';
      }
    }
    const title = $('#msgModalTitle');
    const body = $('#msgModalBody');
    if (title) title.textContent = message.type === 'application' ? 'Job Application' : 'Message';
    if (body) {
      const cvParts = [];
      if (message.cvFile) cvParts.push(escapeHTML(message.cvFile));
      if (message.cvMime) cvParts.push(escapeHTML(message.cvMime));
      if (message.cvSize) cvParts.push(escapeHTML(Math.max(1, Math.round(message.cvSize / 1024)) + ' KB'));
      const cvDownloadLink = (message.type === 'application' && message.hasCv && message.cvFile && message.id)
        ? ' <a class="btn-secondary" href="/api/messages/' + encodeURIComponent(message.id) + '/cv" target="_blank" rel="noopener" download><i class="fa-solid fa-download"></i> Download CV</a>'
        : '';
      body.innerHTML = [
        '<div class="admin-modal-summary">',
        '<p><strong>Name:</strong> ' + escapeHTML(message.name || '-') + '</p>',
        '<p><strong>Email:</strong> ' + escapeHTML(message.email || '-') + '</p>',
        '<p><strong>Subject / Type:</strong> ' + escapeHTML((message.subject || '-') + ' / ' + (message.type || 'contact')) + '</p>',
        '<p><strong>Date:</strong> ' + escapeHTML((message.createdAt || '').slice(0, 10) || '-') + '</p>',
        message.type === 'application' ? '<p><strong>Career role:</strong> ' + escapeHTML(message.role || message.subject || '-') + '</p>' : '',
        message.type === 'application' ? '<p><strong>CV:</strong> ' + (cvParts.length ? cvParts.join(' / ') : '-') + cvDownloadLink + '</p>' : '',
        '</div>',
        '<div class="admin-message-body"><strong>Message</strong><p>' + escapeHTML(message.message || '-') + '</p></div>'
      ].join('');
    }
    openAdminModal(modal);
    if (!message.read) {
      const res = await BackendBridge.apiFetch('/messages/' + encodeURIComponent(messageId) + '/read', { method: 'PATCH' });
      if (!res || !res.ok) {
        showToast((res && res.error && res.error.message) || 'Could not mark message as read.', 'error');
        return;
      }
      message.read = true;
      try {
        await refreshAdminMessagesFromBackend();
      } catch (e) {
        const messages = readJSON(STORAGE.messages, []);
        const target = messages.find((entry) => String(entry.id) === String(messageId));
        if (target) target.read = true;
        BackendBridge.setMem(STORAGE.messages, messages);
        updateAdminMessageBadge(messages);
      }
      if (markReadButton) {
        markReadButton.disabled = true;
        markReadButton.textContent = 'Read';
      }
      renderAdminDashboard();
      if ($('#tab-applications') && $('#tab-applications').classList.contains('active')) ek2RenderAdminApplicationsTab();
      showToast('Message marked as read.');
    }
  }

  async function deleteAdminMessage(messageId) {
    const messages = readJSON(STORAGE.messages, []);
    const message = messages.find((entry) => String(entry.id) === String(messageId));
    const label = message ? (message.type === 'application' ? 'application' : 'message') : 'message';
    if (!window.confirm('Delete this ' + label + '? This cannot be undone.')) return;
    const row = $$('[data-admin-message-row]').find((entry) => entry.dataset.adminMessageRow === String(messageId));
    const button = $$('[data-admin-message-delete]').find((entry) => entry.dataset.adminMessageDelete === String(messageId));
    if (button) button.disabled = true;
    try {
      const res = await BackendBridge.apiFetch('/messages/' + encodeURIComponent(messageId), { method: 'DELETE' });
      if (!res || !res.ok) {
        showToast((res && res.error && res.error.message) || 'Could not delete message.', 'error');
        return;
      }
      BackendBridge.setMem(STORAGE.messages, messages.filter((entry) => String(entry.id) !== String(messageId)));
      if (row) row.remove();
      try { await refreshAdminMessagesFromBackend(); } catch (e) { updateAdminMessageBadge(); }
      renderAdminDashboard();
      if ($('#tab-applications') && $('#tab-applications').classList.contains('active')) ek2RenderAdminApplicationsTab();
      showToast(label === 'application' ? 'Application deleted.' : 'Message deleted.');
    } finally {
      if (button && document.body.contains(button)) button.disabled = false;
    }
  }

  function openAdminUserOrdersModal(email) {
    const targetEmail = canonicalEmail(email);
    const user = getRegisteredUsers().find((entry) => canonicalEmail(entry.email) === targetEmail);
    const orders = readJSON(STORAGE.orders, []).filter((order) => canonicalEmail(order.email) === targetEmail);
    const modal = $('#msgModal');
    if (!modal) return;
    delete modal.dataset.messageId;
    const markReadButton = $('#msgMarkReadBtn');
    if (markReadButton) markReadButton.hidden = true;
    const title = $('#msgModalTitle');
    const body = $('#msgModalBody');
    if (title) title.textContent = 'Customer Orders';
    if (body) {
      const rows = orders.map((order) => '<li><strong>' + escapeHTML(order.id || '-') + '</strong><span>' + escapeHTML((order.createdAt || '').slice(0, 10) || '-') + ' - ' + money(order.total || 0) + ' - ' + escapeHTML(order.status || 'Confirmed') + '</span></li>').join('');
      body.innerHTML = '<div class="admin-modal-summary"><p><strong>Customer:</strong> ' + escapeHTML((user && user.name) || targetEmail || '-') + '</p><p><strong>Email:</strong> ' + escapeHTML(targetEmail || '-') + '</p><p><strong>Orders:</strong> ' + orders.length + '</p></div><ul class="admin-modal-items">' + (rows || '<li><strong>No orders</strong><span>-</span></li>') + '</ul>';
    }
    openAdminModal(modal);
  }

  function openAdminStockModal(productId, preferredSize = '') {
    const product = productById(productId);
    const modal = $('#msgModal');
    if (!product || !modal) return;
    delete modal.dataset.messageId;
    const markReadButton = $('#msgMarkReadBtn');
    if (markReadButton) markReadButton.hidden = true;
    const orders = readJSON(STORAGE.orders, []);
    const sold = orders.reduce((sum, order) => {
      return sum + (order.items || []).reduce((itemSum, item) => itemSum + (item.id === product.id ? Number(item.quantity) || 0 : 0), 0);
    }, 0);
    const title = $('#msgModalTitle');
    const body = $('#msgModalBody');
    if (title) title.textContent = 'Manage Stock';
    if (body) {
      const stockBySize = getProductStockBySize(product);
      const sizeRows = Object.keys(stockBySize).length
        ? '<div class="admin-stock-size-grid">' + SIZES.map((size) => {
          const qty = Number(stockBySize[size] || 0);
          const cls = qty <= 0 ? 'is-out' : qty <= 3 ? 'is-low' : 'is-in';
          return '<span class="' + cls + '"><strong>' + size + '</strong>' + qty + '</span>';
        }).join('') + '</div>'
        : '<p class="admin-stock-size-empty">Size-level stock is not available for this product.</p>';
      const selectedSize = cleanSize(preferredSize);
      const sizeOptions = '<option value="">Select size</option>' + SIZES.map((size) => '<option value="' + size + '"' + (selectedSize === size ? ' selected' : '') + '>' + size + ' (' + (stockBySize[size] || 0) + ')</option>').join('');
      body.innerHTML = '<div class="admin-modal-summary"><p><strong>Product:</strong> ' + escapeHTML(product.team) + '</p><p><strong>League:</strong> ' + escapeHTML(product.league) + '</p><p><strong>Season:</strong> ' + escapeHTML(product.season) + '</p><p><strong>Total stock:</strong> ' + product.stock + '</p><p><strong>Status:</strong> ' + escapeHTML(adminStockStatus(product).label) + '</p><p><strong>State:</strong> ' + escapeHTML(product.active === false ? 'Inactive' : 'Active') + '</p><p><strong>Sold from orders:</strong> ' + sold + '</p></div><div class="admin-stock-breakdown"><h3>Stock by size</h3>' + sizeRows + '</div><div class="admin-stock-adjust"><label for="stockAdjustSize">Size to update</label><select class="filter-select" id="stockAdjustSize">' + sizeOptions + '</select><label for="stockAdjustQty">Quantity adjustment</label><input class="filter-select" id="stockAdjustQty" type="number" min="1" step="1" value="1"><p class="admin-stock-hint" id="stockAdjustHint">Choose one size. Stock changes only affect that size.</p><div class="admin-stock-actions"><button class="btn-action" type="button" data-stock-adjust="add" data-stock-product="' + escapeHTML(product.id) + '" disabled><i class="fa-solid fa-plus"></i> Add stock</button><button class="btn-secondary" type="button" data-stock-adjust="remove" data-stock-product="' + escapeHTML(product.id) + '" disabled><i class="fa-solid fa-minus"></i> Remove stock</button></div><p class="admin-stock-error" id="stockAdjustError" hidden></p></div>';
    }
    openAdminModal(modal);
    if (body) initPremiumSelects(body);
    syncAdminStockModalControls();
  }

  function syncAdminStockModalControls() {
    const sizeSelect = $('#stockAdjustSize');
    const qtyInput = $('#stockAdjustQty');
    const buttons = $$('[data-stock-adjust]');
    if (!sizeSelect || !qtyInput || !buttons.length) return;
    const size = cleanSize(sizeSelect.value);
    const amount = parseInt(qtyInput.value, 10);
    const ready = Boolean(size && amount && amount > 0);
    buttons.forEach((button) => {
      if (!button.classList.contains('ek-btn-loading')) button.disabled = !ready;
    });
  }

  async function updateAdminStockFromModal(productId, action) {
    const product = productById(productId);
    const input = $('#stockAdjustQty');
    const sizeSelect = $('#stockAdjustSize');
    const error = $('#stockAdjustError');
    if (!product || !input) return;
    const amount = parseInt(input.value, 10);
    const setError = (message) => {
      if (error) {
        error.textContent = message;
        error.hidden = !message;
      }
      if (message) showToast(message, 'error');
    };
    if (!amount || amount < 1) {
      setError('Enter a valid quantity.');
      syncAdminStockModalControls();
      return;
    }
    const selectedSize = cleanSize(sizeSelect && sizeSelect.value);
    if (!selectedSize) {
      setError('Select a specific size before updating stock.');
      syncAdminStockModalControls();
      return;
    }
    const stockBySize = getProductStockBySize(product);
    const current = Number(stockBySize[selectedSize] || 0);
    const next = action === 'remove' ? current - amount : current + amount;
    if (next < 0) {
      setError('Stock cannot go below 0.');
      return;
    }
    setError('');
    const buttons = $$('[data-stock-adjust]');
    buttons.forEach((button) => { button.disabled = true; button.classList.add('ek-btn-loading'); });
    try {
      const payload = { size: selectedSize, delta: action === 'remove' ? -amount : amount };
      const res = await BackendBridge.persistStockAdjustment(product.id, payload);
      if (!res || !res.ok) {
        setError((res && res.error && res.error.message) || 'Could not update stock.');
        return;
      }
      applyProductStockPayload(product.id, res.data || {});
      const fresh = productById(product.id);
      if (fresh) {
        const overrides = getStockOverrides();
        overrides[fresh.id] = fresh.stock;
        BackendBridge.setMem(STORAGE.stock, overrides);
      }
      updateAdminProductManagementRow(product.id);
      openAdminStockModal(product.id, selectedSize);
      showToast(selectedSize + ' stock updated to ' + next + '.');
    } catch (errorUpdate) {
      setError('Could not update stock. Please try again.');
    } finally {
      $$('[data-stock-adjust]').forEach((button) => { button.disabled = false; button.classList.remove('ek-btn-loading'); });
      syncAdminStockModalControls();
    }
  }

  function initAdminModals() {
    if (!document.body.classList.contains('admin-page')) return;
    closeAdminModals();
    ['modalClose', 'modalCloseBtn', 'msgModalClose', 'msgModalCloseBtn'].forEach((id) => {
      const button = $('#' + id);
      if (button) button.addEventListener('click', closeAdminModals);
    });
    $$('.modal-overlay').forEach((overlay) => {
      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) closeAdminModal(overlay);
      });
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeAdminModals();
    });
    const saveStatus = $('#modalSaveStatus');
    if (saveStatus) {
      saveStatus.addEventListener('click', async () => {
        const title = $('#modalOrderId');
        const id = title ? title.textContent.replace(/^Order\s+/, '').trim() : '';
        const status = $('#modalStatus');
        if (!id || !status) return;
        const res = await BackendBridge.apiFetch('/orders/' + encodeURIComponent(id) + '/status', {
          method: 'PATCH',
          body: { status: status.value }
        });
        if (!res || !res.ok) {
          showToast((res && res.error && res.error.message) || 'Could not update status.', 'error');
          return;
        }
        // Re-fetch orders into cache
        try {
          const od = await BackendBridge.apiFetch('/orders');
          BackendBridge.setMem(STORAGE.orders, (od && od.ok) ? BackendBridge.backendOrdersToLocal(od.data && od.data.orders) : []);
        } catch (e) {}
        renderAdminDashboard();
        closeAdminModals();
        showToast('Order status updated.');
      });
    }
    const markRead = $('#msgMarkReadBtn');
    if (markRead) {
      markRead.addEventListener('click', async () => {
        const modal = $('#msgModal');
        const id = modal ? modal.dataset.messageId : '';
        if (!id) return;
        const res = await BackendBridge.apiFetch('/messages/' + encodeURIComponent(id) + '/read', { method: 'PATCH' });
        if (!res || !res.ok) {
          showToast((res && res.error && res.error.message) || 'Could not mark message as read.', 'error');
          return;
        }
        try { await refreshAdminMessagesFromBackend(); } catch (e) {}
        markRead.disabled = true;
        markRead.textContent = 'Read';
        renderAdminDashboard();
        showToast('Message marked as read.');
      });
    }
  }

  function initAdminPage() {
    if (!document.body.classList.contains('admin-page')) return;
    const user = getUser();
    const adminName = $('#adminName');
    if (adminName) adminName.textContent = isAdminSignedIn() ? 'Admin' : 'Admin Preview';
    const tabs = $$('.sb-item[data-tab]');
    const panels = $$('.tab-panel');
    const title = $('#topbarTitle');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const key = tab.dataset.tab;
        tabs.forEach((item) => item.classList.remove('active'));
        tab.classList.add('active');
        panels.forEach((panel) => panel.classList.toggle('active', panel.id === 'tab-' + key));
        if (title) title.textContent = tab.textContent.trim().replace(/\s+/g, ' ');
      });
    });
    const sidebar = $('#sidebar');
    const overlay = $('#sidebarOverlay');
    const menu = $('#menuToggle');
    const close = $('#sidebarClose');
    const closeSidebar = () => { if (sidebar) sidebar.classList.remove('is-open'); if (overlay) overlay.classList.remove('is-open'); };
    if (menu) menu.addEventListener('click', () => { if (sidebar) sidebar.classList.add('is-open'); if (overlay) overlay.classList.add('is-open'); });
    if (close) close.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);
    const logout = $('#adminLogout');
    if (logout) logout.addEventListener('click', () => { setUser(null); redirectWithinSite('Auth.html'); });
    const userSearch = $('#userSearch');
    if (userSearch) {
      userSearch.addEventListener('input', () => {
        renderAdminUsers(getRegisteredUsers(), readJSON(STORAGE.orders, []));
      });
    }
    ['orderSearch', 'orderStatusFilter', 'stockSearch', 'msgSearch', 'msgTypeFilter', 'msgReadFilter'].forEach((id) => {
      const control = $('#' + id);
      if (!control) return;
      control.addEventListener('input', renderAdminDashboard);
      control.addEventListener('change', renderAdminDashboard);
    });
    document.addEventListener('input', (event) => {
      if (event.target && (event.target.id === 'stockAdjustQty' || event.target.id === 'stockAdjustSize')) syncAdminStockModalControls();
    });
    document.addEventListener('change', (event) => {
      if (event.target && (event.target.id === 'stockAdjustQty' || event.target.id === 'stockAdjustSize')) syncAdminStockModalControls();
    });
    initAdminModals();
    const markAllRead = $('#markAllReadBtn');
    if (markAllRead) {
      markAllRead.addEventListener('click', async () => {
        const unread = readJSON(STORAGE.messages, []).filter((message) => !message.read);
        if (!unread.length) {
          showToast('All messages are already read.', 'info');
          return;
        }
        markAllRead.disabled = true;
        try {
          for (const message of unread) {
            await BackendBridge.apiFetch('/messages/' + encodeURIComponent(message.id) + '/read', { method: 'PATCH' });
          }
          try {
            await refreshAdminMessagesFromBackend();
          } catch (e) {
            const updated = readJSON(STORAGE.messages, []).map((message) => ({ ...message, read: true }));
            BackendBridge.setMem(STORAGE.messages, updated);
            updateAdminMessageBadge(updated);
          }
          renderAdminDashboard();
          showToast('Messages marked as read.');
        } finally {
          markAllRead.disabled = false;
        }
      });
    }
    const resetStock = $('#resetStockBtn');
    if (resetStock) {
      resetStock.addEventListener('click', async () => {
        resetStock.disabled = true;
        try {
          const prods = await BackendBridge.apiFetch('/admin/products');
          if (!prods || !prods.ok) {
            showToast((prods && prods.error && prods.error.message) || 'Could not refresh stock.', 'error');
            return;
          }
          BackendBridge._serverProducts = prods.data.products || [];
          BackendBridge.setMem(STORAGE.stock, BackendBridge.backendProductsToStockMap(BackendBridge._serverProducts));
          applyBackendProductDetails(BackendBridge._serverProducts);
          applyStockOverrides();
          renderAdminDashboard();
          showToast('Product stock refreshed from database.');
        } finally {
          resetStock.disabled = false;
        }
      });
    }
    document.addEventListener('click', async (event) => {
      const orderButton = event.target.closest('[data-admin-order]');
      if (orderButton) {
        openAdminOrderModal(orderButton.dataset.adminOrder);
        return;
      }
      const deleteMessageButton = event.target.closest('[data-admin-message-delete]');
      if (deleteMessageButton) {
        await deleteAdminMessage(deleteMessageButton.dataset.adminMessageDelete);
        return;
      }
      const messageButton = event.target.closest('[data-admin-message]');
      if (messageButton) {
        await openAdminMessageModal(messageButton.dataset.adminMessage);
        return;
      }
      const userButton = event.target.closest('[data-admin-user]');
      if (userButton) {
        openAdminUserOrdersModal(userButton.dataset.adminUser);
        return;
      }
      const stockAdjust = event.target.closest('[data-stock-adjust]');
      if (stockAdjust) {
        await updateAdminStockFromModal(stockAdjust.dataset.stockProduct, stockAdjust.dataset.stockAdjust);
        return;
      }
      const stockButton = event.target.closest('[data-admin-stock]');
      if (stockButton) openAdminStockModal(stockButton.dataset.adminStock);
    });
    renderAdminDashboard();
  }

  function shortLabel(value, max = 14) {
    const text = String(value || '-').trim();
    return text.length > max ? text.slice(0, max - 3).trim() + '...' : text;
  }

  function orderQuantity(order) {
    return (order.items || []).reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  }

  function localDayKey(date) {
    const parsed = date instanceof Date ? date : new Date(date || Date.now());
    return parsed.getFullYear() + '-' + String(parsed.getMonth() + 1).padStart(2, '0') + '-' + String(parsed.getDate()).padStart(2, '0');
  }

  function dayName(date) {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
  }

  function chartLevel(value, max) {
    if (!value || !max) return 0;
    return clamp(Math.ceil((Number(value) / max) * 12), 1, 12);
  }

  function renderAdminBarChart(id, rows, caption) {
    const chart = $('#' + id);
    if (!chart) return;
    const safeRows = rows.length ? rows : [{ label: 'No data', value: 0, valueLabel: '0', color: 'navy' }];
    const hasData = safeRows.some((row) => Number(row.value) > 0);
    if (!hasData) {
      chart.innerHTML = [
        '<div class="admin-chart admin-chart-empty">',
        '<div class="admin-chart-empty-icon"><i class="fa-solid fa-chart-column"></i></div>',
        '<strong>No data yet</strong>',
        '<p class="admin-chart-caption">' + escapeHTML(caption) + '</p>',
        '</div>'
      ].join('');
      return;
    }
    const max = Math.max(1, ...safeRows.map((row) => Number(row.value) || 0));
    chart.innerHTML = [
      '<div class="admin-chart">',
      '<div class="admin-chart-bars">',
      safeRows.map((row) => {
        const level = chartLevel(row.value, max);
        const color = row.color || 'blue';
        return '<div class="admin-chart-item"><div class="admin-chart-track"><div class="admin-chart-bar chart-h-' + level + ' chart-color-' + color + '"><span>' + escapeHTML(row.valueLabel != null ? row.valueLabel : row.value) + '</span></div></div><span class="admin-chart-label" title="' + escapeHTML(row.label) + '">' + escapeHTML(shortLabel(row.label, 12)) + '</span></div>';
      }).join(''),
      '</div>',
      '<p class="admin-chart-caption">' + escapeHTML(caption) + '</p>',
      '</div>'
    ].join('');
  }

  function buildAdminChartData(orders, ratings, users) {
    const colors = ['blue', 'cyan', 'ice', 'red', 'navy', 'green', 'slate'];
    const today = new Date();
    const days = Array.from({ length: 7 }, (_, index) => {
      const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (6 - index));
      const key = localDayKey(day);
      const revenue = orders.filter((order) => localDayKey(order.createdAt) === key).reduce((sum, order) => sum + (Number(order.total) || 0), 0);
      return { label: dayName(day), value: revenue, valueLabel: money(revenue), color: colors[index % colors.length] };
    });
    const statuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
    const statusRows = statuses.map((status, index) => {
      const count = orders.filter((order) => String(order.status || 'Confirmed').toLowerCase() === status.toLowerCase()).length;
      return { label: status, value: count, valueLabel: String(count), color: status === 'Cancelled' ? 'red' : colors[index % colors.length] };
    });
    const leagueRows = LEAGUES.map((league, index) => {
      const units = orders.reduce((sum, order) => {
        return sum + (order.items || []).reduce((itemSum, item) => {
          const product = productById(item.id);
          return itemSum + (product && product.leagueKey === league.key ? Number(item.quantity) || 0 : 0);
        }, 0);
      }, 0);
      return { label: league.league, value: units, valueLabel: String(units), color: colors[index % colors.length] };
    });
    const productMap = new Map();
    orders.forEach((order) => {
      (order.items || []).forEach((item) => {
        const product = productById(item.id);
        if (!product) return;
        productMap.set(product.team, (productMap.get(product.team) || 0) + (Number(item.quantity) || 0));
      });
    });
    const topProducts = Array.from(productMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([label, value], index) => ({ label, value, valueLabel: String(value), color: colors[index % colors.length] }));
    const customerMap = new Map();
    orders.forEach((order) => {
      const email = canonicalEmail(order.email || order.customer || 'Guest');
      customerMap.set(email, (customerMap.get(email) || 0) + (Number(order.total) || 0));
    });
    users.forEach((user) => {
      if (!customerMap.has(user.email)) customerMap.set(user.email, 0);
    });
    const customerRows = Array.from(customerMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([label, value], index) => ({ label: label.split('@')[0] || 'Guest', value, valueLabel: money(value), color: colors[index % colors.length] }));
    const ratingRows = [1, 2, 3, 4, 5].map((rating, index) => {
      const count = ratings.filter((entry) => Number(entry.rating || 5) === rating).length;
      return { label: rating + ' star', value: count, valueLabel: String(count), color: rating >= 4 ? 'green' : rating <= 2 ? 'red' : colors[index % colors.length] };
    });
    const riskRows = LEAGUES.map((league, index) => {
      const count = PRODUCTS.filter((product) => product.leagueKey === league.key && product.stock <= 3).length;
      return { label: league.league, value: count, valueLabel: String(count), color: count > 8 ? 'red' : count > 3 ? 'blue' : 'green' };
    }).sort((a, b) => b.value - a.value).slice(0, 7);
    return { days, statusRows, leagueRows, topProducts, customerRows, ratingRows, riskRows };
  }

  function normalizeOrderId(value) {
    return String(value || '').trim();
  }

  function ratingForOrder(order, ratings, orderIndex) {
    const orderId = normalizeOrderId(order && (order.id || order.orderId || order.orderCode));
    if (!orderId) return null;
    const explicitMatch = ratings.find((rating) => {
      return normalizeOrderId(rating.orderId || rating.orderID || rating.orderCode) === orderId;
    });
    if (explicitMatch) return explicitMatch;
    const fallback = ratings[orderIndex];
    if (fallback && !normalizeOrderId(fallback.orderId || fallback.orderID || fallback.orderCode)) return fallback;
    return null;
  }

  function adminRatingDisplay(rating) {
    if (!rating) return '&mdash;';
    const value = Number(rating.rating || 0) || 5;
    return escapeHTML(String(value)) + ' <span class="admin-rating-star">&#9733;</span>';
  }

  function orderAddressText(order) {
    const source = order || {};
    const rawAddress = typeof source.address === 'string' ? source.address : '';
    const address = source.address && typeof source.address === 'object' ? source.address : {};
    const parts = [
      address.governorate || source.governorate || source.lbState || source.state,
      address.city || source.city,
      address.road || address.street || source.road || source.street || source.addressLine,
      source.addressText && !address.governorate ? source.addressText : '',
      rawAddress
    ].filter(Boolean);
    return parts.length ? parts.join(', ') : '-';
  }

  function adminRatingRow(rating, index, orders) {
    const explicitOrderId = normalizeOrderId(rating.orderId || rating.orderID || rating.orderCode);
    const relatedOrder = explicitOrderId
      ? orders.find((order) => normalizeOrderId(order.id || order.orderId || order.orderCode) === explicitOrderId)
      : orders[index] || null;
    const orderId = explicitOrderId || (relatedOrder ? (relatedOrder.id || relatedOrder.orderId || relatedOrder.orderCode || '') : '');
    const customer = rating.customer || rating.email || (relatedOrder ? (relatedOrder.customer || relatedOrder.email || '') : '');
    const date = rating.date || rating.createdAt || (relatedOrder ? relatedOrder.createdAt : '');
    const total = rating.total != null && rating.total !== '' ? rating.total : (relatedOrder ? relatedOrder.total : null);
    const totalText = total != null && total !== '' && !Number.isNaN(Number(total)) ? money(Number(total)) : '-';
    return '<tr><td>' + escapeHTML(orderId || '-') + '</td><td>' + escapeHTML(customer || '-') + '</td><td>' + escapeHTML((date || '').slice(0, 10) || '-') + '</td><td>' + adminRatingDisplay(rating) + '</td><td>' + totalText + '</td></tr>';
  }

  function filteredAdminOrders(orders) {
    const search = normalizeText(($('#orderSearch') || {}).value || '');
    const status = normalizeText(($('#orderStatusFilter') || {}).value || '');
    return orders.filter((order) => {
      const haystack = normalizeText([order.id, order.customer, order.email, order.status, order.total].join(' '));
      const statusMatch = !status || normalizeText(order.status || 'Confirmed') === status;
      return (!search || haystack.includes(search)) && statusMatch;
    });
  }

  function filteredAdminProducts(products) {
    const search = normalizeText(($('#stockSearch') || {}).value || '');
    if (!search) return products;
    return products.filter((product) => normalizeText([product.team, product.league, product.season, stockLabel(product), product.stock].join(' ')).includes(search));
  }

  function messageCvLabel(message) {
    if (!message || !message.cvFile) return '-';
    const size = message.cvSize ? ' (' + Math.max(1, Math.round(message.cvSize / 1024)) + ' KB)' : '';
    return message.cvFile + size;
  }

  function messageCvCellHTML(message) {
    if (!message) return '-';
    if (!message.hasCv || !message.cvFile || !message.id) return message && message.type === 'application' ? 'No CV' : '-';
    const label = messageCvLabel(message);
    return '<a class="btn-secondary" href="/api/messages/' + encodeURIComponent(message.id) + '/cv" target="_blank" rel="noopener" download title="' + escapeHTML(label) + '"><i class="fa-solid fa-download"></i> Download CV</a>';
  }

  function adminMessageTotalCount(messages = readJSON(STORAGE.messages, [])) {
    return Array.isArray(messages) ? messages.length : 0;
  }

  function updateAdminMessageBadge(messages = readJSON(STORAGE.messages, [])) {
    const badge = $('#unreadBadge');
    if (!badge) return;
    const total = adminMessageTotalCount(messages);
    badge.textContent = String(total);
    badge.setAttribute('aria-label', total + ' total messages');
    badge.title = total + ' total messages';
  }

  async function refreshAdminMessagesFromBackend() {
    const ms = await BackendBridge.apiFetch('/messages');
    if (ms && ms.ok) {
      BackendBridge.setMem(STORAGE.messages, BackendBridge.backendMessagesToLocal(ms.data && ms.data.messages));
    }
    updateAdminMessageBadge();
    return readJSON(STORAGE.messages, []);
  }

  async function refreshAdminAnalyticsFromBackend(rangeValue) {
    const range = encodeURIComponent(rangeValue || (document.getElementById('adminAnalyticsRange') || {}).value || 'all');
    const overview = await BackendBridge.apiFetch('/admin/overview?range=' + range);
    const analytics = await BackendBridge.apiFetch('/admin/analytics?range=' + range);
    if (overview && overview.ok) BackendBridge._adminOverview = overview.data;
    if (analytics && analytics.ok) BackendBridge._adminAnalytics = analytics.data;
    renderAdminDashboard();
    if (document.querySelector('.tab-panel.active#tab-analytics')) ek2RenderAdminAnalyticsTab();
  }

  function filteredAdminMessages(messages) {
    const search = normalizeText(($('#msgSearch') || {}).value || '');
    const type = normalizeText(($('#msgTypeFilter') || {}).value || '');
    const readFilter = normalizeText(($('#msgReadFilter') || {}).value || '');
    return messages.filter((message) => {
      const haystack = normalizeText([message.name, message.email, message.subject, message.type, message.message].join(' '));
      const typeMatch = !type || normalizeText(message.type || 'contact') === type;
      const readMatch = readFilter !== 'unread' || !message.read;
      return (!search || haystack.includes(search)) && typeMatch && readMatch;
    });
  }

  function adminProductManagementRow(product) {
    const stockStatus = adminStockStatus(product);
    const active = product.active === false ? 'Inactive' : 'Active';
    const activeClass = product.active === false ? 'is-inactive' : 'is-active';
    return '<tr data-admin-product-row="' + escapeHTML(product.id) + '"><td class="admin-product-main"><strong>' + escapeHTML(product.team) + '</strong><span>' + escapeHTML(product.id) + '</span></td><td>' + escapeHTML(product.league) + '</td><td>' + escapeHTML(product.season) + '</td><td><span class="admin-stock-total">' + product.stock + '</span></td><td><div class="admin-size-chip-grid">' + stockBySizeChipsHTML(product) + '</div></td><td><div class="admin-status-stack"><span class="admin-stock-badge ' + stockStatus.cls + '">' + stockStatus.label + '</span><span class="admin-active-badge ' + activeClass + '">' + active + '</span></div></td><td><div class="ek-row-action-group"><button class="btn-secondary admin-manage-stock" type="button" data-admin-stock="' + escapeHTML(product.id) + '"><i class="fa-solid fa-sliders"></i> Stock</button><button class="btn-secondary" type="button" data-admin-product-edit="' + escapeHTML(product.id) + '"><i class="fa-solid fa-pen-to-square"></i> Edit</button></div></td></tr>';
  }

  function updateAdminProductManagementRow(productId) {
    const product = productById(productId);
    if (!product) return;
    $$('[data-admin-product-row]').forEach((row) => {
      if (row.dataset.adminProductRow === product.id) row.outerHTML = adminProductManagementRow(product);
    });
    if (typeof ek2RenderAdminProductsTab === 'function') ek2RenderAdminProductsTab();
  }

  function adminProductFormHTML(product) {
    const isEdit = Boolean(product);
    const leagueOptions = [
      ['premier', 'Premier League'],
      ['laliga', 'La Liga'],
      ['seriea', 'Serie A'],
      ['bundesliga', 'Bundesliga'],
      ['ligue1', 'Ligue 1'],
      ['rest', 'Rest of the World']
    ].map(([key, label]) => '<option value="' + key + '"' + (product && product.leagueKey === key ? ' selected' : '') + '>' + label + '</option>').join('');
    return [
      '<form class="admin-product-form" data-admin-product-form data-product-id="' + escapeHTML(product ? product.id : '') + '">',
      '  <div class="account-form-grid">',
      '    <label>Team / Jersey<input class="input" name="team" maxlength="80" value="' + escapeHTML(product ? product.team : '') + '" required></label>',
      '    <label>Product Name<input class="input" name="product_name" maxlength="120" value="' + escapeHTML(product ? product.team : '') + '" required></label>',
      '    <label>League<select class="filter-select" name="league" required>' + leagueOptions + '</select></label>',
      '    <label>Season<input class="input" name="season" maxlength="40" value="' + escapeHTML(product ? product.season : '') + '"></label>',
      '    <label>Price<input class="input" name="base_price" type="number" min="0" step="0.01" value="' + escapeHTML(product ? product.price : '25') + '" required></label>',
      '    <label>Image Path / URL<input class="input" name="image_url" maxlength="500" value="' + escapeHTML(product ? product.image : '') + '"></label>',
      '  </div>',
      '  <p class="form-error" data-admin-product-error hidden></p>',
      '  <div class="modal-foot"><button class="btn-secondary" type="button" id="adminProductCancel">Cancel</button><button class="btn-action" type="submit"><i class="fa-solid fa-floppy-disk"></i> ' + (isEdit ? 'Save Product' : 'Create Product') + '</button></div>',
      '</form>'
    ].join('');
  }

  function openAdminProductForm(productId) {
    const product = productId ? productById(productId) : null;
    const modal = $('#msgModal');
    const title = $('#msgModalTitle');
    const body = $('#msgModalBody');
    const foot = modal ? $('.modal-foot', modal) : null;
    if (!modal || !body) return;
    if (title) title.textContent = product ? 'Edit Product' : 'Create Product';
    body.innerHTML = adminProductFormHTML(product);
    initPremiumSelects(body);
    if (foot) foot.hidden = true;
    modal.hidden = false;
    modal.classList.add('is-open');
  }

  function closeAdminProductForm() {
    const modal = $('#msgModal');
    const foot = modal ? $('.modal-foot', modal) : null;
    if (foot) foot.hidden = false;
    closeAdminModal(modal);
  }

  async function refreshAdminProductsFromBackend() {
    const prods = await BackendBridge.apiFetch('/admin/products');
    if (prods && prods.ok) {
      BackendBridge._serverProducts = prods.data.products || [];
      BackendBridge.setMem(STORAGE.stock, BackendBridge.backendProductsToStockMap(BackendBridge._serverProducts));
      applyBackendProductDetails(BackendBridge._serverProducts);
    }
  }

  function renderAdminDashboard() {
    const orders = readJSON(STORAGE.orders, []);
    const ratings = readJSON(STORAGE.ratings, []);
    const usersList = getRegisteredUsers();
    const overview = BackendBridge._adminOverview || {};
    const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
    const sold = orders.reduce((sum, order) => sum + orderQuantity(order), 0);
    const lowStock = PRODUCTS.filter((product) => product.stock > 0 && product.stock <= 3).length;
    const avgRating = ratings.length ? (ratings.reduce((sum, item) => sum + (Number(item.rating) || 0), 0) / ratings.length).toFixed(1) : '-';
    const setText = (id, value) => { const node = $('#' + id); if (node) node.textContent = value; };
    setText('kpiRevenue', money(overview.total_revenue != null ? Number(overview.total_revenue) : totalRevenue));
    setText('kpiOrders', String(overview.total_orders != null ? Number(overview.total_orders) : orders.length));
    setText('kpiUsers', String(overview.registered_users != null ? Number(overview.registered_users) : usersList.length));
    setText('kpiRating', overview.average_rating ? String(overview.average_rating) : avgRating);
    setText('kpiSold', String(overview.jerseys_sold != null ? Number(overview.jerseys_sold) : sold));
    setText('kpiLowStock', String(overview.low_stock_count != null ? Number(overview.low_stock_count) : lowStock));
    const recent = $('#recentOrdersBody');
    if (recent) recent.innerHTML = orders.slice(0, 5).map((order, index) => adminOrderRow(order, false, ratings, index)).join('') || '<tr><td colspan="7">&mdash;</td></tr>';
    const allOrders = $('#allOrdersBody');
    const filteredOrders = filteredAdminOrders(orders);
    if (allOrders) allOrders.innerHTML = filteredOrders.map((order) => adminOrderRow(order, true)).join('') || '<tr><td colspan="8">&mdash;</td></tr>';
    const ordersEmpty = $('#ordersEmpty');
    if (ordersEmpty) ordersEmpty.hidden = true;
    renderAdminUsers(usersList, orders);
    const stock = $('#stockBody');
    const filteredProducts = filteredAdminProducts(PRODUCTS).slice(0, 80);
    if (stock) stock.innerHTML = filteredProducts.map(adminProductManagementRow).join('') || '<tr><td colspan="7">&mdash;</td></tr>';
    const stockEmpty = $('#stockEmpty');
    if (stockEmpty) stockEmpty.hidden = true;
    const ratingsBody = $('#ratingsBody');
    if (ratingsBody) ratingsBody.innerHTML = ratings.map((rating, index) => adminRatingRow(rating, index, orders)).join('') || '<tr><td colspan="5">&mdash;</td></tr>';
    setText('ratingBig', avgRating);
    const ratingBreakdown = $('#ratingBreakdown');
    if (ratingBreakdown) {
      const roundedRating = Math.round(Number(avgRating) || 0);
      ratingBreakdown.innerHTML = '<div class="rating-stars" aria-label="Average rating stars">' + [1, 2, 3, 4, 5].map((star) => '<span class="' + (star <= roundedRating ? 'is-filled' : '') + '">&#9733;</span>').join('') + '</div>';
    }
    setText('ratingCount', ratings.length === 1 ? 'Based on 1 customer rating' : 'Based on ' + ratings.length + ' customer ratings');
    const messageItems = readJSON(STORAGE.messages, []);
    const filteredMessages = filteredAdminMessages(messageItems);
    updateAdminMessageBadge(messageItems);
    const messages = $('#messagesBody');
    if (messages) {
      messages.innerHTML = filteredMessages.map((message) => '<tr data-admin-message-row="' + escapeHTML(message.id || '') + '"><td>' + (message.read ? '' : '<span class="unread-dot"></span>') + '</td><td>' + escapeHTML((message.createdAt || '').slice(0, 10)) + '</td><td>' + escapeHTML(message.type || 'contact') + '</td><td>' + escapeHTML(message.name || '-') + '</td><td>' + escapeHTML(message.email || '-') + '</td><td>' + escapeHTML(message.subject || message.role || '-') + '</td><td>' + messageCvCellHTML(message) + '</td><td><div class="admin-message-actions"><button class="btn-secondary" type="button" data-admin-message="' + escapeHTML(message.id || '') + '">View</button><button class="btn-danger" type="button" data-admin-message-delete="' + escapeHTML(message.id || '') + '">Delete</button></div></td></tr>').join('') || '<tr><td colspan="8">&mdash;</td></tr>';
      const messagesEmpty = $('#messagesEmpty');
      if (messagesEmpty) messagesEmpty.hidden = true;
    }
    const topJerseys = $('#topJerseysBody');
    const chartData = buildAdminChartData(orders, ratings, usersList);
    if (topJerseys) {
      topJerseys.innerHTML = chartData.topProducts.map((row) => {
        const product = PRODUCTS.find((item) => item.team === row.label);
        return '<tr><td>' + escapeHTML(row.label) + '</td><td>' + escapeHTML(product ? product.league : '-') + '</td><td>' + row.value + '</td><td>' + money((product ? product.price : 25) * row.value) + '</td></tr>';
      }).join('') || '<tr><td colspan="4">&mdash;</td></tr>';
    }
    renderAdminBarChart('chartRevenueTrend', chartData.days, 'Revenue by weekday for the last 7 days.');
    renderAdminBarChart('chartStatusMix', chartData.statusRows, 'Orders grouped by fulfillment status.');
    renderAdminBarChart('chartLeagueSales', chartData.leagueRows, 'Units sold by league.');
    renderAdminBarChart('chartTopProducts', chartData.topProducts, 'Best-selling jersey quantities.');
    renderAdminBarChart('chartCustomerValue', chartData.customerRows, 'Customer spend from paid orders.');
    renderAdminBarChart('chartRatingSpread', chartData.ratingRows, 'Ratings collected after checkout.');
    renderAdminBarChart('chartInventoryRisk', chartData.riskRows, 'Products with stock of 3 or less by league.');
    initPremiumSelects();
  }

  function renderAdminUsers(usersList = getRegisteredUsers(), orders = readJSON(STORAGE.orders, [])) {
    const body = $('#usersBody');
    const empty = $('#usersEmpty');
    const search = normalizeText(($('#userSearch') || {}).value || '');
    if (!body) return;
    const filtered = search
      ? usersList.filter((user) => normalizeText((user.name || '') + ' ' + (user.email || '') + ' ' + (user.role || '')).includes(search))
      : usersList;
    body.innerHTML = filtered.map((user) => {
      const userOrders = orders.filter((order) => canonicalEmail(order.email) === user.email);
      const spent = userOrders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
      const action = userOrders.length ? '<button class="btn-secondary" type="button" data-admin-user="' + escapeHTML(user.email) + '">View orders</button>' : '&mdash;';
      return '<tr><td class="admin-user-main"><strong>' + escapeHTML(user.name || 'Customer') + '</strong><span>' + escapeHTML(user.email) + '</span></td><td><span class="admin-role-badge ' + (user.role === 'admin' ? 'is-admin' : 'is-user') + '">' + escapeHTML(user.role) + '</span></td><td>' + escapeHTML((user.createdAt || '').slice(0, 10) || '-') + '</td><td>' + escapeHTML((user.lastLoginAt || '').slice(0, 10) || '-') + '</td><td>' + userOrders.length + '</td><td>' + money(spent) + '</td><td>' + action + '</td></tr>';
    }).join('');
    if (empty) {
      const text = $('p', empty);
      if (text) text.textContent = usersList.length ? 'No matching users found.' : 'No users found.';
      empty.hidden = filtered.length > 0;
    }
  }

  function adminOrderRow(order, includeAction, ratings = [], orderIndex = -1) {
    const items = orderQuantity(order);
    const base = '<td>' + escapeHTML(order.id || '-') + '</td><td>' + escapeHTML(order.customer || 'Guest') + '</td><td>' + escapeHTML((order.createdAt || '').slice(0, 10)) + '</td><td>' + items + '</td><td>' + money(order.total || 0) + '</td>';
    if (!includeAction) return '<tr>' + base + '<td>' + escapeHTML(order.status || 'Confirmed') + '</td><td>' + adminRatingDisplay(ratingForOrder(order, ratings, orderIndex)) + '</td></tr>';
    return '<tr>' + base + '<td>' + escapeHTML(orderAddressText(order)) + '</td><td>' + escapeHTML(order.status || 'Confirmed') + '</td><td><button class="btn-secondary" type="button" data-admin-order="' + escapeHTML(order.id || '') + '">View</button></td></tr>';
  }

  function initBackToTop() {
    $$('#leagueBackTop').forEach((button) => {
      button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    });
  }

  function initGlobalActions() {
    document.addEventListener('click', async (event) => {
      const addButton = event.target.closest('[data-add-to-cart]');
      if (addButton) {
        event.preventDefault();
        if (!addButton.disabled) {
          const card = addButton.closest('[data-product-card]');
          addButton.disabled = true;
          try {
            await addToCart(addButton.dataset.productId, {}, card);
          } finally {
            const product = productById(addButton.dataset.productId);
            addButton.disabled = Boolean(product && product.stock <= 0);
          }
        }
        return;
      }
      const previewButton = event.target.closest('[data-product-preview]');
      if (previewButton) {
        event.preventDefault();
        openProductPreviewModal(previewButton.dataset.productId);
        return;
      }
      const wishlistButton = event.target.closest('[data-wishlist-toggle]');
      if (wishlistButton) {
        event.preventDefault();
        toggleWishlist(wishlistButton.dataset.productId);
        return;
      }
      const suggestion = event.target.closest('[data-suggestion]');
      if (suggestion) {
        const input = $('#teamSearch');
        if (input) {
          input.value = suggestion.dataset.suggestion || '';
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.focus();
        }
        const panel = $('#teamSuggestions');
        if (panel) panel.hidden = true;
        return;
      }
      const sizeButton = event.target.closest('[data-cart-size-button]');
      if (sizeButton) {
        updateCartConfiguration(sizeButton.dataset.lineId, { size: sizeButton.dataset.size });
        return;
      }
      const inc = event.target.closest('[data-cart-inc]');
      if (inc) {
        const item = getCart().find((entry) => entry.lineId === inc.dataset.lineId);
        if (item) updateCartQuantity(item.lineId, item.quantity + 1);
        return;
      }
      const dec = event.target.closest('[data-cart-dec]');
      if (dec) {
        const item = getCart().find((entry) => entry.lineId === dec.dataset.lineId);
        if (item) updateCartQuantity(item.lineId, item.quantity - 1);
        return;
      }
      const remove = event.target.closest('[data-cart-remove]');
      if (remove) {
        removeFromCart(remove.dataset.lineId);
      }
    });
    document.addEventListener('change', (event) => {
      const size = event.target.closest('[data-cart-size]');
      if (size) {
        updateCartConfiguration(size.dataset.lineId, { size: size.value });
        return;
      }
      const personalize = event.target.closest('[data-cart-personalize]');
      if (personalize) {
        updateCartConfiguration(personalize.dataset.lineId, { personalize: personalize.checked });
        return;
      }
      const name = event.target.closest('[data-cart-name]');
      if (name) {
        updateCartConfiguration(name.dataset.lineId, { customName: name.value });
        return;
      }
      const number = event.target.closest('[data-cart-number]');
      if (number) {
        updateCartConfiguration(number.dataset.lineId, { customNumber: number.value });
      }
    });
  }

  async function init() {
    // 1) Migrate any leftover legacy localStorage data (cart/wishlist) into the backend.
    try { await BackendBridge.migrateLegacyLocalStorage(); } catch (e) {}
    // 2) Hydrate the in-memory cache from the backend so every readJSON() call below works synchronously.
    try { await BackendBridge.hydrate(); } catch (e) {}
    // 3) Sync product details and stock from backend into the in-memory PRODUCTS list.
    applyBackendProductDetails(BackendBridge._serverProducts || []);
    applyStockOverrides();

    await handleSessionNavigation();
    initInternalNavigationTracking();
    initGlobalActions();
    initNavbar();
    initHomePage();
    initLeaguePages();
    initCartPage();
    initWishlistPage();
    initAuthPage();
    initCareersPage();
    initContactPage();
    initSizeGuidePage();
    initPaymentPage();
    initSpinWheelPage();
    initAdminPage();
    initFloatingActions();
    initBackToTop();
    updateCartCount();
    updateWishlistCount();
    initPremiumSelects();
  }

  let eliteKitsInitPromise = null;
  document.addEventListener('DOMContentLoaded', () => {
    eliteKitsInitPromise = init();
  });


  /* =====================================================================
     ELITE KITS APP UPGRADE LAYER (v2)
     Lives inside the same IIFE so it can call private helpers (showToast,
     readJSON, writeJSON, STORAGE, PRODUCTS, etc).

     Sections (search "// ek2." to jump):
       ek2.toast      Premium toast queue (overrides showToast)
       ek2.assistant  Contextual mini shopping assistant
       ek2.password   Password strength meter
       ek2.validate   Real-time validation upgrades for forms
       ek2.admin      New admin sections + order status workflow
       ek2.account    Account.html page logic
       ek2.nav        Adds "Account" link for signed-in users
       ek2.boot       Bootstraps everything after init() runs
  ===================================================================== */

  // ---------- ek2.toast ------------------------------------------------
  const EK2_TOAST_TIMEOUT = 3200;
  const EK2_TOAST_MAX = 4;
  const EK2_TOAST_ICON = {
    success: 'fa-circle-check',
    error: 'fa-circle-exclamation',
    warning: 'fa-triangle-exclamation',
    info: 'fa-circle-info'
  };
  const EK2_TOAST_TITLE = {
    success: 'Success',
    error: 'Heads up',
    warning: 'Almost there',
    info: 'Info'
  };

  function ek2EnsureToastStack() {
    let stack = document.getElementById('ek2ToastStack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'ek2ToastStack';
      stack.className = 'ek-toast-stack';
      stack.setAttribute('role', 'region');
      stack.setAttribute('aria-label', 'Notifications');
      document.body.appendChild(stack);
    }
    document.body.classList.add('has-toast-stack');
    return stack;
  }

  function ek2HideToast(node) {
    if (!node || !node.parentNode) return;
    node.classList.add('is-leaving');
    node.classList.remove('is-visible');
    window.setTimeout(() => {
      if (node.parentNode) node.parentNode.removeChild(node);
    }, 240);
  }

  function ek2Toast(message, type, options) {
    const opts = options || {};
    const t = String(type || 'success').toLowerCase();
    const safeType = ['success', 'error', 'warning', 'info'].indexOf(t) >= 0 ? t : 'success';
    const stack = ek2EnsureToastStack();
    while (stack.children.length >= EK2_TOAST_MAX) {
      ek2HideToast(stack.firstChild);
    }
    const node = document.createElement('div');
    node.className = 'ek-toast';
    node.setAttribute('data-type', safeType);
    node.setAttribute('role', safeType === 'error' ? 'alert' : 'status');
    const title = opts.title || EK2_TOAST_TITLE[safeType] || 'Notice';
    const iconClass = opts.icon || EK2_TOAST_ICON[safeType] || 'fa-circle-check';
    node.innerHTML = [
      '<div class="ek-toast-icon"><i class="fa-solid ' + iconClass + '"></i></div>',
      '<div class="ek-toast-body"><div class="ek-toast-title">' + escapeHTML(title) + '</div><div class="ek-toast-msg">' + escapeHTML(String(message || '')) + '</div></div>',
      '<button class="ek-toast-close" type="button" aria-label="Dismiss"><i class="fa-solid fa-xmark"></i></button>'
    ].join('');
    stack.appendChild(node);
    window.requestAnimationFrame(() => node.classList.add('is-visible'));
    const closeBtn = node.querySelector('.ek-toast-close');
    if (closeBtn) closeBtn.addEventListener('click', () => ek2HideToast(node));
    const timeout = opts.duration || EK2_TOAST_TIMEOUT;
    window.setTimeout(() => ek2HideToast(node), timeout);
    return node;
  }

  // override the existing showToast to route through the new queue
  showToast = function (message, type, options) {
    return ek2Toast(message, type, options);
  };

  // ---------- ek2.password --------------------------------------------
  function ek2PasswordRules(password) {
    const value = String(password || '');
    return {
      length: value.length >= 8,
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      number: /\d/.test(value),
      special: /[^A-Za-z0-9]/.test(value)
    };
  }

  function ek2PasswordStrength(password) {
    const rules = ek2PasswordRules(password);
    const passed = ['length', 'upper', 'lower', 'number', 'special'].filter((k) => rules[k]).length;
    if (!password) return 0;
    if (passed <= 2) return 1;
    if (passed === 3) return 2;
    if (passed === 4) return 3;
    return 4;
  }

  function ek2EnsurePasswordMeter(input) {
    if (!input) return null;
    let meter = input.parentNode && input.parentNode.parentNode ? input.parentNode.parentNode.querySelector('.ek-pw-meter[data-for="' + input.id + '"]') : null;
    if (meter) return meter;
    meter = document.createElement('div');
    meter.className = 'ek-pw-meter';
    meter.dataset.for = input.id;
    meter.dataset.strength = '0';
    meter.innerHTML = [
      '<div class="ek-pw-meter-bar"><span class="ek-pw-meter-fill"></span></div>',
      '<div class="ek-pw-meter-label"><span data-pw-label>Password strength</span><span data-pw-strength>—</span></div>',
      '<ul class="ek-pw-meter-rules">',
      '<li data-pw-rule="length"><i class="fa-regular fa-circle"></i> 8+ characters</li>',
      '<li data-pw-rule="upper"><i class="fa-regular fa-circle"></i> Uppercase letter</li>',
      '<li data-pw-rule="lower"><i class="fa-regular fa-circle"></i> Lowercase letter</li>',
      '<li data-pw-rule="number"><i class="fa-regular fa-circle"></i> Number</li>',
      '<li data-pw-rule="special"><i class="fa-regular fa-circle"></i> Special character</li>',
      '</ul>'
    ].join('');
    const wrap = input.closest('.input-wrap') || input.parentNode;
    if (wrap && wrap.parentNode) wrap.parentNode.insertBefore(meter, wrap.nextSibling);
    return meter;
  }

  function ek2UpdatePasswordMeter(input) {
    const meter = ek2EnsurePasswordMeter(input);
    if (!meter) return;
    const value = input.value || '';
    const strength = ek2PasswordStrength(value);
    const rules = ek2PasswordRules(value);
    meter.dataset.strength = String(strength);
    const labels = ['Too short', 'Weak', 'Fair', 'Strong', 'Excellent'];
    const labelNode = meter.querySelector('[data-pw-strength]');
    if (labelNode) labelNode.textContent = value ? labels[strength] : '—';
    meter.querySelectorAll('[data-pw-rule]').forEach((node) => {
      const rule = node.dataset.pwRule;
      const met = Boolean(rules[rule]);
      node.classList.toggle('is-met', met);
      const icon = node.querySelector('i');
      if (icon) icon.className = met ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle';
    });
  }

  // ---------- ek2.validate --------------------------------------------
  function ek2EnsureFieldTick(input) {
    if (!input) return null;
    const wrap = input.closest('.input-wrap') || input.parentNode;
    if (!wrap) return null;
    if (!wrap.classList.contains('input-wrap')) wrap.classList.add('ek-field-input-wrap');
    // remove any previously-rendered floating tick (we now rely on the input's
    // green border + green focus ring instead of a separate check icon)
    const oldTick = wrap.querySelector('.ek-field-tick');
    if (oldTick) oldTick.remove();
    return wrap;
  }

  function ek2SetFieldState(input, valid, opts) {
    if (!input) return;
    const wrap = ek2EnsureFieldTick(input);
    const o = opts || {};
    if (valid === true) {
      input.classList.add('is-ek-valid');
      input.classList.remove('is-ek-invalid');
      if (wrap) wrap.classList.add('is-valid');
    } else if (valid === false) {
      input.classList.add('is-ek-invalid');
      input.classList.remove('is-ek-valid');
      if (wrap) wrap.classList.remove('is-valid');
    } else {
      input.classList.remove('is-ek-valid', 'is-ek-invalid');
      if (wrap) wrap.classList.remove('is-valid');
    }
    let errNode = null;
    if (o.errorTargetId) errNode = document.getElementById(o.errorTargetId);
    if (errNode) {
      if (valid === false && o.message) {
        errNode.textContent = o.message;
        errNode.hidden = false;
      } else if (valid === true || !o.message) {
        errNode.textContent = '';
        errNode.hidden = true;
      }
    }
  }

  function ek2WireRealtimeValidation(form, fields, onChangeCb) {
    if (!form) return;
    const evaluate = () => {
      let allValid = true;
      fields.forEach((spec) => {
        const input = form.querySelector(spec.selector);
        if (!input) { if (spec.required) allValid = false; return; }
        const value = String(input.value || '');
        const empty = value.trim() === '';
        let valid = null;
        let message = '';
        if (empty) {
          valid = null;
        } else {
          const result = spec.validator(value, input);
          if (result === true) {
            valid = true;
          } else {
            valid = false;
            message = String(result || spec.errorMessage || 'Invalid value.');
          }
        }
        ek2SetFieldState(input, valid, { errorTargetId: spec.errorTargetId, message });
        if (spec.required && valid !== true) allValid = false;
      });
      if (typeof onChangeCb === 'function') onChangeCb(allValid);
    };
    fields.forEach((spec) => {
      const input = form.querySelector(spec.selector);
      if (!input) return;
      input.addEventListener('input', evaluate);
      input.addEventListener('change', evaluate);
      input.addEventListener('blur', evaluate);
    });
    evaluate();
  }

  function ek2BindLoadingButton(form, button, durationMs) {
    if (!form || !button) return;
    form.addEventListener('submit', () => {
      const original = button.innerHTML;
      button.classList.add('ek-btn-loading');
      button.disabled = true;
      window.setTimeout(() => {
        button.classList.remove('ek-btn-loading');
        button.disabled = false;
        button.innerHTML = original;
      }, durationMs || 900);
    });
  }

  function ek2InitAuthValidation() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
      const submitBtn = signupForm.querySelector('button[type="submit"]');
      const passwordInput = document.getElementById('signupPassword');
      if (passwordInput) {
        ek2EnsurePasswordMeter(passwordInput);
        ek2UpdatePasswordMeter(passwordInput);
        passwordInput.addEventListener('input', () => ek2UpdatePasswordMeter(passwordInput));
      }
      ek2WireRealtimeValidation(signupForm, [
        { selector: '#name',          required: true, validator: (v) => isValidName(v) || 'Use letters only, at least 2 characters.' },
        { selector: '#signupEmail',   required: true, validator: (v) => isValidEmail(v) || 'Enter a valid email address.' },
        { selector: '#birthdate',     required: true, validator: (v) => { const m = birthdateValidationMessage(v); return m ? m : true; } },
        { selector: '#signupPassword',required: true, validator: (v) => { const m = passwordValidationMessage(v); return m ? m : true; } },
        { selector: '#confirm',       required: true, validator: (v) => (v && v === (document.getElementById('signupPassword') || {}).value) ? true : 'Passwords must match.' }
      ], (allValid) => { if (submitBtn) submitBtn.disabled = !allValid; });
      if (submitBtn) ek2BindLoadingButton(signupForm, submitBtn, 800);
    }
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
      const submitBtn = signinForm.querySelector('button[type="submit"]');
      ek2WireRealtimeValidation(signinForm, [
        { selector: '#email',    required: true, validator: (v) => isValidEmail(v) || 'Enter a valid email address.' },
        { selector: '#password', required: true, validator: (v) => v.length >= 1 || 'Enter your password.' }
      ], (allValid) => { if (submitBtn) submitBtn.disabled = !allValid; });
      if (submitBtn) ek2BindLoadingButton(signinForm, submitBtn, 700);
    }
  }

  function ek2InitCvUpload() {
    const input = document.getElementById('cf-cv');
    if (!input) return;
    const trigger = document.getElementById('ek2CvTrigger');
    const nameLabel = document.getElementById('ek2CvName');
    const clearBtn = document.getElementById('ek2CvClear');
    const helper = document.getElementById('ek2CvHelper');
    const errorBox = document.getElementById('cvError');
    const MAX_BYTES = 5 * 1024 * 1024;
    const ACCEPTED = ['pdf', 'docx'];
    const CV_ERROR_MSG = 'CV must be a PDF or Word document (.docx), max 5 MB.';
    const setError = (msg) => {
      if (!errorBox) return;
      if (msg) { errorBox.textContent = msg; errorBox.hidden = false; }
      else { errorBox.textContent = ''; errorBox.hidden = true; }
    };
    const showFile = (file) => {
      if (!file) {
        if (nameLabel) { nameLabel.textContent = ''; nameLabel.hidden = true; }
        if (helper) helper.hidden = false;
        if (clearBtn) clearBtn.hidden = true;
        return;
      }
      if (nameLabel) {
        nameLabel.innerHTML = '<i class="fa-solid fa-file-lines"></i><span>' + escapeHTML(file.name) + '</span><small>' + (Math.max(1, Math.round(file.size / 1024))) + ' KB</small>';
        nameLabel.hidden = false;
      }
      if (helper) helper.hidden = true;
      if (clearBtn) clearBtn.hidden = false;
    };
    showFile(null);
    if (trigger) {
      trigger.addEventListener('click', (e) => { e.preventDefault(); input.click(); });
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); }
      });
    }
    input.addEventListener('change', () => {
      setError('');
      const file = input.files && input.files[0];
      if (!file) { showFile(null); return; }
      const ext = (file.name.split('.').pop() || '').toLowerCase();
      if (ACCEPTED.indexOf(ext) === -1) {
        setError(CV_ERROR_MSG);
        input.value = '';
        showFile(null);
        return;
      }
      if (file.size > MAX_BYTES) {
        setError(CV_ERROR_MSG);
        input.value = '';
        showFile(null);
        return;
      }
      showFile(file);
    });
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        input.value = '';
        setError('');
        showFile(null);
      });
    }
  }

  function ek2InitContactValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const submitBtn = form.querySelector('button[type="submit"]');
    ek2WireRealtimeValidation(form, [
      { selector: '#cf-name',    required: true, validator: (v) => isValidName(v) || 'Use letters, 2+ characters.' },
      { selector: '#cf-email',   required: true, validator: (v) => isValidEmail(v) || 'Enter a valid email address.' },
      { selector: '#cf-subject', required: true, validator: (v) => v.trim().length > 0 || 'Choose a subject.' },
      { selector: '#cf-message', required: true, validator: (v) => v.trim().length >= 10 || 'Please write at least 10 characters.' }
    ], (allValid) => { if (submitBtn) submitBtn.disabled = !allValid; });
    if (submitBtn) ek2BindLoadingButton(form, submitBtn, 700);
  }

  function ek2InitPaymentValidation() {
    const form = document.querySelector('.payment-form');
    if (!form) return;
    const submitBtn = form.querySelector('.btn-pay');
    ek2WireRealtimeValidation(form, [
      { selector: '#name',    required: true, validator: (v) => isValidName(v) || 'Cardholder name uses letters.' },
      { selector: '#email',   required: true, validator: (v) => isValidEmail(v) || 'Enter a valid email.' },
      { selector: '#card',    required: true, validator: (v) => { const digits = normalizedCardDigits(v); if (digits.length !== 16) return 'Card must be 16 digits.'; if (!isValidCardNumberLuhn(v)) return 'Card number failed Luhn check.'; return true; } },
      { selector: '#expiry',  required: true, validator: (v) => isValidExpiry(v) || 'Use MM/YY in the future.' },
      { selector: '#cvv',     required: true, validator: (v) => isValidCVV(v) || 'CVV must be 3 digits.' },
      { selector: '#lbState', required: true, validator: (v) => v.trim().length > 0 || 'Choose a governorate.' },
      { selector: '#city',    required: true, validator: (v) => isValidCity(v) || 'Enter a valid city.' },
      { selector: '#road',    required: true, validator: (v) => isValidRoad(v) || 'Enter a road or street.' }
    ], (allValid) => { if (submitBtn) submitBtn.disabled = !allValid; });
    if (submitBtn) ek2BindLoadingButton(form, submitBtn, 1100);
  }

  // ---------- ek2.assistant ------------------------------------------
  function ek2AssistantContext() {
    const file = currentPageFile();
    if (file === 'cart.html') {
      const cart = getCart();
      const missingSize = cart.filter((i) => !i.size).length;
      if (missingSize) return { tip: 'You still need to select a size for ' + missingSize + ' item' + (missingSize === 1 ? '' : 's') + '.', cta: 'Help me pick a size', action: 'sizing' };
      if (!cart.length) return { tip: 'Your cart is empty. Add a kit then come back to check out faster.', cta: 'Browse jerseys', action: 'browse' };
      return { tip: 'Cart looks good. Apply your spin coupon at checkout for extra savings.', cta: 'Open delivery info', action: 'delivery' };
    }
    if (file === 'wishlist.html') {
      const wl = getWishlist().length;
      return { tip: wl ? 'You have ' + wl + ' saved kit' + (wl === 1 ? '' : 's') + '. Want help picking a size?' : 'Your wishlist is empty. Save your favorites for later.', cta: 'Open Size Guide', action: 'sizing' };
    }
    if (file === 'size guide.html' || file === 'size%20guide.html') {
      return { tip: 'Enter your chest size and I\'ll suggest a fit on the Size Finder above.', cta: 'How do I measure?', action: 'sizing-measure' };
    }
    if (file === 'contact us.html' || file === 'contact%20us.html') {
      return { tip: 'Do you want support or career application help?', cta: 'I want to apply', action: 'careers' };
    }
    if (file === 'payment.html') {
      return { tip: 'Securing checkout. Personalization adds $5 per jersey. Coupons apply automatically.', cta: 'See delivery info', action: 'delivery' };
    }
    if (file === 'admin.html') {
      return { tip: 'Admin tools: change order status, adjust stock, and review applications from the sidebar.', cta: 'Open analytics', action: 'analytics' };
    }
    if (file === 'account.html') {
      return { tip: 'Your dashboard. Track orders, manage your wishlist, and check your active coupon.', cta: 'View my orders', action: 'account-orders' };
    }
    if (/^(premier league|laliga|serie a|bundesliga|league 1|rest of the world)\.html$/i.test(decodeURIComponent(file))) {
      return { tip: 'Want to filter only in-stock kits? Use the Stock filter at the top of the grid.', cta: 'Best kits today', action: 'best' };
    }
    return { tip: 'Hi! I can help with sizing, delivery, customization, and returns.', cta: 'Best kits today', action: 'best' };
  }

  function ek2AssistantAnswer(action) {
    switch (action) {
      case 'sizing':
        return 'Check the <a href="Size Guide.html">Size Guide</a> for chest measurements and a quick fit finder.';
      case 'sizing-measure':
        return 'Wrap a soft tape around the fullest part of your chest, keep it level, and breathe normally. Match the cm range on the table to your size.';
      case 'delivery':
        return 'Local delivery is $5 per order and arrives in 2-5 working days. Free delivery rewards apply automatically when found via the Spin Wheel.';
      case 'customization':
        return 'Open your <a href="Cart.html">Cart</a>, tick "Personalize" on a jersey, and add an optional name and number (max 99). Customization adds $5 per jersey.';
      case 'best':
        return 'Try the latest <a href="Premier League.html">Premier League</a>, <a href="Laliga.html">La Liga</a>, or <a href="Serie A.html">Serie A</a> kits. Use the Sort dropdown to see Most Popular.';
      case 'browse':
        return 'Open <a href="Home.html">Home</a> and pick a league from the Shop by League grid.';
      case 'order':
        return 'Sign in and open <a href="Account.html">My Account</a> to view your orders and statuses.';
      case 'account-orders':
        return 'Click "My Orders" in the sidebar of <a href="Account.html">My Account</a> to see status and items for every order.';
      case 'careers':
        return 'Pick a role on the <a href="Careers.html">Careers</a> page and the Apply button opens the Contact form in application mode.';
      case 'returns':
        return 'Returns are available for eligible non-customized jerseys within the stated return window. Reach out via the Contact page to start a return.';
      case 'analytics':
        return 'Open the Analytics tab in the admin sidebar for revenue by league, top-selling kits, average order value, and stock risk.';
      default:
        return 'We will contact you within 24-48 hours.';
    }
  }

  function ek2InitContextualAssistant() {
    const widget = document.getElementById('assistantWidget');
    if (!widget) return;
    const body = widget.querySelector('.assistant-body');
    if (!body) return;
    const intro = body.querySelector('.assistant-intro');
    const oldQuestions = body.querySelector('.assistant-questions');
    const ctx = ek2AssistantContext();

    // build context tip
    let tip = body.querySelector('.assistant-context-tip');
    if (!tip) {
      tip = document.createElement('div');
      tip.className = 'assistant-context-tip';
      body.insertBefore(tip, intro || body.firstChild);
    }
    tip.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i><span>' + escapeHTML(ctx.tip) + '</span>';

    // build quick action grid (always 5 actions)
    let quickGrid = body.querySelector('.assistant-quick-grid');
    if (!quickGrid) {
      quickGrid = document.createElement('div');
      quickGrid.className = 'assistant-quick-grid';
      const insertBefore = oldQuestions || body.querySelector('.assistant-answer') || body.querySelector('.assistant-custom');
      if (insertBefore) body.insertBefore(quickGrid, insertBefore);
      else body.appendChild(quickGrid);
    }
    const actions = [
      { key: 'sizing',        icon: 'fa-ruler',         label: 'Find my size' },
      { key: 'order',         icon: 'fa-truck-fast',    label: 'Track my order' },
      { key: ctx.action,      icon: 'fa-bolt',          label: ctx.cta },
      { key: 'delivery',      icon: 'fa-box',           label: 'Delivery info' },
      { key: 'customization', icon: 'fa-shirt',         label: 'Customization help' }
    ];
    quickGrid.innerHTML = actions.map((a, idx) => '<button type="button" class="assistant-quick" data-ek2-quick="' + escapeHTML(a.key) + '" data-quick-index="' + idx + '"><i class="fa-solid ' + escapeHTML(a.icon) + '"></i><span>' + escapeHTML(a.label) + '</span></button>').join('');

    // hide the legacy 4-button question row (we replaced it)
    if (oldQuestions) oldQuestions.style.display = 'none';

    // build bubbles container right above input
    const customRow = body.querySelector('.assistant-custom');
    let bubbles = body.querySelector('.assistant-bubbles');
    if (!bubbles) {
      bubbles = document.createElement('div');
      bubbles.className = 'assistant-bubbles';
      if (customRow) body.insertBefore(bubbles, customRow);
      else body.appendChild(bubbles);
    }
    bubbles.innerHTML = '';

    // hide the legacy single-line answer
    const oldAnswer = document.getElementById('assistantAnswer');
    if (oldAnswer) oldAnswer.hidden = true;

    const pushBubble = (html, isUser) => {
      const b = document.createElement('div');
      b.className = 'assistant-bubble' + (isUser ? ' is-user' : '');
      b.innerHTML = html;
      bubbles.appendChild(b);
      bubbles.parentNode.scrollTop = bubbles.parentNode.scrollHeight;
    };

    quickGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-ek2-quick]');
      if (!btn) return;
      const action = btn.dataset.ek2Quick;
      pushBubble(escapeHTML(btn.textContent.trim()), true);
      pushBubble(ek2AssistantAnswer(action), false);
    });

    // override Ask button to push bubbles
    const askBtn = document.getElementById('assistantAsk');
    const input = document.getElementById('assistantInput');
    if (askBtn && input) {
      const newAsk = askBtn.cloneNode(true);
      askBtn.parentNode.replaceChild(newAsk, askBtn);
      const newInput = input.cloneNode(true);
      input.parentNode.replaceChild(newInput, input);
      newInput.placeholder = 'Type your question...';
      newAsk.addEventListener('click', () => {
        const q = String(newInput.value || '').trim();
        if (!q) return;
        pushBubble(escapeHTML(q), true);
        const norm = normalizeText(q);
        let action = '';
        if (/(size|fit)/.test(norm)) action = 'sizing';
        else if (/(deliver|ship|track)/.test(norm)) action = norm.includes('track') ? 'order' : 'delivery';
        else if (/(custom|name|number)/.test(norm)) action = 'customization';
        else if (/(return|exchange|refund)/.test(norm)) action = 'returns';
        else if (/(career|job|apply)/.test(norm)) action = 'careers';
        else if (/(account|orders?)/.test(norm)) action = 'order';
        else if (/(best|popular|top)/.test(norm)) action = 'best';
        pushBubble(action ? ek2AssistantAnswer(action) : ek2AssistantAnswer(''), false);
        newInput.value = '';
      });
      newInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); newAsk.click(); }
      });
    }
  }

  // ---------- ek2.nav -------------------------------------------------
  function ek2ComputeInitials(session) {
    const stored = BackendBridge.getMem(STORAGE.user, null) || {};
    const rawName = String((stored && stored.name) || (session && session.name) || '').trim();
    if (rawName) {
      const parts = rawName.split(/\s+/).filter(Boolean);
      if (parts.length >= 2) {
        return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
      }
      const w = parts[0] || '';
      if (w.length >= 2) return (w.charAt(0).toUpperCase() + w.charAt(1).toLowerCase());
      if (w.length === 1) return w.charAt(0).toUpperCase();
    }
    const email = String((session && session.email) || '');
    const prefix = email.split('@')[0] || '';
    if (prefix.length >= 2) return (prefix.charAt(0).toUpperCase() + prefix.charAt(1).toLowerCase());
    if (prefix.length === 1) return prefix.charAt(0).toUpperCase();
    return 'EK';
  }

  function ek2InjectAccountNavLink() {
    if (document.body.classList.contains('admin-page')) return;
    if (document.body.classList.contains('auth-page')) return;
    const session = getCurrentSession();
    // always remove any old account button first (so guest state is clean)
    document.querySelectorAll('.nav-actions #accountBtn, .nav-actions #accountInitialsBtn').forEach((node) => node.remove());
    if (!session || session.role !== 'user') return;
    const initials = ek2ComputeInitials(session);
    const stored = BackendBridge.getMem(STORAGE.user, null) || {};
    const fullName = String((stored && stored.name) || session.name || session.email || 'My Account');
    document.querySelectorAll('.nav-actions').forEach((actions) => {
      if (actions.querySelector('#accountInitialsBtn')) return;
      const btn = document.createElement('a');
      btn.href = 'Account.html';
      btn.className = 'ek-profile-btn';
      btn.id = 'accountInitialsBtn';
      btn.title = fullName;
      btn.setAttribute('aria-label', 'Open ' + fullName + ' account');
      btn.textContent = initials;
      // append at the end so order becomes: wishlist, cart, logout, profile
      actions.appendChild(btn);
    });
  }

  // also extend safe redirect to allow Account.html
  const _ek2OrigGetSafe = getSafeLoginRedirect;
  getSafeLoginRedirect = function () {
    const target = String(localStorage.getItem(STORAGE.redirect) || '').trim();
    if (/^Account\.html$/i.test(target)) return 'Account.html';
    return _ek2OrigGetSafe();
  };

  // ---------- ek2.account --------------------------------------------
  function ek2InitAccountPage() {
    if (!document.body.classList.contains('account-page')) return;
    if (!isSignedIn()) {
      localStorage.setItem(STORAGE.redirect, 'Account.html');
      markInternalNavigation();
      redirectWithinSite('Auth.html?mode=signin&redirect=Account.html');
      return;
    }
    ek2RenderAccount();
    // tabs
    const onTabClick = (e) => {
      const btn = e.target.closest('[data-account-tab]');
      if (!btn) return;
      const key = btn.dataset.accountTab;
      document.querySelectorAll('[data-account-tab]').forEach((t) => t.classList.toggle('is-active', t.dataset.accountTab === key));
      document.querySelectorAll('.account-panel').forEach((p) => p.classList.toggle('is-active', p.id === 'account-panel-' + key));
    };
    document.addEventListener('click', onTabClick);
    const logout = document.getElementById('accountLogout');
    if (logout) {
      logout.addEventListener('click', () => {
        setUser(null);
        showToast('You have been signed out.', 'info');
        markInternalNavigation();
        window.setTimeout(() => redirectWithinSite('Home.html'), 300);
      });
    }
  }

  function ek2OrdersForCurrentUser() {
    const session = getCurrentSession();
    if (!session) return [];
    const orders = readJSON(STORAGE.orders, []);
    const myEmail = canonicalEmail(session.email);
    return orders.filter((o) => canonicalEmail(o.email) === myEmail);
  }

  let ek2ProfileMode = '';

  function ek2PhoneValid(value) {
    const phone = String(value || '').trim();
    return !phone || /^[0-9+()\-\s]{6,25}$/.test(phone);
  }

  function ek2RenderAccountProfileForms(user) {
    const wrap = document.querySelector('[data-profile-forms]');
    if (!wrap) return;
    if (ek2ProfileMode === 'profile') {
      const currentCountry = (user.phoneCountryCode || DEFAULT_PHONE_COUNTRY).toUpperCase();
      const sortedCountries = PHONE_COUNTRIES.slice().sort((a, b) => a.name.localeCompare(b.name));
      const countryOptions = sortedCountries.map((c) => {
        const selected = c.code === currentCountry ? ' selected' : '';
        return '<option value="' + c.code + '" data-dial="' + c.dial + '" data-iso="' + c.code + '"' + selected + ' aria-label="' + escapeHTML(c.name + ' ' + c.dial) + '">' + escapeHTML(phoneCountryOptionLabel(c)) + '</option>';
      }).join('');
      const currentRule = phoneCountryByCode(currentCountry) || phoneCountryByCode(DEFAULT_PHONE_COUNTRY);
      wrap.innerHTML = [
        '<form class="account-edit-card" data-profile-form>',
        '  <div class="account-form-head"><h3>Edit Profile</h3><button type="button" class="ek-mini-btn" data-profile-cancel><i class="fa-solid fa-xmark"></i> Cancel</button></div>',
        '  <div class="account-form-grid">',
        '    <label>Full Name<input class="input" name="name" type="text" maxlength="50" value="' + escapeHTML(user.name || '') + '" required></label>',
        '    <label>Birthdate<input class="input" name="birthdate" type="date" value="' + escapeHTML(user.birthdate || '') + '"></label>',
        '    <label class="account-form-phone">Phone',
        '      <div class="phone-input-grid">',
        '        <div class="phone-country-control">',
        '          ' + phoneFlagMarkup(currentRule, 'data-account-phone-flag'),
        '          <select class="input phone-country-select" name="phone_country_code" data-account-phone-country>' + countryOptions + '</select>',
        '          <span class="phone-dial-code" data-account-phone-dial>' + (currentRule ? currentRule.dial : '+961') + '</span>',
        '        </div>',
        '        <input class="input phone-number-input" name="phone_national" type="tel" inputmode="tel" maxlength="20" placeholder="' + escapeHTML(samplePhonePlaceholder(currentRule)) + '" value="' + escapeHTML(user.phoneNational || '') + '">',
        '      </div>',
        '    </label>',
        '  </div>',
        '  <p class="form-error" data-profile-error hidden></p>',
        '  <div class="account-form-actions"><button class="ek-mini-btn is-primary" type="submit"><i class="fa-solid fa-floppy-disk"></i> Save Changes</button></div>',
        '</form>'
      ].join('');
      // Wire country change to flag/dial sync (no inline JS, attached programmatically)
      const formNode = wrap.querySelector('[data-profile-form]');
      if (formNode) {
        const countrySelect = formNode.querySelector('[data-account-phone-country]');
        const flagEl = formNode.querySelector('[data-account-phone-flag]');
        const dialEl = formNode.querySelector('[data-account-phone-dial]');
        const numberInput = formNode.querySelector('input[name="phone_national"]');
        if (countrySelect) {
          countrySelect.addEventListener('change', () => {
            const rule = phoneCountryByCode(countrySelect.value);
            if (!rule) return;
            syncPhoneFlag(flagEl, rule);
            if (dialEl) dialEl.textContent = rule.dial;
            if (numberInput) numberInput.setAttribute('placeholder', samplePhonePlaceholder(rule));
          });
          syncPhoneFlag(flagEl, currentRule);
        }
      }
      return;
    }
    if (ek2ProfileMode === 'password') {
      wrap.innerHTML = [
        '<form class="account-edit-card" data-password-form>',
        '  <div class="account-form-head"><h3>Change Password</h3><button type="button" class="ek-mini-btn" data-profile-cancel><i class="fa-solid fa-xmark"></i> Cancel</button></div>',
        '  <div class="account-form-grid">',
        '    <label>Current Password<input class="input" name="current_password" type="password" autocomplete="current-password" required></label>',
        '    <label>New Password<input class="input" name="new_password" type="password" autocomplete="new-password" required></label>',
        '    <label>Confirm Password<input class="input" name="confirm_password" type="password" autocomplete="new-password" required></label>',
        '  </div>',
        '  <p class="form-error" data-password-error hidden></p>',
        '  <div class="account-form-actions"><button class="ek-mini-btn is-primary" type="submit"><i class="fa-solid fa-key"></i> Update Password</button></div>',
        '</form>'
      ].join('');
      decoratePasswordInputsWithEye(wrap);
      return;
    }
    wrap.innerHTML = [
      '<div class="account-profile-actions">',
      '  <button class="ek-mini-btn" type="button" data-password-edit><i class="fa-solid fa-key"></i> Change Password</button>',
      '  <button class="ek-mini-btn is-danger account-delete-btn" type="button" data-account-delete><i class="fa-solid fa-user-xmark"></i> Delete Account</button>',
      '</div>'
    ].join('');
  }

  function ek2UpdateBackendUser(user) {
    const u = BackendBridge.backendUserToLocal(user);
    if (!u) return;
    BackendBridge.setMem(STORAGE.user, u);
    BackendBridge.setMem(STORAGE.session, {
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      createdAt: u.createdAt || '',
      lastLoginAt: u.lastLoginAt || '',
      birthdate: u.birthdate || '',
      phone: u.phone || '',
      phoneCountry: u.phoneCountry || '',
      phoneCountryCode: u.phoneCountryCode || '',
      phoneDialCode: u.phoneDialCode || '',
      phoneNational: u.phoneNational || '',
      phoneE164: u.phoneE164 || '',
      signedInAt: new Date().toISOString()
    });
  }

  function ek2OrderTimelineHTML(order) {
    const fallback = [{ status: order.status || 'Confirmed', created_at: order.createdAt || '', note: 'Current status' }];
    const events = Array.isArray(order.timeline) && order.timeline.length ? order.timeline : fallback;
    return '<ol class="account-order-timeline">' + events.map((ev) => {
      return '<li data-status="' + escapeHTML(String(ev.status || '').toLowerCase()) + '"><strong>' + escapeHTML(ev.status || 'Status') + '</strong><span>' + escapeHTML((ev.created_at || '').slice(0, 16) || '-') + '</span>' + (ev.note ? '<small>' + escapeHTML(ev.note) + '</small>' : '') + '</li>';
    }).join('') + '</ol>';
  }

  function ek2RenderAccount() {
    const session = getCurrentSession();
    if (!session) return;
    const stored = BackendBridge.getMem(STORAGE.user, null) || session || {};
    const orders = ek2OrdersForCurrentUser();
    const wishlist = getWishlist().map(productById).filter(Boolean);
    const coupon = readJSON(STORAGE.coupon, null);
    const totalSpent = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

    const setText = (id, val) => { const n = document.getElementById(id); if (n) n.textContent = val; };
    setText('accountHeroName', stored.name || session.name || 'Member');
    setText('accountHeroEmail', session.email || '');
    setText('accountStatOrders', String(orders.length));
    setText('accountStatSpent', money(totalSpent));
    setText('accountStatWishlist', String(wishlist.length));

    // PROFILE
    const profile = document.getElementById('account-panel-profile');
    if (profile) {
      const profileGrid = profile.querySelector('[data-profile-grid]');
      if (profileGrid) {
        const notProvided = 'Not provided';
        const phoneDisplay = stored.phoneE164
          || (stored.phoneDialCode && stored.phoneNational ? stored.phoneDialCode + stored.phoneNational : '')
          || stored.phone
          || notProvided;
        profileGrid.innerHTML = [
          ['Full Name', stored.name || session.name || notProvided],
          ['Email', session.email || notProvided],
          ['Birthdate', stored.birthdate || notProvided],
          ['Phone', phoneDisplay],
          ['Member Since', (stored.createdAt || session.createdAt || '').slice(0, 10) || notProvided],
          ['Last Sign-In', (stored.lastLoginAt || session.lastLoginAt || '').slice(0, 10) || notProvided],
          ['Account Type', (stored.role || session.role || 'user').toUpperCase()]
        ].map(([label, value]) => '<div class="account-card"><div class="account-card-label">' + escapeHTML(label) + '</div><div class="account-card-value">' + escapeHTML(String(value)) + '</div></div>').join('');
      }
      ek2RenderAccountProfileForms(stored);
    }

    // ORDERS
    const ordersPanel = document.getElementById('account-panel-orders');
    if (ordersPanel) {
      const list = ordersPanel.querySelector('[data-orders-list]');
      if (list) {
        if (!orders.length) {
          list.innerHTML = ek2EmptyHTML({
            icon: 'fa-receipt',
            title: 'No orders yet',
            text: 'When you place an order it will appear here with status updates and items.',
            cta: { href: 'Home.html', text: 'Start Shopping', icon: 'fa-shirt' }
          });
        } else {
          const ratings = readJSON(STORAGE.ratings, []);
          const ratedOrders = new Set(ratings.map((r) => normalizeOrderId(r.orderId || r.orderID || r.orderCode)));
          list.innerHTML = orders.map((order) => {
            const status = String(order.status || 'Confirmed');
            const items = (order.items || []).map((item) => {
              const product = productById(item.id);
              if (!product) return '';
              const meta = [item.size ? 'Size ' + escapeHTML(item.size) : 'Size pending', hasCustomization(item) ? 'Personalized' : 'Standard', 'Qty ' + (item.quantity || 1)].join(' &middot; ');
              const reviewBtn = '<button class="ek-link-btn" type="button" data-product-review="' + escapeHTML(product.id) + '" data-order-item-id="' + escapeHTML(item.orderItemId || '') + '"><i class="fa-solid fa-star"></i> Review</button>';
              return '<li><img src="' + escapeHTML(product.image || DEFAULT_IMG) + '" alt="' + escapeHTML(product.team) + '"><div><strong>' + escapeHTML(product.team) + '</strong><small>' + meta + '</small>' + reviewBtn + '</div><span>' + money((product.price + (hasCustomization(item) ? CUSTOMIZATION_FEE : 0)) * (item.quantity || 1)) + '</span></li>';
            }).join('');
            const orderId = normalizeOrderId(order.id);
            const canRate = !ratedOrders.has(orderId);
            return [
              '<article class="account-order-card">',
              '  <div class="account-order-head">',
              '    <strong>' + escapeHTML(orderId || 'Order') + '</strong>',
              '    <span class="ek-status-pill" data-status="' + escapeHTML(status.toLowerCase()) + '">' + escapeHTML(status) + '</span>',
              '  </div>',
              '  <div class="account-order-meta">',
              '    <span><i class="fa-regular fa-calendar"></i> ' + escapeHTML((order.createdAt || '').slice(0, 10) || '-') + '</span>',
              '    <span><i class="fa-solid fa-location-dot"></i> ' + escapeHTML((function () { const t = orderAddressText(order); return (!t || t === '-') ? 'Address not saved' : t; })()) + '</span>',
              '    <span><i class="fa-solid fa-cubes"></i> ' + orderQuantity(order) + ' items</span>',
              '  </div>',
              '  <ul class="account-order-items">' + items + '</ul>',
              '  ' + ek2OrderTimelineHTML(order),
              '  <div class="account-order-foot">',
              '    <span class="account-order-total">' + money(order.total || 0) + '</span>',
              '    <a class="ek-mini-btn" href="/api/orders/' + encodeURIComponent(orderId) + '/receipt" target="_blank" rel="noopener"><i class="fa-solid fa-file-invoice"></i> Receipt</a>',
              canRate ? '    <button class="ek-mini-btn is-primary" type="button" data-account-rate="' + escapeHTML(orderId) + '"><i class="fa-solid fa-star"></i> Rate this order</button>' : '    <button class="ek-mini-btn" type="button" data-account-rate="' + escapeHTML(orderId) + '"><i class="fa-solid fa-pen-to-square"></i> Adjust your rating</button>',
              '  </div>',
              '</article>'
            ].join('');
          }).join('');
        }
      }
    }

    // WISHLIST
    const wishlistPanel = document.getElementById('account-panel-wishlist');
    if (wishlistPanel) {
      const grid = wishlistPanel.querySelector('[data-wishlist-grid]');
      if (grid) {
        if (!wishlist.length) {
          grid.innerHTML = ek2EmptyHTML({
            icon: 'fa-heart',
            title: 'Your wishlist is empty',
            text: 'Save your favorite kits and find them here later.',
            cta: { href: 'Home.html', text: 'Browse Kits', icon: 'fa-store' }
          });
        } else {
          grid.innerHTML = wishlist.map((p) => {
            return '<article class="account-wishlist-card">' +
              '<img src="' + escapeHTML(p.image || DEFAULT_IMG) + '" alt="' + escapeHTML(p.team) + ' jersey">' +
              '<div class="account-wishlist-body">' +
              '  <small>' + escapeHTML(p.league) + '</small>' +
              '  <strong>' + escapeHTML(p.team) + '</strong>' +
              '  <div class="account-wishlist-actions">' +
              '    <button class="ek-mini-btn is-primary" type="button" data-add-to-cart data-product-id="' + escapeHTML(p.id) + '"' + (p.stock <= 0 ? ' disabled' : '') + '><i class="fa-solid fa-cart-plus"></i> Add to cart</button>' +
              '    <button class="ek-mini-btn is-danger" type="button" data-account-wishlist-remove="' + escapeHTML(p.id) + '"><i class="fa-solid fa-trash"></i></button>' +
              '  </div>' +
              '</div>' +
              '</article>';
          }).join('');
        }
      }
    }

    // ADDRESSES (sourced from backend /api/addresses; falls back to order-derived list)
    const addrPanel = document.getElementById('account-panel-addresses');
    if (addrPanel) {
      const list = addrPanel.querySelector('[data-addresses-list]');
      if (list) {
        ek2RenderSavedAddressesFromBackend(list, orders);
      }
    }

    // COUPONS - include both the currently applied (session) coupon AND
    // any admin-gifted/spin coupons the user owns server-side. Used or
    // expired rows are filtered out so the list only shows ready-to-use codes.
    const couponsPanel = document.getElementById('account-panel-coupons');
    if (couponsPanel) {
      const wrap = couponsPanel.querySelector('[data-coupons-list]');
      if (wrap) {
        renderAccountCoupons(wrap, coupon);
      }
    }
  }

  async function renderAccountCoupons(wrap, sessionCoupon) {
    wrap.innerHTML = '<div class="ek-section-empty"><i class="fa-solid fa-spinner fa-spin"></i><strong>Loading coupons</strong>Fetching your assigned coupons.</div>';
    let userCoupons = [];
    try {
      const res = await BackendBridge.apiFetch('/coupons');
      if (res && res.ok && res.data && Array.isArray(res.data.user_coupons)) {
        userCoupons = res.data.user_coupons;
      }
    } catch (e) {}
    const now = new Date();
    const usable = userCoupons.filter((c) => {
      if (Number(c.used || 0) === 1) return false;
      const exp = c.expires_at ? new Date(c.expires_at) : null;
      if (exp && !Number.isNaN(exp.getTime()) && exp <= now) return false;
      // backend may also have soft-disabled the underlying admin coupon
      if (c.coupon_is_active === 0) return false;
      return true;
    });
    if (!usable.length && !sessionCoupon) {
      wrap.innerHTML = ek2EmptyHTML({
        icon: 'fa-gift',
        title: 'No active coupon',
        text: 'Spin the daily wheel to unlock a coupon, or wait for an admin to gift one to you.',
        cta: { href: 'SpinWheel.html', text: 'Spin the Wheel', icon: 'fa-gift' }
      });
      return;
    }
    const cards = [];
    if (sessionCoupon && !usable.some((u) => String(u.code || '').toUpperCase() === String(sessionCoupon.code || '').toUpperCase())) {
      cards.push(buildAccountCouponCardHTML({
        code: sessionCoupon.code || '',
        description: sessionCoupon.description || 'Currently applied to your cart',
        source: 'spin',
        savedAt: sessionCoupon.createdAt || ''
      }));
    }
    usable.forEach((c) => {
      cards.push(buildAccountCouponCardHTML({
        code: c.code || '',
        description: c.prize_label || (c.coupon_type ? ek2CouponTypeLabel(c.coupon_type, c.coupon_value) : ''),
        source: c.source || 'spin',
        savedAt: c.assigned_at || ''
      }));
    });
    wrap.innerHTML = cards.join('');
  }

  function buildAccountCouponCardHTML(c) {
    const src = String(c.source || 'spin').toLowerCase();
    const pill = src === 'admin_gift'
      ? '<span class="coupon-assignment-pill is-gift"><i class="fa-solid fa-gift"></i> Gifted</span>'
      : src === 'spin'
        ? '<span class="coupon-assignment-pill is-spin"><i class="fa-solid fa-arrows-spin"></i> Spin</span>'
        : '<span class="coupon-assignment-pill is-global"><i class="fa-solid fa-globe"></i> Global</span>';
    return '<div class="account-coupon-card"><div>' +
      '<div class="account-coupon-code">' + escapeHTML(c.code || '') + ' ' + pill + '</div>' +
      '<div class="account-coupon-desc">' + escapeHTML(c.description || '') + ' &middot; Saved ' + escapeHTML((c.savedAt || '').slice(0, 10) || '-') + '</div>' +
      '</div><a class="ek-empty-cta" href="Cart.html"><i class="fa-solid fa-cart-shopping"></i> Use it</a></div>';
  }

  function ek2EmptyHTML(opts) {
    const cta = opts.cta ? '<a class="ek-empty-cta" href="' + escapeHTML(opts.cta.href) + '"><i class="fa-solid ' + escapeHTML(opts.cta.icon || 'fa-arrow-right') + '"></i> ' + escapeHTML(opts.cta.text) + '</a>' : '';
    return [
      '<div class="ek-empty">',
      '  <div class="ek-empty-icon"><i class="fa-solid ' + escapeHTML(opts.icon || 'fa-circle-info') + '"></i></div>',
      '  <h3>' + escapeHTML(opts.title) + '</h3>',
      '  <p>' + escapeHTML(opts.text) + '</p>',
      cta,
      '</div>'
    ].join('');
  }

  // Account-page wishlist remove + cart add via global click
  document.addEventListener('click', (e) => {
    const createProduct = e.target.closest('[data-admin-product-create]');
    if (createProduct) {
      openAdminProductForm('');
      return;
    }
    if (e.target.closest('#adminProductCancel')) {
      closeAdminProductForm();
      return;
    }
    const editProduct = e.target.closest('[data-admin-product-edit]');
    if (editProduct) {
      openAdminProductForm(editProduct.dataset.adminProductEdit);
      return;
    }
    const receiptPrint = e.target.closest('[data-receipt-print]');
    if (receiptPrint) {
      window.print();
      return;
    }
    const profileEdit = e.target.closest('[data-profile-edit]');
    if (profileEdit) {
      ek2ProfileMode = 'profile';
      ek2RenderAccount();
      return;
    }
    const passwordEdit = e.target.closest('[data-password-edit]');
    if (passwordEdit) {
      ek2ProfileMode = 'password';
      ek2RenderAccount();
      return;
    }
    const phoneRemove = e.target.closest('[data-phone-remove]');
    if (phoneRemove) {
      if (!window.confirm('Remove the phone number from your profile? Historical orders will keep their original contact phone.')) return;
      phoneRemove.disabled = true;
      BackendBridge.apiFetch('/account/phone', { method: 'DELETE' }).then(async (res) => {
        if (!res || !res.ok) {
          showToast((res && res.error && res.error.message) || 'Could not remove phone.', 'error');
          return;
        }
        const profile = await BackendBridge.apiFetch('/account/profile');
        ek2UpdateBackendUser((profile && profile.ok && profile.data && profile.data.user) || (res.data && res.data.user));
        showToast('Phone removed from your profile.', 'success');
        ek2RenderAccount();
      }).catch(() => {
        showToast('Could not remove phone. Please try again.', 'error');
      }).finally(() => { phoneRemove.disabled = false; });
      return;
    }
    const accountDelete = e.target.closest('[data-account-delete]');
    if (accountDelete) {
      const confirmation = window.prompt('This soft-deletes your account and logs you out. Historical orders remain for records. Type DELETE to confirm:');
      if (confirmation === null) return;
      if (String(confirmation).trim().toUpperCase() !== 'DELETE') {
        showToast('Account deletion cancelled. Confirmation text did not match.', 'error');
        return;
      }
      accountDelete.disabled = true;
      BackendBridge.apiFetch('/account', { method: 'DELETE', body: { confirmation: 'DELETE' } }).then((res) => {
        if (!res || !res.ok) {
          showToast((res && res.error && res.error.message) || 'Could not delete account.', 'error');
          return;
        }
        clearFrontendSessionState();
        updateCartCount();
        updateWishlistCount();
        showToast('Account deleted. You have been signed out.', 'success');
        markInternalNavigation();
        window.setTimeout(() => redirectWithinSite('Home.html'), 450);
      }).catch(() => {
        showToast('Could not delete account. Please try again.', 'error');
      }).finally(() => { accountDelete.disabled = false; });
      return;
    }
    const profileCancel = e.target.closest('[data-profile-cancel]');
    if (profileCancel) {
      ek2ProfileMode = '';
      ek2RenderAccount();
      return;
    }
    const addressAdd = e.target.closest('[data-address-add]');
    if (addressAdd) {
      ek2ShowAddressForm(null);
      return;
    }
    const addressCancel = e.target.closest('[data-address-cancel]');
    if (addressCancel) {
      ek2ClearAddressForm();
      return;
    }
    const addressEdit = e.target.closest('[data-address-edit]');
    if (addressEdit) {
      const found = ek2AddressCache.find((a) => String(a.id) === String(addressEdit.dataset.addressEdit));
      if (found) ek2ShowAddressForm(found);
      return;
    }
    const addressDefault = e.target.closest('[data-address-default]');
    if (addressDefault) {
      BackendBridge.apiFetch('/addresses/' + encodeURIComponent(addressDefault.dataset.addressDefault) + '/default', { method: 'PATCH' }).then((res) => {
        if (!res || !res.ok) {
          showToast((res && res.error && res.error.message) || 'Could not set default address.', 'error');
          return;
        }
        showToast('Default address updated.', 'success');
        ek2RenderAccount();
      });
      return;
    }
    const addressDelete = e.target.closest('[data-address-delete]');
    if (addressDelete) {
      if (!window.confirm('Delete this saved address?')) return;
      BackendBridge.apiFetch('/addresses/' + encodeURIComponent(addressDelete.dataset.addressDelete), { method: 'DELETE' }).then((res) => {
        if (!res || !res.ok) {
          showToast((res && res.error && res.error.message) || 'Could not delete address.', 'error');
          return;
        }
        showToast('Address deleted.', 'success');
        ek2ClearAddressForm();
        ek2RenderAccount();
      });
      return;
    }
    const remove = e.target.closest('[data-account-wishlist-remove]');
    if (remove) {
      removeFromWishlist(remove.dataset.accountWishlistRemove);
      ek2RenderAccount();
      return;
    }
  });

  document.addEventListener('submit', async (e) => {
    const profileForm = e.target.closest('[data-profile-form]');
    if (profileForm) {
      e.preventDefault();
      const errBox = profileForm.querySelector('[data-profile-error]');
      const data = Object.fromEntries(new FormData(profileForm).entries());
      const name = String(data.name || '').trim();
      const birthdate = String(data.birthdate || '').trim();
      const phoneCountryCode = String(data.phone_country_code || '').trim();
      const phoneNational = String(data.phone_national || '').trim();
      if (!isValidName(name)) {
        if (errBox) { errBox.hidden = false; errBox.textContent = 'Enter a valid full name.'; }
        return;
      }
      if (birthdate && !isAtLeastAge(parseBirthdate(birthdate), 15)) {
        if (errBox) { errBox.hidden = false; errBox.textContent = 'Birthdate must show you are at least 15.'; }
        return;
      }
      let body = { name, birthdate };
      if (phoneCountryCode || phoneNational) {
        const phoneResult = validatePhoneInput(phoneCountryCode, phoneNational);
        if (!phoneResult.ok) {
          if (errBox) { errBox.hidden = false; errBox.textContent = phoneResult.message; }
          return;
        }
        body.phone_country_code = phoneResult.countryCode;
        body.phone_country = phoneResult.country;
        body.phone_dial_code = phoneResult.dialCode;
        body.phone_national = phoneResult.national;
        body.phone_e164 = phoneResult.e164;
      }
      const btn = profileForm.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      try {
        const res = await BackendBridge.apiFetch('/account/profile', { method: 'PATCH', body });
        if (!res || !res.ok) {
          if (errBox) { errBox.hidden = false; errBox.textContent = (res && res.error && res.error.message) || 'Could not save profile.'; }
          return;
        }
        ek2UpdateBackendUser(res.data && res.data.user);
        ek2ProfileMode = '';
        showToast('Profile updated.', 'success');
        ek2RenderAccount();
      } finally {
        if (btn) btn.disabled = false;
      }
      return;
    }
    const passwordForm = e.target.closest('[data-password-form]');
    if (passwordForm) {
      e.preventDefault();
      const errBox = passwordForm.querySelector('[data-password-error]');
      const data = Object.fromEntries(new FormData(passwordForm).entries());
      const currentPassword = String(data.current_password || '');
      const newPassword = String(data.new_password || '');
      const confirmPassword = String(data.confirm_password || '');
      const weak = passwordValidationMessage(newPassword);
      if (!currentPassword) {
        if (errBox) { errBox.hidden = false; errBox.textContent = 'Enter your current password.'; }
        return;
      }
      if (weak) {
        if (errBox) { errBox.hidden = false; errBox.textContent = weak; }
        return;
      }
      if (newPassword !== confirmPassword) {
        if (errBox) { errBox.hidden = false; errBox.textContent = 'New passwords do not match.'; }
        return;
      }
      const btn = passwordForm.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      try {
        const res = await BackendBridge.apiFetch('/account/password', {
          method: 'PATCH',
          body: { current_password: currentPassword, new_password: newPassword, confirm_password: confirmPassword }
        });
        if (!res || !res.ok) {
          if (errBox) { errBox.hidden = false; errBox.textContent = (res && res.error && res.error.message) || 'Could not update password.'; }
          return;
        }
        ek2ProfileMode = '';
        showToast('Password updated.', 'success');
        ek2RenderAccount();
      } finally {
        if (btn) btn.disabled = false;
      }
      return;
    }
    const addressForm = e.target.closest('[data-address-editor]');
    if (addressForm) {
      e.preventDefault();
      const errBox = addressForm.querySelector('[data-address-error]');
      const data = Object.fromEntries(new FormData(addressForm).entries());
      const state = String(data.state || '').trim().replace(/\s+/g, ' ');
      const city = String(data.city || '').trim().replace(/\s+/g, ' ');
      const road = String(data.road || '').trim().replace(/\s+/g, ' ');
      if (!state || !city || !road) {
        if (errBox) { errBox.hidden = false; errBox.textContent = 'Governorate, city, and road are required.'; }
        return;
      }
      const id = String(addressForm.dataset.addressId || '').trim();
      const phoneCountryCode = String(data.phone_country_code || '').trim();
      const phoneNational = String(data.phone_national || '').trim();
      const body = { state, city, road };
      if (phoneCountryCode || phoneNational) {
        const phoneResult = validatePhoneInput(phoneCountryCode, phoneNational);
        if (!phoneResult.ok) {
          if (errBox) { errBox.hidden = false; errBox.textContent = phoneResult.message; }
          return;
        }
        body.phone_country_code = phoneResult.countryCode;
        body.phone_country = phoneResult.country;
        body.phone_dial_code = phoneResult.dialCode;
        body.phone_national = phoneResult.national;
        body.phone_e164 = phoneResult.e164;
      }
      const btn = addressForm.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      try {
        const res = await BackendBridge.apiFetch(id ? '/addresses/' + encodeURIComponent(id) : '/addresses', {
          method: id ? 'PATCH' : 'POST',
          body
        });
        if (!res || !res.ok) {
          if (errBox) { errBox.hidden = false; errBox.textContent = (res && res.error && res.error.message) || 'Could not save address.'; }
          return;
        }
        showToast(id ? 'Address updated.' : 'Address added.', 'success');
        ek2ClearAddressForm();
        ek2RenderAccount();
      } finally {
        if (btn) btn.disabled = false;
      }
      return;
    }
    const productForm = e.target.closest('[data-admin-product-form]');
    if (productForm) {
      e.preventDefault();
      const errBox = productForm.querySelector('[data-admin-product-error]');
      const formData = Object.fromEntries(new FormData(productForm).entries());
      const id = String(productForm.dataset.productId || '').trim();
      const body = {
        team: String(formData.team || '').trim(),
        product_name: String(formData.product_name || '').trim(),
        league: String(formData.league || '').trim(),
        season: String(formData.season || '').trim(),
        base_price: Number(formData.base_price || 0),
        image_url: String(formData.image_url || '').trim()
      };
      if (!body.team || !body.product_name || !body.league || !(body.base_price >= 0)) {
        if (errBox) { errBox.hidden = false; errBox.textContent = 'Team, product name, league, and valid price are required.'; }
        return;
      }
      const btn = productForm.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      try {
        const res = await BackendBridge.apiFetch(id ? '/admin/products/' + encodeURIComponent(id) : '/admin/products', {
          method: id ? 'PATCH' : 'POST',
          body
        });
        if (!res || !res.ok) {
          if (errBox) { errBox.hidden = false; errBox.textContent = (res && res.error && res.error.message) || 'Could not save product.'; }
          return;
        }
        if (res.data && res.data.product) applyBackendProductDetails([res.data.product]);
        await refreshAdminProductsFromBackend();
        closeAdminProductForm();
        showToast(id ? 'Product updated.' : 'Product created.', 'success');
        renderAdminDashboard();
      } finally {
        if (btn) btn.disabled = false;
      }
    }
  });

  // ---------- ek2.address (shared by Account + Payment) ----------------
  function ek2ExtractAddress(order) {
    const src = order || {};
    const a = src.address && typeof src.address === 'object' ? src.address : {};
    const governorate = String(a.governorate || src.governorate || src.lbState || '').trim();
    const city = String(a.city || src.city || '').trim();
    const road = String(a.road || a.street || src.road || src.street || src.addressLine || '').trim();
    if (!governorate && !city && !road) return null;
    return { governorate: governorate, city: city, road: road };
  }

  function ek2NormalizeAddressKey(a) {
    return [a.governorate, a.city, a.road].map((v) => String(v || '').toLowerCase().replace(/\s+/g, ' ').trim()).join('|');
  }

  function ek2UniqueAddresses(orders) {
    const map = new Map();
    (Array.isArray(orders) ? orders : []).forEach((o) => {
      const addr = ek2ExtractAddress(o);
      if (!addr) return;
      const key = ek2NormalizeAddressKey(addr);
      if (!key.replace(/\|/g, '').trim()) return;
      if (!map.has(key)) {
        map.set(key, { governorate: addr.governorate, city: addr.city, road: addr.road, lastUsed: o.createdAt || '' });
      } else {
        const existing = map.get(key);
        if ((o.createdAt || '') > (existing.lastUsed || '')) existing.lastUsed = o.createdAt || '';
      }
    });
    return Array.from(map.values()).sort((a, b) => (b.lastUsed || '').localeCompare(a.lastUsed || ''));
  }

  let ek2AddressCache = [];

  function ek2AddressFormHTML(address) {
    const isEdit = Boolean(address && address.id);
    const currentCountry = (address && address.phoneCountryCode) || DEFAULT_PHONE_COUNTRY;
    const sortedCountries = PHONE_COUNTRIES.slice().sort((a, b) => a.name.localeCompare(b.name));
    const countryOptions = sortedCountries.map((c) => {
      const selected = c.code === currentCountry ? ' selected' : '';
      return '<option value="' + c.code + '"' + selected + ' data-dial="' + c.dial + '" data-iso="' + c.code + '" aria-label="' + escapeHTML(c.name + ' ' + c.dial) + '">' + escapeHTML(phoneCountryOptionLabel(c)) + '</option>';
    }).join('');
    const currentRule = phoneCountryByCode(currentCountry);
    return [
      '<form class="account-edit-card account-address-form" data-address-editor data-address-id="' + escapeHTML(isEdit ? address.id : '') + '">',
      '  <div class="account-form-head"><h3>' + (isEdit ? 'Edit Address' : 'Add Address') + '</h3><button type="button" class="ek-mini-btn" data-address-cancel><i class="fa-solid fa-xmark"></i> Cancel</button></div>',
      '  <div class="account-form-grid">',
      '    <label>Governorate<input class="input" name="state" type="text" maxlength="80" value="' + escapeHTML(address && address.governorate || '') + '" required></label>',
      '    <label>City<input class="input" name="city" type="text" maxlength="80" value="' + escapeHTML(address && address.city || '') + '" required></label>',
      '    <label>Road / Street<input class="input" name="road" type="text" maxlength="120" value="' + escapeHTML(address && address.road || '') + '" required></label>',
      '    <label class="account-form-phone">Contact Phone (optional)',
      '      <div class="phone-input-grid">',
      '        <div class="phone-country-control">',
      '          ' + phoneFlagMarkup(currentRule, 'data-address-phone-flag'),
      '          <select class="input phone-country-select" name="phone_country_code" data-address-phone-country>' + countryOptions + '</select>',
      '          <span class="phone-dial-code" data-address-phone-dial>' + (currentRule ? currentRule.dial : '+961') + '</span>',
      '        </div>',
      '        <input class="input phone-number-input" name="phone_national" type="tel" inputmode="tel" maxlength="20" placeholder="' + escapeHTML(samplePhonePlaceholder(currentRule)) + '" value="' + escapeHTML(address && address.phoneNational || '') + '">',
      '      </div>',
      '    </label>',
      '  </div>',
      '  <p class="form-error" data-address-error hidden></p>',
      '  <div class="account-form-actions"><button class="ek-mini-btn is-primary" type="submit"><i class="fa-solid fa-floppy-disk"></i> Save Address</button></div>',
      '</form>'
    ].join('');
  }

  function ek2ShowAddressForm(address) {
    const wrap = document.querySelector('[data-address-form]');
    if (!wrap) return;
    wrap.innerHTML = ek2AddressFormHTML(address || null);
    const first = wrap.querySelector('input');
    if (first) first.focus();
    const countrySelect = wrap.querySelector('[data-address-phone-country]');
    const flagEl = wrap.querySelector('[data-address-phone-flag]');
    const dialEl = wrap.querySelector('[data-address-phone-dial]');
    const numberInput = wrap.querySelector('input[name="phone_national"]');
    if (countrySelect) {
      countrySelect.addEventListener('change', () => {
        const rule = phoneCountryByCode(countrySelect.value);
        if (!rule) return;
        syncPhoneFlag(flagEl, rule);
        if (dialEl) dialEl.textContent = rule.dial;
        if (numberInput) numberInput.setAttribute('placeholder', samplePhonePlaceholder(rule));
      });
      syncPhoneFlag(flagEl, currentRule);
    }
  }

  function ek2ClearAddressForm() {
    const wrap = document.querySelector('[data-address-form]');
    if (wrap) wrap.innerHTML = '';
  }

  async function ek2RenderSavedAddressesFromBackend(listEl, orders) {
    // Render a "loading" placeholder while we fetch
    listEl.innerHTML = '<div class="ek-empty"><div class="ek-empty-icon"><i class="fa-solid fa-spinner fa-spin"></i></div><h3>Loading addresses</h3><p>Fetching saved addresses from your account...</p></div>';
    let backendAddresses = [];
    try {
      const res = await BackendBridge.apiFetch('/addresses');
      if (res && res.ok && res.data && Array.isArray(res.data.addresses)) {
        backendAddresses = res.data.addresses.map((a) => ({
          id: a.id,
          governorate: a.state || '',
          city: a.city || '',
          road: a.road || '',
          isDefault: Boolean(a.is_default),
          lastUsed: a.updated_at || a.created_at || '',
          phoneE164: a.phone_e164 || '',
          phoneCountry: a.phone_country || '',
          phoneCountryCode: a.phone_country_code || '',
          phoneDialCode: a.phone_dial_code || '',
          phoneNational: a.phone_national || ''
        }));
        ek2AddressCache = backendAddresses;
      }
    } catch (e) {}

    // Fallback: derive from order history if backend returned nothing
    let addresses = backendAddresses;
    let fallback = false;
    if (!addresses.length) {
      addresses = ek2UniqueAddresses(orders);
      fallback = addresses.length > 0;
    }
    if (!addresses.length) {
      listEl.innerHTML = ek2EmptyHTML({
        icon: 'fa-location-dot',
        title: 'No saved addresses yet',
        text: 'Addresses you use at checkout will appear here automatically. Place an order from the Payment page to save your first address.',
        cta: null
      });
      return;
    }
    listEl.innerHTML = addresses.map((a, idx) => {
      const phoneText = a.phoneE164 || (a.phoneDialCode && a.phoneNational ? a.phoneDialCode + a.phoneNational : '');
      const lines = [
        a.governorate ? '<div class="account-address-line"><i class="fa-solid fa-flag"></i><span>' + escapeHTML(a.governorate) + '</span></div>' : '',
        a.city        ? '<div class="account-address-line"><i class="fa-solid fa-city"></i><span>' + escapeHTML(a.city) + '</span></div>' : '',
        a.road        ? '<div class="account-address-line"><i class="fa-solid fa-road"></i><span>' + escapeHTML(a.road) + '</span></div>' : '',
        phoneText     ? '<div class="account-address-line"><i class="fa-solid fa-phone"></i><span>' + escapeHTML(phoneText) + '</span></div>' : ''
      ].filter(Boolean).join('');
      const isDefault = fallback ? (idx === 0) : Boolean(a.isDefault);
      const badge = isDefault ? '<span class="ek-status-pill" data-status="confirmed">Default</span>' : '';
      const actions = fallback ? '' : [
        '<div class="account-address-actions">',
        !isDefault ? '<button class="ek-mini-btn" type="button" data-address-default="' + escapeHTML(a.id) + '"><i class="fa-solid fa-star"></i> Set Default</button>' : '',
        '<button class="ek-mini-btn" type="button" data-address-edit="' + escapeHTML(a.id) + '"><i class="fa-solid fa-pen-to-square"></i> Edit</button>',
        '<button class="ek-mini-btn is-danger" type="button" data-address-delete="' + escapeHTML(a.id) + '"><i class="fa-solid fa-trash"></i> Delete</button>',
        '</div>'
      ].join('');
      return [
        '<div class="account-address-card">',
        '  <div class="account-address-head">',
        '    <strong><i class="fa-solid fa-location-dot"></i> Saved Address</strong>',
        '    <span class="account-address-meta">Last used ' + escapeHTML((a.lastUsed || '').slice(0, 10) || '-') + '</span>',
        '  </div>',
        '  <div class="account-address-body">' + lines + '</div>',
        badge || actions ? '  <div class="account-address-foot">' + badge + actions + '</div>' : '',
        '</div>'
      ].join('');
    }).join('');
  }

  async function ek2PrefillPaymentAddress() {
    const form = document.querySelector('.payment-form');
    if (!form) return;
    if (!isSignedIn()) return;
    // Prefer backend default/latest saved address; fall back to order history.
    let a = null;
    try {
      const res = await BackendBridge.apiFetch('/addresses/default');
      if (res && res.ok && res.data && res.data.address) {
        const ba = res.data.address;
        a = { governorate: ba.state || '', city: ba.city || '', road: ba.road || '' };
      }
    } catch (e) {}
    if (!a) {
      const addresses = ek2UniqueAddresses(ek2OrdersForCurrentUser());
      if (addresses.length) a = addresses[0];
    }
    if (!a) return;
    const setIfEmpty = (id, value) => {
      const el = document.getElementById(id);
      if (!el || !value) return;
      const current = String(el.value || '').trim();
      if (current) return;
      el.value = value;
      // re-run any real-time validation listeners
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    };
    setIfEmpty('lbState', a.governorate);
    setIfEmpty('city', a.city);
    setIfEmpty('road', a.road);
  }

  // ---------- ek2.rate (in-page rating modal) --------------------------
  function ek2OpenRateModal(orderId) {
    const modal = document.getElementById('ek2RateModal');
    if (!modal) return;
    const orders = readJSON(STORAGE.orders, []);
    const order = orders.find((o) => normalizeOrderId(o.id) === orderId);
    if (!order) return;
    const ratings = readJSON(STORAGE.ratings, []);
    const existing = ratings.find((r) => normalizeOrderId(r.orderId || r.orderID || r.orderCode) === orderId) || null;
    const initial = existing ? Number(existing.rating || 0) || 0 : 0;
    modal.dataset.orderId = orderId;
    modal.dataset.currentRating = String(initial);
    const title = modal.querySelector('[data-rate-title]');
    const desc  = modal.querySelector('[data-rate-desc]');
    const note  = modal.querySelector('[data-rate-note]');
    if (title) title.textContent = existing ? 'Adjust your rating' : 'Rate this order';
    if (desc)  desc.textContent  = 'Order ' + orderId + ' • ' + money(order.total || 0);
    if (note) { note.textContent = ''; note.hidden = true; }
    const stars = modal.querySelectorAll('[data-rate-star]');
    stars.forEach((s) => s.classList.toggle('is-selected', Number(s.dataset.rateStar || 0) <= initial));
    const saveBtn = modal.querySelector('[data-rate-save]');
    if (saveBtn) {
      saveBtn.disabled = initial === 0 && !existing ? true : false;
      saveBtn.textContent = existing ? 'Update rating' : 'Submit rating';
    }
    modal.hidden = false;
    window.requestAnimationFrame(() => modal.classList.add('is-open'));
  }

  function ek2CloseRateModal() {
    const modal = document.getElementById('ek2RateModal');
    if (!modal) return;
    modal.classList.remove('is-open');
    window.setTimeout(() => { if (!modal.classList.contains('is-open')) modal.hidden = true; }, 180);
  }

  function ek2EnsureProductReviewModal() {
    let modal = document.getElementById('ek2ProductReviewModal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'ek2ProductReviewModal';
    modal.className = 'ek-rate-overlay';
    modal.hidden = true;
    modal.innerHTML = [
      '<div class="ek-rate-modal" role="dialog" aria-modal="true" aria-labelledby="ek2ProductReviewTitle">',
      '  <header class="ek-rate-modal-head"><h2 id="ek2ProductReviewTitle">Review product</h2><button type="button" class="ek-rate-modal-close" data-product-review-close aria-label="Close product review"><i class="fa-solid fa-xmark"></i></button></header>',
      '  <div class="ek-rate-modal-body">',
      '    <p data-product-review-desc>Share a verified buyer review.</p>',
      '    <div class="ek-rate-stars" role="radiogroup" aria-label="Select product rating">' +
            [1, 2, 3, 4, 5].map((n) => '<button type="button" class="ek-rate-star" data-product-review-star="' + n + '" aria-label="' + n + ' star">&#9733;</button>').join('') +
      '    </div>',
      '    <label class="account-review-comment">Comment<textarea class="input" data-product-review-comment maxlength="1000" rows="3" placeholder="Optional review"></textarea></label>',
      '    <p class="ek-rate-modal-note" data-product-review-note hidden></p>',
      '  </div>',
      '  <footer class="ek-rate-modal-foot"><button type="button" class="ek-rate-cancel" data-product-review-close>Cancel</button><button type="button" class="ek-rate-save" data-product-review-save disabled>Submit review</button></footer>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);
    return modal;
  }

  function ek2SetProductReviewStars(modal, rating) {
    modal.dataset.rating = String(rating || 0);
    modal.querySelectorAll('[data-product-review-star]').forEach((btn) => {
      btn.classList.toggle('is-selected', Number(btn.dataset.productReviewStar || 0) <= Number(rating || 0));
    });
    const save = modal.querySelector('[data-product-review-save]');
    if (save) save.disabled = !(Number(rating) >= 1 && Number(rating) <= 5);
  }

  function ek2OpenProductReviewModal(productId, orderItemId) {
    const product = productById(productId);
    if (!product) return;
    const modal = ek2EnsureProductReviewModal();
    modal.dataset.productId = productId;
    modal.dataset.orderItemId = orderItemId || '';
    const title = modal.querySelector('#ek2ProductReviewTitle');
    const desc = modal.querySelector('[data-product-review-desc]');
    const note = modal.querySelector('[data-product-review-note]');
    const comment = modal.querySelector('[data-product-review-comment]');
    if (title) title.textContent = 'Review ' + product.team;
    if (desc) desc.textContent = product.league + ' - verified buyer review';
    if (note) { note.hidden = true; note.textContent = ''; }
    if (comment) comment.value = '';
    ek2SetProductReviewStars(modal, 0);
    modal.hidden = false;
    window.requestAnimationFrame(() => modal.classList.add('is-open'));
  }

  function ek2CloseProductReviewModal() {
    const modal = document.getElementById('ek2ProductReviewModal');
    if (!modal) return;
    modal.classList.remove('is-open');
    window.setTimeout(() => { if (!modal.classList.contains('is-open')) modal.hidden = true; }, 180);
  }

  function ek2SaveRating(orderId, ratingValue) {
    const value = Number(ratingValue) || 0;
    if (!orderId || value < 1) return;
    const orders = readJSON(STORAGE.orders, []);
    const order = orders.find((o) => normalizeOrderId(o.id) === orderId) || null;
    const ratings = readJSON(STORAGE.ratings, []);
    const idx = ratings.findIndex((r) => normalizeOrderId(r.orderId || r.orderID || r.orderCode) === orderId);
    const isUpdate = idx >= 0;
    const entry = {
      orderId: orderId,
      customer: order ? (order.customer || order.email || 'Customer') : (ratings[idx] ? ratings[idx].customer : 'Customer'),
      date: order ? (order.createdAt || new Date().toISOString()) : (ratings[idx] ? ratings[idx].date : new Date().toISOString()),
      rating: value,
      total: order ? order.total : (ratings[idx] ? ratings[idx].total : null),
      createdAt: new Date().toISOString()
    };
    if (isUpdate) ratings[idx] = entry;
    else ratings.unshift(entry);
    writeJSON(STORAGE.ratings, ratings.slice(0, 100));  // optimistic cache update
    // Persist to backend
    const path = '/orders/' + encodeURIComponent(order ? order.id : orderId) + '/rating';
    BackendBridge.apiFetch(path, {
      method: isUpdate ? 'PATCH' : 'POST',
      body: { rating: value }
    }).then(async (res) => {
      if (!res || !res.ok) {
        showToast((res && res.error && res.error.message) || 'Could not save rating.', 'error');
        return;
      }
      try {
        const rs = await BackendBridge.apiFetch('/ratings');
        BackendBridge.setMem(STORAGE.ratings, (rs && rs.ok) ? BackendBridge.backendRatingsToLocal(rs.data && rs.data.ratings) : []);
      } catch (e) {}
    });
    showToast(isUpdate ? 'Rating updated.' : 'Thanks for rating your order.', 'success');
    ek2CloseRateModal();
    ek2RenderAccount();
    if (document.body.classList.contains('admin-page') && typeof renderAdminDashboard === 'function') {
      renderAdminDashboard();
    }
  }

  // global handlers for rate modal interactions + open trigger
  document.addEventListener('click', (e) => {
    const openProductReview = e.target.closest('[data-product-review]');
    if (openProductReview) {
      ek2OpenProductReviewModal(openProductReview.dataset.productReview, openProductReview.dataset.orderItemId || '');
      return;
    }
    const closeProductReview = e.target.closest('[data-product-review-close]');
    if (closeProductReview) {
      ek2CloseProductReviewModal();
      return;
    }
    const productReviewStar = e.target.closest('[data-product-review-star]');
    if (productReviewStar) {
      const modal = document.getElementById('ek2ProductReviewModal');
      if (modal) ek2SetProductReviewStars(modal, Number(productReviewStar.dataset.productReviewStar) || 0);
      return;
    }
    const productReviewSave = e.target.closest('[data-product-review-save]');
    if (productReviewSave) {
      const modal = document.getElementById('ek2ProductReviewModal');
      if (!modal) return;
      const rating = Number(modal.dataset.rating || 0);
      const note = modal.querySelector('[data-product-review-note]');
      if (rating < 1) {
        if (note) { note.hidden = false; note.textContent = 'Pick a star from 1 to 5 first.'; }
        return;
      }
      productReviewSave.disabled = true;
      BackendBridge.apiFetch('/products/' + encodeURIComponent(modal.dataset.productId || '') + '/reviews', {
        method: 'POST',
        body: {
          rating,
          comment: String((modal.querySelector('[data-product-review-comment]') || {}).value || '').trim(),
          order_item_id: modal.dataset.orderItemId || null
        }
      }).then((res) => {
        if (!res || !res.ok) {
          if (note) { note.hidden = false; note.textContent = (res && res.error && res.error.message) || 'Could not save product review.'; }
          return;
        }
        showToast('Product review saved.', 'success');
        ek2CloseProductReviewModal();
      }).finally(() => {
        productReviewSave.disabled = false;
      });
      return;
    }
    const open = e.target.closest('[data-account-rate]');
    if (open) {
      ek2OpenRateModal(open.dataset.accountRate);
      return;
    }
    const close = e.target.closest('[data-rate-close]');
    if (close) {
      ek2CloseRateModal();
      return;
    }
    const star = e.target.closest('[data-rate-star]');
    if (star) {
      const value = Number(star.dataset.rateStar) || 0;
      const modal = document.getElementById('ek2RateModal');
      if (!modal) return;
      modal.dataset.currentRating = String(value);
      modal.querySelectorAll('[data-rate-star]').forEach((s) => {
        s.classList.toggle('is-selected', Number(s.dataset.rateStar || 0) <= value);
      });
      const saveBtn = modal.querySelector('[data-rate-save]');
      if (saveBtn) saveBtn.disabled = value < 1;
      return;
    }
    const save = e.target.closest('[data-rate-save]');
    if (save) {
      const modal = document.getElementById('ek2RateModal');
      if (!modal) return;
      const orderId = modal.dataset.orderId || '';
      const value = Number(modal.dataset.currentRating || 0);
      if (value < 1) {
        const note = modal.querySelector('[data-rate-note]');
        if (note) { note.textContent = 'Pick a star from 1 to 5 first.'; note.hidden = false; }
        return;
      }
      ek2SaveRating(orderId, value);
      return;
    }
    // click on backdrop closes
    const overlay = e.target.closest('.ek-rate-overlay');
    if (overlay && e.target === overlay) {
      if (overlay.id === 'ek2ProductReviewModal') ek2CloseProductReviewModal();
      else ek2CloseRateModal();
    }
  });

  // Escape closes rate modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('ek2RateModal');
      if (modal && modal.classList.contains('is-open')) ek2CloseRateModal();
      const productReviewModal = document.getElementById('ek2ProductReviewModal');
      if (productReviewModal && productReviewModal.classList.contains('is-open')) ek2CloseProductReviewModal();
    }
  });

  // ---------- ek2.admin ----------------------------------------------
  function csvFilenameFromDisposition(disposition, fallback) {
    const match = String(disposition || '').match(/filename="?([^";]+)"?/i);
    return match ? match[1] : fallback;
  }

  async function downloadAdminCsv(href) {
    const url = new URL(href, window.location.href);
    const fallback = (url.pathname.split('/').pop() || 'export.csv').replace(/^export-/, '');
    let res;
    try {
      res = await fetch(url.href, { credentials: 'same-origin' });
    } catch (e) {
      showToast('CSV export failed. Check the server connection.', 'error');
      return;
    }
    if (!res.ok) {
      let msg = 'CSV export failed.';
      try {
        const payload = await res.json();
        msg = (payload && payload.error) || msg;
      } catch (e) {}
      showToast(msg, 'error');
      return;
    }
    const type = String(res.headers.get('Content-Type') || '').toLowerCase();
    if (!type.includes('text/csv')) {
      showToast('Export did not return a CSV file.', 'error');
      return;
    }
    const blob = await res.blob();
    const fileName = csvFilenameFromDisposition(res.headers.get('Content-Disposition'), fallback);
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    showToast('CSV export downloaded.', 'success');
  }

  document.addEventListener('click', (event) => {
    const exportLink = event.target.closest('a[href*="/api/admin/export/"]');
    if (!exportLink) return;
    event.preventDefault();
    downloadAdminCsv(exportLink.getAttribute('href') || exportLink.href);
  });

  function ek2EnhanceAdminMessagesTab() {
    const tbody = document.getElementById('messagesBody');
    if (!tbody) return;
    const empty = document.getElementById('messagesEmpty');
    const visible = Array.from(tbody.querySelectorAll('tr')).some((r) => r.textContent.trim() && !/^[-\u2014]+$/.test(r.textContent.trim()));
    if (empty) {
      const p = empty.querySelector('p');
      if (p) p.textContent = visible ? '' : 'No messages match the current filters.';
      empty.hidden = visible;
    }
  }

  function ek2RenderAdminProductsTab() {
    const grid = document.getElementById('ek2ProductsGrid');
    if (!grid) return;
    const search = normalizeText((document.getElementById('ek2ProductSearch') || {}).value || '');
    const leagueFilter = ((document.getElementById('ek2ProductLeagueFilter') || {}).value || '').trim();
    let list = PRODUCTS.slice();
    if (leagueFilter) list = list.filter((p) => p.leagueKey === leagueFilter);
    if (search) list = list.filter((p) => normalizeText([p.team, p.league, p.season, p.id].join(' ')).includes(search));
    list = list.slice(0, 80);
    if (!list.length) {
      grid.innerHTML = '<div class="ek-section-empty"><i class="fa-solid fa-shirt"></i><strong>No products match</strong>Try clearing search or league filter.</div>';
      return;
    }
    grid.innerHTML = list.map((p) => {
      const stockClass = p.stock <= 0 ? 'is-out' : p.stock <= 3 ? 'is-low' : 'is-in';
      const stockText = p.stock <= 0 ? 'Out of Stock' : p.stock <= 3 ? 'Low ' + p.stock : 'In Stock ' + p.stock;
      return [
        '<div class="ek-product-row">',
        '  <img src="' + escapeHTML(p.image || DEFAULT_IMG) + '" alt="' + escapeHTML(p.team) + '">',
        '  <div>',
        '    <strong>' + escapeHTML(p.team) + '</strong>',
        '    <div class="ek-product-meta"><span><i class="fa-solid fa-layer-group"></i>' + escapeHTML(p.league) + '</span><span><i class="fa-regular fa-calendar"></i>' + escapeHTML(p.season) + '</span><span><i class="fa-solid fa-tag"></i>' + money(p.price) + '</span></div>',
        '  </div>',
        '  <div class="ek-row-action-group">',
        '    <span class="ek-stock-chip ' + stockClass + '">' + escapeHTML(stockText) + '</span>',
        '    <button class="ek-mini-btn" type="button" data-admin-stock="' + escapeHTML(p.id) + '"><i class="fa-solid fa-warehouse"></i> Stock</button>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');
  }

  function ek2CouponTypeLabel(type, value) {
    if (type === 'percent') return (value || 0) + '% off';
    if (type === 'fixed')   return money(value || 0) + ' off';
    if (type === 'delivery' || type === 'free_delivery') return 'Free delivery';
    return type || '-';
  }

  async function ek2RenderAdminCouponsTab() {
    const wrap = document.getElementById('ek2CouponsGrid');
    if (!wrap) return;
    wrap.innerHTML = '<div class="ek-section-empty"><i class="fa-solid fa-spinner fa-spin"></i><strong>Loading coupons</strong>Fetching coupons from the database.</div>';
    let coupons = [];
    try {
      const res = await BackendBridge.apiFetch('/admin/coupons');
      if (res && res.ok && res.data && Array.isArray(res.data.coupons)) {
        coupons = res.data.coupons;
      }
    } catch (e) {}
    const formHTML = [
      '<form class="ek-coupon-form" id="ek2CouponForm" autocomplete="off">',
      '  <div class="ek-coupon-form-row">',
      '    <input type="text" id="ek2CouponCode" placeholder="CODE (A-Z, 0-9, _ -)" maxlength="32" required>',
      '    <select id="ek2CouponType">',
      '      <option value="percent">Percent off</option>',
      '      <option value="fixed">Fixed amount</option>',
      '      <option value="free_delivery">Free delivery</option>',
      '    </select>',
      '    <input type="number" id="ek2CouponValue" placeholder="Value" min="0" step="0.01">',
      '    <input type="date" id="ek2CouponExpiry" title="Optional expiry">',
      '    <button class="btn-action" type="submit"><i class="fa-solid fa-plus"></i> Add coupon</button>',
      '  </div>',
      '  <div class="ek-coupon-form-msg" id="ek2CouponFormMsg" hidden></div>',
      '</form>'
    ].join('');
    const cards = coupons.map((c) => {
      const label = ek2CouponTypeLabel(c.type, c.value);
      const active = c.is_active !== false;
      const expiresAt = c.expires_at ? new Date(c.expires_at) : null;
      const expired = expiresAt && !Number.isNaN(expiresAt.getTime()) && expiresAt <= new Date();
      const used = Number(c.used_count || c.order_count || 0) > 0;
      const statusLabel = !active ? 'Inactive' : expired ? 'Expired' : used ? 'Used' : 'Active';
      const statusKey = !active || expired ? 'cancelled' : used ? 'delivered' : 'confirmed';
      const expires = c.expires_at ? String(c.expires_at).slice(0, 10) : '';
      const visibility = String(c.visibility || (c.source === 'spin' ? 'spin' : 'global'));
      const visibilityPill = visibility === 'spin'
        ? '<span class="coupon-assignment-pill is-spin"><i class="fa-solid fa-arrows-spin"></i> Spin</span>'
        : visibility === 'gifted'
          ? '<span class="coupon-assignment-pill is-gift"><i class="fa-solid fa-gift"></i> Gifted</span>'
          : '<span class="coupon-assignment-pill is-global"><i class="fa-solid fa-globe"></i> Global</span>';
      const assignedTo = c.assigned_user
        ? '<div class="ek-coupon-meta"><span><i class="fa-solid fa-user-gear"></i> Assigned to ' + escapeHTML(c.assigned_user.email || c.assigned_user.name || ('user #' + c.assigned_user.id))
            + (Number(c.gift_assignments || 0) > 1 ? ' <small>+ ' + (Number(c.gift_assignments) - 1) + ' more</small>' : '')
            + '</span></div>'
        : '';
      const giftAllowed = active && !expired && c.source !== 'spin';
      return [
        '<div class="ek-coupon-card" data-coupon-id="' + escapeHTML(String(c.id)) + '" data-coupon-active="' + (active ? '1' : '0') + '" data-coupon-code="' + escapeHTML(c.code || '') + '">',
        '  <div class="ek-coupon-code">' + escapeHTML(c.code || '-') + ' ' + visibilityPill + '</div>',
        '  <div class="ek-coupon-value">' + escapeHTML(label) + '</div>',
        '  <div class="ek-coupon-meta">',
        '    <span><i class="fa-regular fa-calendar"></i>' + escapeHTML((c.created_at || '').slice(0, 10) || '-') + '</span>',
        c.source ? '    <span><i class="fa-solid fa-tag"></i>' + escapeHTML(String(c.source)) + '</span>' : '',
        expires ? '    <span><i class="fa-solid fa-hourglass-end"></i>Exp ' + escapeHTML(expires) + '</span>' : '',
        '    <span class="ek-status-pill" data-status="' + statusKey + '">' + statusLabel + '</span>',
        '  </div>',
        assignedTo,
        '  <div class="ek-row-action-group">',
        '    <button class="ek-mini-btn" type="button" data-coupon-edit="' + escapeHTML(String(c.id)) + '"><i class="fa-solid fa-pen"></i> Edit</button>',
        '    <button class="ek-mini-btn" type="button" data-coupon-toggle="' + escapeHTML(String(c.id)) + '">' + (active ? '<i class="fa-solid fa-pause"></i> Deactivate' : '<i class="fa-solid fa-play"></i> Activate') + '</button>',
        giftAllowed
          ? '    <button class="ek-mini-btn coupon-gift-btn" type="button" data-coupon-gift="' + escapeHTML(String(c.id)) + '"><i class="fa-solid fa-gift"></i> Gift / Assign</button>'
          : '',
        '    <button class="ek-mini-btn is-danger" type="button" data-coupon-delete="' + escapeHTML(String(c.id)) + '"><i class="fa-solid fa-trash"></i> Delete</button>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');
    wrap.innerHTML = formHTML + (cards || '<div class="ek-section-empty"><i class="fa-solid fa-ticket"></i><strong>No coupons yet</strong>Create your first coupon using the form above.</div>');
    initPremiumSelects(wrap);

    // Wire create form
    const form = document.getElementById('ek2CouponForm');
    const msg = document.getElementById('ek2CouponFormMsg');
    const showMsg = (text, isError) => {
      if (!msg) return;
      msg.textContent = text || '';
      msg.hidden = !text;
      msg.style.color = isError ? '#c0392b' : '#1e8449';
    };
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        showMsg('', false);
        const code = (document.getElementById('ek2CouponCode').value || '').trim().toUpperCase();
        const type = (document.getElementById('ek2CouponType').value || 'percent');
        const value = Number(document.getElementById('ek2CouponValue').value || 0) || 0;
        const expiry = (document.getElementById('ek2CouponExpiry').value || '').trim();
        const body = { code, type, value };
        if (expiry) body.expires_at = expiry;
        const res = await BackendBridge.apiFetch('/admin/coupons', { method: 'POST', body });
        if (!res || !res.ok) {
          showMsg((res && res.error && res.error.message) || 'Could not create coupon.', true);
          return;
        }
        showToast('Coupon created: ' + code);
        ek2RenderAdminCouponsTab();
      });
    }
  }

  async function ek2HandleCouponAction(action, id) {
    if (!id) return;
    if (action === 'delete') {
      if (!window.confirm('Delete this coupon? If it has been used on any order, it will be deactivated instead to keep order history intact.')) return;
      try {
        const res = await BackendBridge.apiFetch('/admin/coupons/' + encodeURIComponent(id), { method: 'DELETE' });
        if (!res || !res.ok) {
          showToast((res && res.error && res.error.message) || 'Could not delete coupon.', 'error');
          return;
        }
        const data = res.data || {};
        const actionTaken = data.action || (data.soft_deleted ? 'soft_deleted' : 'hard_deleted');
        const msg = actionTaken === 'soft_deleted'
          ? (data.message || 'Coupon deactivated (preserved in historical orders).')
          : (data.message || 'Coupon deleted.');
        showToast(msg, actionTaken === 'soft_deleted' ? 'info' : 'success');
        ek2RenderAdminCouponsTab();
      } catch (e) {
        showToast('Could not delete coupon. Please try again.', 'error');
      }
      return;
    }
    if (action === 'gift') {
      openAdminCouponGiftModal(id);
      return;
    }
    if (action === 'toggle') {
      // Read current state from the rendered card pill
      const card = document.querySelector('[data-coupon-id="' + CSS.escape(String(id)) + '"]');
      const isActiveNow = card && card.dataset.couponActive === '1';
      const res = await BackendBridge.apiFetch('/admin/coupons/' + encodeURIComponent(id), {
        method: 'PATCH',
        body: { is_active: isActiveNow ? false : true }
      });
      if (!res || !res.ok) { showToast((res && res.error && res.error.message) || 'Could not update coupon.', 'error'); return; }
      showToast(isActiveNow ? 'Coupon deactivated.' : 'Coupon activated.');
      ek2RenderAdminCouponsTab();
      return;
    }
    if (action === 'edit') {
      const card = document.querySelector('[data-coupon-id="' + CSS.escape(String(id)) + '"]');
      const codeEl = card ? card.querySelector('.ek-coupon-code') : null;
      const currentCode = codeEl ? codeEl.textContent.trim() : '';
      const newCode = window.prompt('New code (leave blank to keep):', currentCode);
      if (newCode === null) return;
      const newType = window.prompt('Type (percent / fixed / free_delivery, blank=keep):', '');
      if (newType === null) return;
      const newValue = window.prompt('Value (blank=keep):', '');
      if (newValue === null) return;
      const body = {};
      if (newCode.trim()) body.code = newCode.trim().toUpperCase();
      if (newType.trim()) body.type = newType.trim().toLowerCase();
      if (newValue.trim()) body.value = Number(newValue);
      if (!Object.keys(body).length) return;
      const res = await BackendBridge.apiFetch('/admin/coupons/' + encodeURIComponent(id), { method: 'PATCH', body });
      if (!res || !res.ok) { showToast((res && res.error && res.error.message) || 'Could not update coupon.', 'error'); return; }
      showToast('Coupon updated.');
      ek2RenderAdminCouponsTab();
    }
  }

  function ensureAdminCouponGiftModal() {
    let overlay = document.getElementById('ek2CouponGiftOverlay');
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.id = 'ek2CouponGiftOverlay';
    overlay.className = 'ek-coupon-assign-overlay';
    overlay.innerHTML = [
      '<div class="ek-coupon-assign-modal" role="dialog" aria-modal="true" aria-labelledby="ek2CouponGiftTitle">',
      '  <h2 id="ek2CouponGiftTitle">Gift coupon</h2>',
      '  <p id="ek2CouponGiftSubtitle">Send this coupon to a specific user. They will see it in Account &rsaquo; Coupons.</p>',
      '  <label class="ek-coupon-assign-field" for="ek2CouponGiftSearch">Search user by email or name',
      '    <input type="text" id="ek2CouponGiftSearch" autocomplete="off" placeholder="e.g. jane@example.com">',
      '  </label>',
      '  <div class="ek-coupon-assign-results" id="ek2CouponGiftResults" hidden></div>',
      '  <p class="ek-coupon-assign-msg" id="ek2CouponGiftMsg" hidden></p>',
      '  <div class="ek-coupon-assign-foot">',
      '    <button type="button" class="ek-mini-btn" id="ek2CouponGiftCancel">Cancel</button>',
      '    <button type="button" class="ek-mini-btn is-primary" id="ek2CouponGiftConfirm" disabled><i class="fa-solid fa-gift"></i> Gift coupon</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeAdminCouponGiftModal();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
        closeAdminCouponGiftModal();
      }
    });
    document.getElementById('ek2CouponGiftCancel').addEventListener('click', closeAdminCouponGiftModal);
    return overlay;
  }

  let adminCouponGiftState = { couponId: null, selectedUser: null, searchTimer: null };

  function closeAdminCouponGiftModal() {
    const overlay = document.getElementById('ek2CouponGiftOverlay');
    if (!overlay) return;
    overlay.classList.remove('is-open');
    adminCouponGiftState = { couponId: null, selectedUser: null, searchTimer: null };
  }

  function setAdminCouponGiftMsg(text, kind) {
    const msg = document.getElementById('ek2CouponGiftMsg');
    if (!msg) return;
    msg.textContent = text || '';
    msg.hidden = !text;
    msg.classList.remove('is-error', 'is-success');
    if (kind === 'error') msg.classList.add('is-error');
    else if (kind === 'success') msg.classList.add('is-success');
  }

  async function ek2SearchAdminUsersForGift(query) {
    if (!query) return [];
    try {
      const res = await BackendBridge.apiFetch('/admin/users/search?q=' + encodeURIComponent(query));
      if (res && res.ok && res.data && Array.isArray(res.data.users)) return res.data.users;
    } catch (e) {}
    return [];
  }

  function renderAdminCouponGiftResults(users) {
    const wrap = document.getElementById('ek2CouponGiftResults');
    if (!wrap) return;
    if (!users.length) {
      wrap.hidden = false;
      wrap.innerHTML = '<div class="ek-coupon-assign-empty">No matching users.</div>';
      return;
    }
    wrap.hidden = false;
    wrap.innerHTML = users.map((u) => {
      return '<button type="button" class="ek-coupon-assign-result" data-gift-user-id="' + escapeHTML(String(u.id)) + '" data-gift-user-email="' + escapeHTML(u.email || '') + '">' +
        '<span>' + escapeHTML(u.name || u.email || ('User #' + u.id)) + '</span>' +
        '<small>' + escapeHTML(u.email || '') + '</small>' +
        '</button>';
    }).join('');
    wrap.querySelectorAll('[data-gift-user-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        wrap.querySelectorAll('.ek-coupon-assign-result').forEach((r) => r.classList.remove('is-active'));
        btn.classList.add('is-active');
        adminCouponGiftState.selectedUser = {
          id: Number(btn.dataset.giftUserId) || 0,
          email: btn.dataset.giftUserEmail || ''
        };
        const search = document.getElementById('ek2CouponGiftSearch');
        if (search) search.value = adminCouponGiftState.selectedUser.email || '';
        const confirmBtn = document.getElementById('ek2CouponGiftConfirm');
        if (confirmBtn) confirmBtn.disabled = false;
        setAdminCouponGiftMsg('');
      });
    });
  }

  async function openAdminCouponGiftModal(couponId) {
    const overlay = ensureAdminCouponGiftModal();
    overlay.classList.add('is-open');
    adminCouponGiftState.couponId = couponId;
    adminCouponGiftState.selectedUser = null;
    setAdminCouponGiftMsg('');
    const card = document.querySelector('[data-coupon-id="' + CSS.escape(String(couponId)) + '"]');
    const code = card ? (card.dataset.couponCode || '') : '';
    const subtitle = document.getElementById('ek2CouponGiftSubtitle');
    if (subtitle) {
      subtitle.innerHTML = code
        ? 'Gift <strong>' + escapeHTML(code) + '</strong> to a specific user. They will see it in Account &rsaquo; Coupons.'
        : 'Send this coupon to a specific user.';
    }
    const search = document.getElementById('ek2CouponGiftSearch');
    const results = document.getElementById('ek2CouponGiftResults');
    const confirm = document.getElementById('ek2CouponGiftConfirm');
    if (results) { results.hidden = true; results.innerHTML = ''; }
    if (confirm) confirm.disabled = true;
    if (search) {
      search.value = '';
      search.focus();
      if (!search.dataset.giftBound) {
        search.dataset.giftBound = '1';
        search.addEventListener('input', () => {
          adminCouponGiftState.selectedUser = null;
          const confirmBtn = document.getElementById('ek2CouponGiftConfirm');
          if (confirmBtn) confirmBtn.disabled = true;
          if (adminCouponGiftState.searchTimer) window.clearTimeout(adminCouponGiftState.searchTimer);
          const q = search.value.trim();
          if (!q) {
            const w = document.getElementById('ek2CouponGiftResults');
            if (w) { w.hidden = true; w.innerHTML = ''; }
            return;
          }
          adminCouponGiftState.searchTimer = window.setTimeout(async () => {
            const users = await ek2SearchAdminUsersForGift(q);
            renderAdminCouponGiftResults(users);
          }, 220);
        });
      }
    }
    if (confirm && !confirm.dataset.giftBound) {
      confirm.dataset.giftBound = '1';
      confirm.addEventListener('click', async () => {
        if (!adminCouponGiftState.couponId || !adminCouponGiftState.selectedUser) return;
        confirm.disabled = true;
        setAdminCouponGiftMsg('');
        const res = await BackendBridge.apiFetch(
          '/admin/coupons/' + encodeURIComponent(adminCouponGiftState.couponId) + '/assign',
          { method: 'POST', body: { user_id: adminCouponGiftState.selectedUser.id } }
        );
        if (!res || !res.ok) {
          confirm.disabled = false;
          setAdminCouponGiftMsg((res && res.error && res.error.message) || 'Could not gift coupon.', 'error');
          return;
        }
        setAdminCouponGiftMsg((res.data && res.data.message) || 'Coupon gifted.', 'success');
        showToast((res.data && res.data.message) || 'Coupon gifted.', 'success');
        window.setTimeout(() => {
          closeAdminCouponGiftModal();
          ek2RenderAdminCouponsTab();
        }, 600);
      });
    }
  }

  function ek2RenderAdminApplicationsTab() {
    const wrap = document.getElementById('ek2ApplicationsGrid');
    if (!wrap) return;
    const messages = readJSON(STORAGE.messages, []);
    const apps = messages.filter((m) => m.type === 'application');
    if (!apps.length) {
      wrap.innerHTML = '<div class="ek-section-empty"><i class="fa-solid fa-id-badge"></i><strong>No applications yet</strong>Career applications submitted from the Contact form will appear here.</div>';
      return;
    }
    wrap.innerHTML = apps.map((a) => {
      const cvAction = (a.hasCv && a.cvFile && a.id)
        ? '<a class="ek-mini-btn application-cv-btn" href="/api/messages/' + encodeURIComponent(a.id) + '/cv" target="_blank" rel="noopener" download><i class="fa-solid fa-download"></i> Download CV</a>'
        : '';
      return '<article class="ek-application-card" data-admin-application-card="' + escapeHTML(a.id || '') + '">' +
        '<h3>' + escapeHTML(a.subject || 'Application') + '</h3>' +
        '<div class="ek-application-meta">' +
        '  <span><i class="fa-regular fa-user"></i>' + escapeHTML(a.name || '-') + '</span>' +
        '  <span><i class="fa-regular fa-envelope"></i>' + escapeHTML(a.email || '-') + '</span>' +
        '  <span><i class="fa-regular fa-calendar"></i>' + escapeHTML((a.createdAt || '').slice(0, 10) || '-') + '</span>' +
        (a.read ? '' : '  <span class="ek-status-pill" data-status="pending">New</span>') +
        '</div>' +
        '<p class="ek-application-snippet">' + escapeHTML(a.message || '') + '</p>' +
        '<div class="ek-application-actions"><button class="ek-mini-btn" type="button" data-admin-message="' + escapeHTML(a.id || '') + '"><i class="fa-regular fa-eye"></i> View full</button>' + cvAction + '<button class="ek-mini-btn is-danger" type="button" data-admin-message-delete="' + escapeHTML(a.id || '') + '"><i class="fa-solid fa-trash"></i> Delete</button></div>' +
      '</article>';
    }).join('');
  }

  async function ek2RenderAdminAnalyticsTab() {
    initPremiumSelects();
    const grid = document.getElementById('ek2AnalyticsGrid');
    if (!grid) return;
    if (isAdminSignedIn() && (!BackendBridge._adminAnalytics || !BackendBridge._adminOverview)) {
      grid.innerHTML = '<div class="ek-section-empty"><i class="fa-solid fa-chart-line"></i><strong>Loading analytics</strong>Pulling current metrics from the database.</div>';
      const range = encodeURIComponent((document.getElementById('ek2AnalyticsRange') || document.getElementById('adminAnalyticsRange') || {}).value || 'all');
      const overview = await BackendBridge.apiFetch('/admin/overview?range=' + range);
      const analytics = await BackendBridge.apiFetch('/admin/analytics?range=' + range);
      BackendBridge._adminOverview = (overview && overview.ok) ? overview.data : BackendBridge._adminOverview;
      BackendBridge._adminAnalytics = (analytics && analytics.ok) ? analytics.data : BackendBridge._adminAnalytics;
    }
    const overview = BackendBridge._adminOverview || {};
    const analytics = BackendBridge._adminAnalytics || {};
    const topLeague = (analytics.revenue_by_league || [])[0] || null;
    const topTeam = (analytics.top_selling || [])[0] || null;
    const mostWishlisted = (analytics.most_wishlisted || [])[0] || null;
    const monthly = (analytics.monthly_revenue || [])[0] || null;
    const lowStockRows = analytics.low_stock_alerts || [];
    const outStockRows = lowStockRows.filter((row) => Number(row.quantity || 0) <= 0);
    const cards = [
      ['Total Revenue',       money(Number(overview.total_revenue || 0)),              'All paid orders'],
      ['Average Order Value', money(Number(analytics.average_order_value || 0)),       'Database order average'],
      ['Top League',          topLeague ? topLeague.league : '-',                     topLeague ? money(Number(topLeague.revenue || 0)) + ' revenue' : 'No sales yet'],
      ['Top Team',            topTeam ? topTeam.team : '-',                           topTeam ? Number(topTeam.qty || 0) + ' units sold' : 'No sales yet'],
      ['Most Wishlisted',     mostWishlisted ? mostWishlisted.team : '-',             mostWishlisted ? Number(mostWishlisted.c || 0) + ' wishlist saves' : 'Wishlist is empty'],
      ['This Month Revenue',  monthly ? money(Number(monthly.revenue || 0)) : '$0',   monthly ? monthly.month : 'No data'],
      ['Repeat Customer Rate',String(Number(analytics.repeat_customer_rate || 0)) + '%', 'Repeat buyers from orders'],
      ['Total Orders',        String(Number(overview.total_orders || 0)),             'Orders in database'],
      ['Registered Users',    String(Number(overview.registered_users || 0)),         'Customer accounts'],
      ['Low-Stock Alerts',    String(Number(lowStockRows.length || overview.low_stock_count || 0)), 'Inventory size rows at 5 or less'],
      ['Out-of-Stock Sizes',  String(outStockRows.length),                            'Size rows needing restock'],
      ['Open Carts',          String(Number(analytics.abandoned_carts || 0)),          'Database carts without an order']
    ];
    grid.innerHTML = cards.map((c) => '<div class="ek-analytics-card"><div class="ek-analytics-label">' + escapeHTML(c[0]) + '</div><div class="ek-analytics-value">' + escapeHTML(c[1]) + '</div><div class="ek-analytics-sub">' + escapeHTML(c[2]) + '</div></div>').join('');
  }

  async function ek2RenderAdminSettingsTab() {
    const wrap = document.getElementById('ek2SettingsList');
    if (!wrap) return;
    const defaults = { lowStockThreshold: 3, autoCloseToasts: true, compactTables: false };
    if (!BackendBridge._adminSettings) {
      const res = await BackendBridge.apiFetch('/admin/settings');
      BackendBridge._adminSettings = (res && res.ok && res.data && res.data.settings) ? Object.assign({}, defaults, res.data.settings) : defaults;
    }
    const settings = BackendBridge._adminSettings || defaults;
    const rows = [
      ['Low-stock threshold', 'Stock at or below this value triggers Low-Stock alerts in analytics.', 'lowStockThreshold', 'number'],
      ['Auto-dismiss toasts',  'Toasts automatically disappear after a few seconds.', 'autoCloseToasts', 'toggle'],
      ['Compact admin tables', 'Reduce row padding for denser admin tables (visual only).', 'compactTables', 'toggle']
    ];
    wrap.innerHTML = rows.map((r) => {
      const [label, desc, key, type] = r;
      let control = '';
      if (type === 'toggle') {
        control = '<button type="button" class="ek-toggle' + (settings[key] ? ' is-on' : '') + '" data-ek2-setting="' + escapeHTML(key) + '" data-setting-type="toggle" aria-pressed="' + (settings[key] ? 'true' : 'false') + '" aria-label="Toggle ' + escapeHTML(label) + '"></button>';
      } else if (type === 'number') {
        control = '<input class="ek-status-select" type="number" min="0" max="100" step="1" value="' + escapeHTML(String(settings[key])) + '" data-ek2-setting="' + escapeHTML(key) + '" data-setting-type="number">';
      }
      return '<div class="ek-settings-row"><div><h3>' + escapeHTML(label) + '</h3><p>' + escapeHTML(desc) + '</p></div>' + control + '</div>';
    }).join('');
    const note = document.createElement('div');
    note.className = 'ek-section-empty';
    note.innerHTML = '<i class="fa-solid fa-circle-info"></i><strong>Backend settings</strong>Changes here are stored in SQLite admin_settings and are available to the admin dashboard.';
    wrap.appendChild(note);
  }

  function ek2EnsureAdminMenu() {
    const sidebar = document.querySelector('.sidebar-nav');
    if (!sidebar) return;
    const inventoryTab = sidebar.querySelector('[data-tab="inventory"]');
    if (inventoryTab) inventoryTab.remove();
    const wanted = [
      { tab: 'products',     icon: 'fa-shirt',     label: 'Products' },
      { tab: 'coupons',      icon: 'fa-ticket',    label: 'Coupons' },
      { tab: 'applications', icon: 'fa-id-badge',  label: 'Career Applications' },
      { tab: 'analytics',    icon: 'fa-chart-line',label: 'Analytics' },
      { tab: 'settings',     icon: 'fa-gear',      label: 'Settings' }
    ];
    wanted.forEach((w) => {
      if (sidebar.querySelector('[data-tab="' + w.tab + '"]')) return;
      const btn = document.createElement('button');
      btn.className = 'sb-item';
      btn.dataset.tab = w.tab;
      btn.innerHTML = '<i class="fa-solid ' + w.icon + '"></i> ' + w.label;
      sidebar.appendChild(btn);
    });
  }

  function ek2EnsureAdminPanels() {
    const main = document.querySelector('.main-wrap');
    if (!main) return;
    const inventoryPanel = document.getElementById('tab-inventory');
    if (inventoryPanel) inventoryPanel.remove();
    if (!document.getElementById('tab-products')) {
      const sec = document.createElement('section');
      sec.className = 'tab-panel';
      sec.id = 'tab-products';
      sec.innerHTML = [
        '<div class="page-head"><h1>Products</h1><p class="page-sub">Browse the live product catalogue. Use Stock to adjust quantities for any jersey.</p></div>',
        '<div class="toolbar">',
        '  <input class="search-input" id="ek2ProductSearch" type="text" placeholder="Search jersey, team, or season...">',
        '  <select class="filter-select" id="ek2ProductLeagueFilter">',
        '    <option value="">All leagues</option>',
        '    <option value="premier">Premier League</option>',
        '    <option value="laliga">La Liga</option>',
        '    <option value="seriea">Serie A</option>',
        '    <option value="bundesliga">Bundesliga</option>',
        '    <option value="league1">Ligue 1</option>',
        '    <option value="row">Rest of the World</option>',
        '  </select>',
        '</div>',
        '<div class="ek-products-grid" id="ek2ProductsGrid"></div>'
      ].join('');
      main.appendChild(sec);
    }
    if (!document.getElementById('tab-coupons')) {
      const sec = document.createElement('section');
      sec.className = 'tab-panel';
      sec.id = 'tab-coupons';
      sec.innerHTML = [
        '<div class="page-head"><h1>Coupons</h1><p class="page-sub">Active and recent coupons unlocked from the Spin Wheel.</p></div>',
        '<div class="toolbar"><a class="btn-action" href="/api/admin/export/coupons.csv" download><i class="fa-solid fa-file-csv"></i> Export Coupons</a></div>',
        '<div class="ek-coupon-grid" id="ek2CouponsGrid"></div>'
      ].join('');
      main.appendChild(sec);
    }
    if (!document.getElementById('tab-applications')) {
      const sec = document.createElement('section');
      sec.className = 'tab-panel';
      sec.id = 'tab-applications';
      sec.innerHTML = [
        '<div class="page-head"><h1>Career Applications</h1><p class="page-sub">Job applications submitted through the Contact form in application mode.</p></div>',
        '<div class="ek-application-grid" id="ek2ApplicationsGrid"></div>'
      ].join('');
      main.appendChild(sec);
    }
    if (!document.getElementById('tab-analytics')) {
      const sec = document.createElement('section');
      sec.className = 'tab-panel';
      sec.id = 'tab-analytics';
      sec.innerHTML = [
        '<div class="page-head"><h1>Analytics</h1><p class="page-sub">Deep store metrics from local order data: revenue by league/team, monthly revenue, AOV, repeat-customer rate, low-stock alerts, and more.</p></div>',
        '<div class="toolbar"><select class="filter-select" id="ek2AnalyticsRange"><option value="all">All time</option><option value="today">Today</option><option value="7d">Last 7 days</option><option value="30d">Last 30 days</option><option value="month">This month</option></select></div>',
        '<div class="ek-analytics-deep-grid" id="ek2AnalyticsGrid"></div>'
      ].join('');
      main.appendChild(sec);
    }
    if (!document.getElementById('tab-settings')) {
      const sec = document.createElement('section');
      sec.className = 'tab-panel';
      sec.id = 'tab-settings';
      sec.innerHTML = [
        '<div class="page-head"><h1>Settings</h1><p class="page-sub">Backend-backed admin preferences stored in SQLite.</p></div>',
        '<div id="ek2SettingsList" class="ek-settings-list"></div>'
      ].join('');
      main.appendChild(sec);
    }
  }

  function ek2InitAdminUpgrade() {
    if (!document.body.classList.contains('admin-page')) return;
    ek2EnsureAdminMenu();
    ek2EnsureAdminPanels();
    initPremiumSelects();
    // wire new tab clicks (extending existing logic)
    const tabs = document.querySelectorAll('.sb-item[data-tab]');
    const panels = document.querySelectorAll('.tab-panel');
    const title = document.getElementById('topbarTitle');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const key = tab.dataset.tab;
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        panels.forEach((p) => p.classList.toggle('active', p.id === 'tab-' + key));
        if (title) title.textContent = tab.textContent.trim().replace(/\s+/g, ' ');
        if (key === 'products')     ek2RenderAdminProductsTab();
        if (key === 'coupons')      ek2RenderAdminCouponsTab();
        if (key === 'applications') ek2RenderAdminApplicationsTab();
        if (key === 'analytics')    ek2RenderAdminAnalyticsTab();
        if (key === 'settings')     ek2RenderAdminSettingsTab();
      });
    });
    // search/filter wires
    ['ek2ProductSearch', 'ek2ProductLeagueFilter'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) { el.addEventListener('input', ek2RenderAdminProductsTab); el.addEventListener('change', ek2RenderAdminProductsTab); }
    });
    const analyticsRange = document.getElementById('adminAnalyticsRange');
    if (analyticsRange) {
      analyticsRange.addEventListener('change', () => {
        refreshAdminAnalyticsFromBackend(analyticsRange.value).catch(() => showToast('Could not refresh analytics.', 'error'));
      });
    }
    const deepAnalyticsRange = document.getElementById('ek2AnalyticsRange');
    if (deepAnalyticsRange) {
      deepAnalyticsRange.addEventListener('change', () => {
        const mainRange = document.getElementById('adminAnalyticsRange');
        if (mainRange) {
          mainRange.value = deepAnalyticsRange.value;
          syncPremiumSelect(mainRange);
        }
        refreshAdminAnalyticsFromBackend(deepAnalyticsRange.value).catch(() => showToast('Could not refresh analytics.', 'error'));
      });
    }
    // wrap renderAdminDashboard to also enhance order rows + status pills + run messages filter
    const _origRender = renderAdminDashboard;
    renderAdminDashboard = function () {
      _origRender();
      ek2EnhanceOrderRowsWithStatus();
      ek2EnhanceAdminMessagesTab();
      ek2DecorateAdminStatusCells();
      // re-render visible new tab if any
      const active = document.querySelector('.tab-panel.active');
      if (active) {
        if (active.id === 'tab-products')     ek2RenderAdminProductsTab();
        if (active.id === 'tab-coupons')      ek2RenderAdminCouponsTab();
        if (active.id === 'tab-applications') ek2RenderAdminApplicationsTab();
        if (active.id === 'tab-analytics')    ek2RenderAdminAnalyticsTab();
        if (active.id === 'tab-settings')     ek2RenderAdminSettingsTab();
      }
      initPremiumSelects();
    };
    // initial render
    renderAdminDashboard();
  }

  function ek2DecorateAdminStatusCells() {
    document.querySelectorAll('#recentOrdersBody tr').forEach((row) => {
      const statusCell = row.cells && row.cells[5];
      if (!statusCell) return;
      const text = statusCell.textContent.trim();
      if (!text || text === '-' || text === '—') return;
      statusCell.innerHTML = '<span class="ek-status-pill" data-status="' + text.toLowerCase() + '">' + escapeHTML(text) + '</span>';
    });
  }

  function ek2EnhanceOrderRowsWithStatus() {
    const tbody = document.getElementById('allOrdersBody');
    if (!tbody) return;
    const orders = readJSON(STORAGE.orders, []);
    Array.from(tbody.querySelectorAll('tr')).forEach((row) => {
      const idCell = row.cells && row.cells[0];
      if (!idCell) return;
      const orderId = idCell.textContent.trim();
      const order = orders.find((o) => normalizeOrderId(o.id) === orderId);
      if (!order) return;
      // rewrite status cell (index 6) to a select control
      const statusCell = row.cells[6];
      if (statusCell && !statusCell.querySelector('select')) {
        const current = String(order.status || 'Confirmed');
        statusCell.innerHTML = [
          '<select class="ek-status-select" data-ek2-row-status="' + escapeHTML(orderId) + '" aria-label="Change status">',
          '  <option' + (current === 'Pending' ? ' selected' : '')   + '>Pending</option>',
          '  <option' + (current === 'Confirmed' ? ' selected' : '') + '>Confirmed</option>',
          '  <option' + (current === 'Shipped' ? ' selected' : '')   + '>Shipped</option>',
          '  <option' + (current === 'Delivered' ? ' selected' : '') + '>Delivered</option>',
          '  <option' + (current === 'Cancelled' ? ' selected' : '') + '>Cancelled</option>',
          '</select>'
        ].join('');
      }
      // rewrite actions cell (index 7) to add Cancel + View
      const actionCell = row.cells[7];
      if (actionCell && !actionCell.querySelector('[data-ek2-row-cancel]')) {
        actionCell.innerHTML = [
          '<div class="ek-row-action-group">',
          '  <button class="ek-mini-btn" type="button" data-admin-order="' + escapeHTML(orderId) + '"><i class="fa-regular fa-eye"></i> View</button>',
          '  <button class="ek-mini-btn is-danger" type="button" data-ek2-row-cancel="' + escapeHTML(orderId) + '"' + (String(order.status || '').toLowerCase() === 'cancelled' ? ' disabled' : '') + '><i class="fa-solid fa-xmark"></i> Cancel</button>',
          '</div>'
        ].join('');
      }
    });
  }

  // global handler for in-row order-status change + cancel + setting toggles
  document.addEventListener('change', (e) => {
    const sel = e.target.closest('[data-ek2-row-status]');
    if (sel) {
      const orderId = sel.dataset.ek2RowStatus;
      const orders = readJSON(STORAGE.orders, []);
      const order = orders.find((o) => normalizeOrderId(o.id) === orderId);
      if (order) {
        const previousStatus = order.status;
        const newStatus = sel.value;
        order.status = newStatus;
        writeJSON(STORAGE.orders, orders);  // optimistic UI
        BackendBridge.apiFetch('/orders/' + encodeURIComponent(order.id) + '/status', {
          method: 'PATCH',
          body: { status: newStatus }
        }).then(async (res) => {
          if (!res || !res.ok) {
            // Roll back optimistic update on failure
            order.status = previousStatus;
            writeJSON(STORAGE.orders, orders);
            sel.value = previousStatus;
            showToast((res && res.error && res.error.message) || 'Could not update status.', 'error');
            renderAdminDashboard();
            return;
          }
          try {
            const od = await BackendBridge.apiFetch('/orders');
            BackendBridge.setMem(STORAGE.orders, (od && od.ok) ? BackendBridge.backendOrdersToLocal(od.data && od.data.orders) : []);
          } catch (e) {}
          showToast('Order ' + orderId + ' set to ' + newStatus + '.', 'success');
          renderAdminDashboard();
        });
      }
    }
  });

  document.addEventListener('click', (e) => {
    const cancelBtn = e.target.closest('[data-ek2-row-cancel]');
    if (cancelBtn) {
      const orderId = cancelBtn.dataset.ek2RowCancel;
      const orders = readJSON(STORAGE.orders, []);
      const order = orders.find((o) => normalizeOrderId(o.id) === orderId);
      if (order && String(order.status || '').toLowerCase() !== 'cancelled') {
        const previousStatus = order.status;
        order.status = 'Cancelled';
        writeJSON(STORAGE.orders, orders);  // optimistic
        BackendBridge.apiFetch('/orders/' + encodeURIComponent(order.id) + '/status', {
          method: 'PATCH',
          body: { status: 'Cancelled' }
        }).then(async (res) => {
          if (!res || !res.ok) {
            order.status = previousStatus;
            writeJSON(STORAGE.orders, orders);
            showToast((res && res.error && res.error.message) || 'Could not cancel order.', 'error');
            renderAdminDashboard();
            return;
          }
          try {
            const od = await BackendBridge.apiFetch('/orders');
            BackendBridge.setMem(STORAGE.orders, (od && od.ok) ? BackendBridge.backendOrdersToLocal(od.data && od.data.orders) : []);
          } catch (err) {}
          showToast('Order ' + orderId + ' cancelled.', 'warning');
          renderAdminDashboard();
        });
      }
      return;
    }
    const setToggle = e.target.closest('[data-ek2-setting][data-setting-type="toggle"]');
    if (setToggle) {
      const key = setToggle.dataset.ek2Setting;
      const settings = BackendBridge._adminSettings || { lowStockThreshold: 3, autoCloseToasts: true, compactTables: false };
      settings[key] = !settings[key];
      BackendBridge._adminSettings = settings;
      BackendBridge.apiFetch('/admin/settings', { method: 'PATCH', body: { [key]: settings[key] } });
      setToggle.classList.toggle('is-on', settings[key]);
      setToggle.setAttribute('aria-pressed', settings[key] ? 'true' : 'false');
      showToast('Setting saved.', 'success');
    }
    // Admin coupon CRUD actions
    const cEdit = e.target.closest('[data-coupon-edit]');
    if (cEdit) { ek2HandleCouponAction('edit', cEdit.dataset.couponEdit); return; }
    const cToggle = e.target.closest('[data-coupon-toggle]');
    if (cToggle) { ek2HandleCouponAction('toggle', cToggle.dataset.couponToggle); return; }
    const cDel = e.target.closest('[data-coupon-delete]');
    if (cDel) { ek2HandleCouponAction('delete', cDel.dataset.couponDelete); return; }
    const cGift = e.target.closest('[data-coupon-gift]');
    if (cGift) { ek2HandleCouponAction('gift', cGift.dataset.couponGift); return; }
  });

  document.addEventListener('input', (e) => {
    const setNum = e.target.closest('[data-ek2-setting][data-setting-type="number"]');
    if (setNum) {
      const key = setNum.dataset.ek2Setting;
      const settings = BackendBridge._adminSettings || { lowStockThreshold: 3, autoCloseToasts: true, compactTables: false };
      settings[key] = parseInt(setNum.value, 10) || 0;
      BackendBridge._adminSettings = settings;
      BackendBridge.apiFetch('/admin/settings', { method: 'PATCH', body: { [key]: settings[key] } });
    }
  });

  // ---------- ek2.boot -----------------------------------------------
  function ek2Boot() {
    // make sure stack exists right away
    ek2EnsureToastStack();
    // contextual assistant after the floating widget is built
    window.setTimeout(ek2InitContextualAssistant, 0);
    // forms validation
    ek2InitAuthValidation();
    ek2InitContactValidation();
    ek2InitPaymentValidation();
    // contact CV upload (premium custom file input)
    ek2InitCvUpload();
    // payment-page address autofill from most recent saved order address
    ek2PrefillPaymentAddress();
    // account page
    ek2InitAccountPage();
    // admin
    ek2InitAdminUpgrade();
    // navbar account link
    ek2InjectAccountNavLink();
    // hook auth page redirect param to allow Account.html
    if (document.body.classList.contains('auth-page')) {
      const params = new URLSearchParams(window.location.search);
      const r = String(params.get('redirect') || '').trim();
      if (/^Account\.html$/i.test(r)) {
        localStorage.setItem(STORAGE.redirect, 'Account.html');
      }
    }
  }

  // run after the existing async init() finishes hydrating backend state
  document.addEventListener('DOMContentLoaded', () => {
    Promise.resolve(eliteKitsInitPromise).then(ek2Boot);
  });

  /* ===================================================================
     END ELITE KITS APP UPGRADE LAYER (v2)
  =================================================================== */

  window.EliteKitsStore = {
    products: PRODUCTS,
    addToCart,
    removeFromCart,
    renderCart,
    calculateCartTotals,
    addToWishlist,
    removeFromWishlist,
    applyProductFilters,
    renderCartPage,
    renderWishlistPage
  };
})();
