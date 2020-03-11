const URLS = type => {
  const V1 = 'https://public-ubiservices.ubi.com/v1/spaces/',
        V2 = 'https://public-ubiservices.ubi.com/v2/profiles?';

  const gd = platform => {
    return {
      uplay: '5172a557-50b5-4665-b7db-e3f2e8c5041d/sandboxes/OSBOR_PC_LNCH_A/',
      psn: '05bfb3f7-6c21-4c42-be1f-97a33fb5cf66/sandboxes/OSBOR_PS4_LNCH_A/',
      xbl: '98a601e5-ca91-4440-b1c5-753f601a2c90/sandboxes/OSBOR_XBOXONE_LNCH_A/'
    }[platform]
  };

  const base = platform => V1 + gd(platform);

  return {
    LOGIN: 'https://public-ubiservices.ubi.com/v3/profiles/sessions?',
    STATUS: 'https://game-status-api.ubisoft.com/v1/instances?appIds=',
    APPID: platform => {
      return {
        uplay: 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40',
        psn: 'fb4cc4c9-2063-461d-a1e8-84a7d36525fc',
        xbl: '4008612d-3baf-49e4-957a-33066726a7bc'
      }[platform]
    },
    ID: (platform, query) =>
      `${V2}platformType=${platform}&nameOnPlatform=${query.join(',')}`,
    USERNAME: query =>
      `${V2}userId=${query.join(',')}`,
    LEVEL: (platform, query) =>
      `${base(platform)}r6playerprofile/playerprofile/progressions?profile_ids=${query.join(',')}`,
    PLAYTIME: (platform, query) =>
      `${base(platform)}playerstats2/statistics?statistics=` +
      `casualpvp_timeplayed,rankedpvp_timeplayed,generalpvp_timeplayed&populations=${query.join(',')}`,
    STATS: (platform, query, stats) =>
      `${base(platform)}playerstats2/statistics?statistics=${stats}&populations=${query.join(',')}`,
    RANK: (platform, query, season, region) =>
      `${base(platform)}r6karma/players?board_id=pvp_ranked&season_id=${season}&profile_ids=` +
      `${query.join(',')}&region_id=${region}`,
  }[type];
};

const WEAPONTYPES = {
  1: 'assault',
  2: 'smg',
  3: 'lmg',
  4: 'marksman',
  5: 'pistol',
  6: 'shotgun',
  7: 'mp',
  8: 'shield',
  9: 'launcher',
  B: 'utility'
};

const WEAPONS = [
  // assault
  { name: 'L85A2', id: 'B79310C6', category: 'assault' },
  { name: 'F2', id: '9B2CA14F', category: 'assault' },
  { name: '416-C CARBINE', id: '106FE714D', category: 'assault' },
  { name: 'R4-C', id: 'B79310D2', category: 'assault' },
  { name: '556XI', id: 'B79310D4', category: 'assault' },
  { name: 'Type-89', id: '9A25C4B26', category: 'assault' },
  { name: '552 Commando', id: 'B79310D3', category: 'assault' },
  { name: 'PARA-308', id: '8ACBED9B8', category: 'assault' },
  { name: 'AR33', id: 'B79310D8', category: 'assault' },
  { name: 'G36C', id: 'B79310DE', category: 'assault' },
  { name: 'C8-SFW', id: '2CEABF00B', category: 'assault' },
  { name: 'M4', id: '1EFE81B5D5', category: 'assault' },
  { name: 'M762', id: 'E50FB57FB', category: 'assault' },
  { name: 'C7E', id: 'A3038BA91', category: 'assault' },
  { name: 'AK-12', id: '106FE7150', category: 'assault' },
  { name: 'MK17 CQB', id: '2CEAAA814', category: 'assault' },
  { name: 'AUG A2', id: '9B2CA14A', category: 'assault' },
  { name: 'v308', id: 'BE9996F2D', category: 'assault' },
  { name: 'AK-74M', id: '23D027C51C', category: 'assault' },
  { name: 'Commando 9', id: 'BE998B05E', category: 'assault' },
  { name: 'AR-15.50', id: '1EFE80F033', category: 'assault' },
  { name: 'F90', id: '2902BBFED9', category: 'assault' },
  { name: 'ARX200', id: '2418EC4362', category: 'assault' },
  { name: 'SPEAR .308', id: 'BE99AD3BD', category: 'assault' },

  // smg
  { name: 'MPX', id: '5BD3A85FC', category: 'smg' },
  { name: 'MP7', id: '106FE714F', category: 'smg' },
  { name: 'MP5', id: 'B79310C1', category: 'smg' },
  { name: 'UMP45', id: 'B79310CF', category: 'smg' },
  { name: 'Vector .45 ACP', id: 'A3038BA92', category: 'smg' },
  { name: 'M12', id: '8ACBEC5F2', category: 'smg' },
  { name: 'SMG-12', id: '128C51CBED', category: 'smg' },
  { name: 'Scorpion EVO 3 A1', id: 'E50FA8B51', category: 'smg' },
  { name: 'MP5K', id: 'B79310D1', category: 'smg' },
  { name: '9x19VSN', id: '106FE7151', category: 'smg' },
  { name: 'P90', id: 'B79310C7', category: 'smg' },
  { name: 'K1A', id: '128C51CBEF', category: 'smg' },
  { name: '9mm C1', id: '2CEABC77A', category: 'smg' },
  { name: 'Mx4 Storm', id: '172522E967', category: 'smg' },
  { name: 'T-5 SMG', id: 'B699FDA28', category: 'smg' },
  { name: 'MP5SD', id: '99EB07773', category: 'smg' },
  { name: 'FMG-9', id: 'B79310D0', category: 'smg' },
  { name: 'AUG A3', id: '2418EC6F2C', category: 'smg' },
  { name: 'PDW9', id: 'A3038BA94', category: 'smg' },
  { name: 'P10 RONI', id: '2902BB46BB', category: 'smg' },

  // lmg
  { name: 'ALDA 5.56', id: '172522E96A', category: 'lmg' },
  { name: 'G8A1', id: '106FE714C', category: 'lmg' },
  { name: '6P41', id: 'B79310DA', category: 'lmg' },
  { name: 'T-95 LSW', id: 'B699FDA29', category: 'lmg' },
  { name: 'LMG-E', id: 'E50FB57FC', category: 'lmg' },
  { name: 'M249', id: '8ACBE8797', category: 'lmg' },
  { name: 'M249 SAW', id: '2902BB7B8C', category: 'lmg' },

  // marksman
  { name: 'OTs-03', id: '106FE7152', category: 'marksman' },
  { name: 'CAMRS', id: '2CEAAB41D', category: 'marksman' },
  { name: 'Mk 14 EBR', id: '128C5259FA', category: 'marksman' },
  { name: '417', id: 'B79310C0', category: 'marksman' },
  { name: 'SR-25', id: '2CEABFB43', category: 'marksman' },
  { name: 'CSRX 300', id: '33E28FCCA0', category: 'marksman' },

  // pistol
  { name: 'M45 MEUSOC', id: 'B79310D7', category: 'pistol' },
  { name: 'P12', id: 'B79310CB', category: 'pistol' },
  { name: 'LFP586', id: 'B79310C8', category: 'pistol' },
  { name: 'P226 MK 25', id: 'B79310CA', category: 'pistol' },
  { name: 'D-50', id: '53AEC9396', category: 'pistol' },
  { name: 'P9', id: 'B79310D9', category: 'pistol' },
  { name: 'PRB92', id: '8ACBEC355', category: 'pistol' },
  { name: 'MK1 9mm', id: '37ACC03F7', category: 'pistol' },
  { name: 'GSH-18', id: '106FE7153', category: 'pistol' },
  { name: 'PMM', id: '9B2CB308', category: 'pistol' },
  { name: 'RG15', id: 'E50FB57FD', category: 'pistol' },
  { name: 'Keratos .357', id: '199D70994A', category: 'pistol' },
  { name: 'Q-929', id: 'B699FDA2A', category: 'pistol' },
  { name: '.44 Mag Semi-Auto', id: '2418EC5F35', category: 'pistol' },
  { name: '5.7 USG', id: '9B2CA14C', category: 'pistol' },
  { name: 'P229', id: '959B5DBD4', category: 'pistol' },
  { name: 'USP40', id: 'A3038BA93', category: 'pistol' },
  { name: 'SDP 9mm', id: '2A69013364', category: 'pistol' },
  { name: 'P-10C', id: '1EFE80F702', category: 'pistol' },
  { name: 'Bailiff 410', id: '172522E96B', category: 'pistol' },
  { name: '1911 TACOPS', id: '1EFE81B5D4', category: 'pistol' },

  // shotgun
  { name: 'M590A1', id: '9B2CA14E', category: 'shotgun' },
  { name: 'ITA12S', id: 'A3038BA90', category: 'shotgun' },
  { name: 'M1014', id: 'B79310CC', category: 'shotgun' },
  { name: 'M870', id: '106FE714E', category: 'shotgun' },
  { name: 'Super 90', id: '2CEABFF54', category: 'shotgun' },
  { name: 'Supernova', id: '959B746E6', category: 'shotgun' },
  { name: 'SPAS-15', id: '8ACBEBD23', category: 'shotgun' },
  { name: 'SG-CQB', id: '9B2CA14B', category: 'shotgun' },
  { name: 'SIX12', id: 'B699FDA2B', category: 'shotgun' },
  { name: 'SASG-12', id: '9B2CB313', category: 'shotgun' },
  { name: 'BOSG.12.2', id: '128C51DEC8', category: 'shotgun' },
  { name: 'SPAS-12', id: '2CEABF739', category: 'shotgun' },
  { name: 'Super Shorty', id: '1EFE80F701', category: 'shotgun' },
  { name: 'SIX12 SD', id: 'B699FDA2C', category: 'shotgun' },
  { name: 'FO-12', id: 'E50FB57FA', category: 'shotgun' },
  { name: 'ITA12L', id: 'A3038B5A5', category: 'shotgun' },
  { name: 'ACS12', id: 'BE99AD3BE', category: 'shotgun' },
  { name: 'TCSG12', id: '2418EC7D3A', category: 'shotgun' },

  // mp
  { name: 'SMG-11', id: 'B79310CE', category: 'mp' },
  { name: 'Bearing 9', id: '99EB0571E', category: 'mp' },
  { name: 'SPSMG9', id: '1EFE81B5D6', category: 'mp' },
  { name: 'C75 Auto', id: '128C51DEC6', category: 'mp' },

  // shield
  // { name: 'G52-Tactical Shield', id: '', category: 'shield' }, // probably impossible
  // { name: 'Le Roc', id: '', category: 'shield' },
  // { name: 'Ballistic Shield', id: '', category: 'shield' },
  // { name: 'CCE Shield', id: '', category: 'shield' },

  // launcher // can't figure out :(
  // utility

  // missing:
  // [
  //   '24F948E770', '1F7D4C7899',
  //   '96ED81DE7',  '30F8369CB2',
  //   'E3707E47E',  '106FC87AF',
  //   '80CABEDA0',  'B79310B8',
  //   'A92106CAE',  '106FC87AD',
  //   '251D519689'
  // ]
];

const OPERATORS = [
  {
    name: 'recruitsas',
    readableName: 'Recruit SAS',
    role: 'recruit',
    ctu: 'SAS',
    badge: '3g0rYOq',
    fullIndex: '1:1',
    gadget: null
  },
  {
    name: 'recruitfbi',
    readableName: 'Recruit FBI SWAT',
    role: 'recruit',
    ctu: 'FBI SWAT',
    badge: 'Pd7krMT',
    fullIndex: '1:2',
    gadget: null
  },
  {
    name: 'recruitgign',
    readableName: 'Recruit GIGN',
    role: 'recruit',
    ctu: 'GIGN',
    badge: 'D05DqQW',
    fullIndex: '1:3',
    gadget: null
  },
  {
    name: 'recruitspetsnaz',
    readableName: 'Recruit Spetsnaz',
    role: 'recruit',
    ctu: 'Spetsnaz',
    badge: 'MEvmmGf',
    fullIndex: '1:4',
    gadget: null
  },
  {
    name: 'recruitgsg',
    readableName: 'Recruit GSG 9',
    role: 'recruit',
    ctu: 'GSG 9',
    badge: 'mF8eGXj',
    fullIndex: '1:5',
    gadget: null
  },
  {
    name: 'smoke',
    readableName: 'Smoke',
    role: 'defender',
    ctu: 'SAS',
    badge: 'tkxDFWg',
    fullIndex: '2:1',
    gadget: [
      { id: type => `operator${type}_smoke_poisongaskill`, name: 'Poison Gas Kills' }
    ]
  },
  {
    name: 'mute',
    readableName: 'Mute',
    role: 'defender',
    ctu: 'SAS',
    badge: 'xJ6iqr1',
    fullIndex: '3:1',
    gadget: [
      { id: type => `operator${type}_mute_gadgetjammed`, name: 'Gadgets Jammed' },
      { id: type => `operator${type}_mute_jammerdeployed`, name: 'Jammers Deployed' }
    ]
  },
  {
    name: 'sledge',
    readableName: 'Sledge',
    role: 'attacker',
    ctu: 'SAS',
    badge: 'AKn1ULn',
    fullIndex: '4:1',
    gadget: [
      { id: type => `operator${type}_sledge_hammerkill`, name: 'Kills with Breaching Hammer' },
      { id: type => `operator${type}_sledge_hammerhole`, name: 'Destruction by Breaching Hammer' }
    ]
  },
  {
    name: 'thatcher',
    readableName: 'Thatcher',
    role: 'attacker',
    ctu: 'SAS',
    badge: 'MYl1Gl2',
    fullIndex: '5:1',
    gadget: [
      { id: type => `operator${type}_thatcher_gadgetdestroywithemp`, name: 'Gadgets Destroyed by EMP' }
    ]
  },
  {
    name: 'castle',
    readableName: 'Castle',
    role: 'defender',
    ctu: 'FBI SWAT',
    badge: 'Dr5x7e7',
    fullIndex: '2:2',
    gadget: [
      { id: type => `operator${type}_castle_kevlarbarricadedeployed`, name: 'Armor Panels Deployed' }
    ]
  },
  {
    name: 'pulse',
    readableName: 'Pulse',
    role: 'defender',
    ctu: 'FBI SWAT',
    badge: 'y6hSeej',
    fullIndex: '4:2',
    gadget: [
      { id: type => `operator${type}_pulse_heartbeatassist`, name: 'Heartbeat Scanner Assists' },
      { id: type => `operator${type}_pulse_heartbeatspot`, name: 'Heartbeats Spotted' }
    ]
  },
  {
    name: 'ash',
    readableName: 'Ash',
    role: 'attacker',
    ctu: 'FBI SWAT',
    badge: 'gXkH9Cl',
    fullIndex: '3:2',
    gadget: [
      { id: type => `operator${type}_ash_bonfirekill`, name: 'Kills with Breaching Round' },
      { id: type => `operator${type}_ash_bonfirewallbreached`, name: 'Destruction by Breaching Round' }
    ]
  },
  {
    name: 'thermite',
    readableName: 'Thermite',
    role: 'attacker',
    ctu: 'FBI SWAT',
    badge: '9uVh301',
    fullIndex: '5:2',
    gadget: [
      { id: type => `operator${type}_thermite_chargekill`, name: 'Kills with Thermal Charge' },
      { id: type => `operator${type}_thermite_reinforcementbreached`, name: 'Reinforcements Breached by Thermal Charge' },
      { id: type => `operator${type}_thermite_chargedeployed`, name: 'Thermal Charges Deployed' }
    ]
  },
  {
    name: 'doc',
    readableName: 'Doc',
    role: 'defender',
    ctu: 'GIGN',
    badge: 'MzJAlf9',
    fullIndex: '2:3',
    gadget: [
      { id: type => `operator${type}_doc_teammaterevive`, name: 'Teammates Revived' },
      { id: type => `operator${type}_doc_selfrevive`, name: 'Self Revives' },
      { id: type => `operator${type}_doc_hostagerevive`, name: 'Hostages Revived' }
    ]
  },
  {
    name: 'rook',
    readableName: 'Rook',
    role: 'defender',
    ctu: 'GIGN',
    badge: 'AZ2o09d',
    fullIndex: '3:3',
    gadget: [
      { id: type => `operator${type}_rook_armortakenteammate`, name: 'Armor Plate Taken by Teammates' },
      { id: type => `operator${type}_rook_armortakenourself`, name: 'Armors Taken for Self' },
      { id: type => `operator${type}_rook_armorboxdeployed`, name: 'Armor Crates Deployed' }
    ]
  },
  {
    name: 'twitch',
    readableName: 'Twitch',
    role: 'attacker',
    ctu: 'GIGN',
    badge: 'OHZykQL',
    fullIndex: '4:3',
    gadget: [
      { id: type => `operator${type}_twitch_shockdronekill`, name: 'Kills with Shock Drone' },
      { id: type => `operator${type}_twitch_gadgetdestroybyshockdrone`, name: 'Gadgets Destroyed by Shock Drone' }
    ]
  },
  {
    name: 'montagne',
    readableName: 'Montagne',
    role: 'attacker',
    ctu: 'GIGN',
    badge: 'p2gGMAo',
    fullIndex: '5:3',
    gadget: [
      { id: type => `operator${type}_montagne_shieldblockdamage`, name: 'Bullets Blocked by Extended Shield' }
    ]
  },
  {
    name: 'kapkan',
    readableName: 'Kapkan',
    role: 'defender',
    ctu: 'Spetsnaz',
    badge: 'LPhga5G',
    fullIndex: '4:4',
    gadget: [
      { id: type => `operator${type}_kapkan_boobytrapkill`, name: 'EDD Kills' },
      { id: type => `operator${type}_kapkan_boobytrapdeployed`, name: 'EDD Deployed' }
    ]
  },
  {
    name: 'tachanka',
    readableName: 'Tachanka',
    role: 'defender',
    ctu: 'Spetsnaz',
    badge: 'bRdSEI2',
    fullIndex: '5:4',
    gadget: [
      { id: type => `operator${type}_tachanka_turretkill`, name: 'Mounted LMG Kills' },
      { id: type => `operator${type}_tachanka_turretdeployed`, name: 'Mounted LMG Deployed' }
    ]
  },
  {
    name: 'glaz',
    readableName: 'Glaz',
    role: 'attacker',
    ctu: 'Spetsnaz',
    badge: 'Fdr50yV',
    fullIndex: '2:4',
    gadget: [
      { id: type => `operator${type}_glaz_sniperkill`, name: 'Sniper Kills' },
      { id: type => `operator${type}_glaz_sniperpenetrationkill`, name: 'Penetration Sniper Kills' }
    ]
  },
  {
    name: 'fuze',
    readableName: 'Fuze',
    role: 'attacker',
    ctu: 'Spetsnaz',
    badge: 'WpxoTw2',
    fullIndex: '3:4',
    gadget: [
      { id: type => `operator${type}_fuze_clusterchargekill`, name: 'Cluster Charge Kills' }
    ]
  },
  {
    name: 'jager',
    readableName: 'Jäger',
    role: 'defender',
    ctu: 'GSG 9',
    badge: 'ykglXiD',
    fullIndex: '4:5',
    gadget: [
      { id: type => `operator${type}_jager_gadgetdestroybycatcher`, name: 'Gadget Destroyed by ADS' }
    ]
  },
  {
    name: 'bandit',
    readableName: 'Bandit',
    role: 'defender',
    ctu: 'GSG 9',
    badge: 'iBdRyRn',
    fullIndex: '5:5',
    gadget: [
      { id: type => `operator${type}_bandit_batterykill`, name: 'Shock Wire Kills' }
    ]
  },
  {
    name: 'blitz',
    readableName: 'Blitz',
    role: 'attacker',
    ctu: 'GSG 9',
    badge: 'IhkK497',
    fullIndex: '2:5',
    gadget: [
      { id: type => `operator${type}_blitz_flashedenemy`, name: 'Enemies Blinded by Flash Shield' },
      { id: type => `operator${type}_blitz_flashfollowupkills`, name: 'Post-flash follow up kills' },
      { id: type => `operator${type}_blitz_flashshieldassist`, name: 'Post-flash assisted kills' }
    ]
  },
  {
    name: 'iq',
    readableName: 'IQ',
    role: 'attacker',
    ctu: 'GSG 9',
    badge: 'UtDoLtT',
    fullIndex: '3:5',
    gadget: [
      { id: type => `operator${type}_iq_gadgetspotbyef`, name: 'Gadgets Spotted by Electronics Detector' }
    ]
  },
  {
    name: 'frost',
    readableName: 'Frost',
    role: 'defender',
    ctu: 'JTF2',
    badge: 'prGz6E6',
    fullIndex: '3:6',
    gadget: [
      { id: type => `operator${type}_frost_dbno`, name: 'Enemies Caught in Welcome Mats' }
    ]
  },
  {
    name: 'buck',
    readableName: 'Buck',
    role: 'attacker',
    ctu: 'JTF2',
    badge: 'nRSxJd2',
    fullIndex: '2:6',
    gadget: [
      { id: type => `operator${type}_buck_kill`, name: 'Kills with the Skeleton Key' }
    ]
  },
  {
    name: 'valkyrie',
    readableName: 'Valkyrie',
    role: 'defender',
    ctu: 'Navy SEALs',
    badge: 'cG55PvJ',
    fullIndex: '3:7',
    gadget: [
      { id: type => `operator${type}_valkyrie_camdeployed`, name: 'Black Eye Cameras Deployed' }
    ]
  },
  {
    name: 'blackbeard',
    readableName: 'Blackbeard',
    role: 'attacker',
    ctu: 'Navy SEALs',
    badge: 'h12akm4',
    fullIndex: '2:7',
    gadget: [
      { id: type => `operator${type}_blackbeard_gunshieldblockdamage`, name: 'Bullets Stopped by Shield' }
    ]
  },
  {
    name: 'caveira',
    readableName: 'Caveira',
    role: 'defender',
    ctu: 'BOPE',
    badge: 'X8Wn7uP',
    fullIndex: '3:8',
    gadget: [
      { id: type => `operator${type}_caveira_interrogations`, name: 'Successful Interrogations Performed' }
    ]
  },
  {
    name: 'capitao',
    readableName: 'Capitão',
    role: 'attacker',
    ctu: 'BOPE',
    badge: 'Qvkut3P',
    fullIndex: '2:8',
    gadget: [
      { id: type => `operator${type}_capitao_lethaldartkills`, name: 'Kills with Asphyxiating Bolts' }
    ]
  },
  {
    name: 'echo',
    readableName: 'Echo',
    role: 'defender',
    ctu: 'SAT',
    badge: 'JLXXREk',
    fullIndex: '3:9',
    gadget: [
      { id: type => `operator${type}_echo_enemy_sonicburst_affected`, name: 'Enemies Disoriented by Yokai' }
    ]
  },
  {
    name: 'hibana',
    readableName: 'Hibana',
    role: 'attacker',
    ctu: 'SAT',
    badge: 'ChqyReH',
    fullIndex: '2:9',
    gadget: [
      { id: type => `operator${type}_hibana_detonate_projectile`, name: 'X-KAIROS Pellets Detonated' }
    ]
  },
  {
    name: 'mira',
    readableName: 'Mira',
    role: 'defender',
    ctu: 'GEO',
    badge: 'BXnayiP',
    fullIndex: '3:A',
    gadget: [
      { id: type => `operator${type}_black_mirror_gadget_deployed`, name: 'Black Mirror Deployed' }
    ]
  },
  {
    name: 'jackal',
    readableName: 'Jackal',
    role: 'attacker',
    ctu: 'GEO',
    badge: 'hvLklzC',
    fullIndex: '2:A',
    gadget: [
      { id: type => `operator${type}_cazador_assist_kill`, name: 'Eyenox Tracking Assist' }
    ]
  },
  {
    name: 'lesion',
    readableName: 'Lesion',
    role: 'defender',
    ctu: 'SDU',
    badge: 'w3PjcvZ',
    fullIndex: '3:B',
    gadget: [
      { id: type => `operator${type}_caltrop_enemy_affected`, name: 'Enemies Poisoned by Gu Mine' }
    ]
  },
  {
    name: 'ying',
    readableName: 'Ying',
    role: 'attacker',
    ctu: 'SDU',
    badge: 'wyJwvWZ',
    fullIndex: '2:B',
    gadget: [
      { id: type => `operator${type}_dazzler_gadget_detonate`, name: 'Candela Devices Detonated' }
    ]
  },
  {
    name: 'ela',
    readableName: 'Ela',
    role: 'defender',
    ctu: 'GROM',
    badge: 'IRWSllb',
    fullIndex: '2:C',
    gadget: [
      { id: type => `operator${type}_concussionmine_detonate`, name: 'Grzmot Mines Detonated' }
    ]
  },
  {
    name: 'zofia',
    readableName: 'Zofia',
    role: 'attacker',
    ctu: 'GROM',
    badge: 'HRg8qXs',
    fullIndex: '3:C',
    gadget: [
      { id: type => `operator${type}_concussiongrenade_detonate`, name: 'Concussion Grenades Detonated' }
    ]
  },
  {
    name: 'vigil',
    readableName: 'Vigil',
    role: 'defender',
    ctu: '707th SMB',
    badge: 'vGg39cP',
    fullIndex: '3:D',
    gadget: [
      { id: type => `operator${type}_attackerdrone_diminishedrealitymode`, name: 'Drones Deceived' }
    ]
  },
  {
    name: 'dokkaebi',
    readableName: 'Dokkaebi',
    role: 'attacker',
    ctu: '707th SMB',
    badge: 'qYfoWsk',
    fullIndex: '2:D',
    gadget: [
      { id: type => `operator${type}_phoneshacked`, name: 'Phones Hacked' }
    ]
  },
  {
    name: 'lion',
    readableName: 'Lion',
    role: 'attacker',
    ctu: 'CBRN',
    badge: 'EgMlCaV',
    fullIndex: '3:E',
    gadget: [
      { id: type => `operator${type}_tagger_tagdevice_spot`, name: 'Enemies Detected by EE-ONE-D' }
    ]
  },
  {
    name: 'finka',
    readableName: 'Finka',
    role: 'attacker',
    ctu: 'CBRN',
    badge: 'dhemeuU',
    fullIndex: '4:E',
    gadget: [
      { id: type => `operator${type}_rush_adrenalinerush`, name: 'Adrenal Surge Bonus' }
    ]
  },
  {
    name: 'maestro',
    readableName: 'Maestro',
    role: 'defender',
    ctu: 'GIS',
    badge: 'd0Zy3i4',
    fullIndex: '2:F',
    gadget: [
      { id: type => `operator${type}_barrage_killswithturret`, name: 'Enemies Killed by Evil Eye' }
    ]
  },
  {
    name: 'alibi',
    readableName: 'Alibi',
    role: 'defender',
    ctu: 'GIS',
    badge: 'NXEI1ZN',
    fullIndex: '3:F',
    gadget: [
      { id: type => `operator${type}_deceiver_revealedattackers`, name: 'Enemies Tricked by Prisma' }
    ]
  },
  {
    name: 'clash',
    readableName: 'Clash',
    role: 'defender',
    ctu: 'GSUTR',
    badge: 'EYGBED9',
    fullIndex: '3:10',
    gadget: [
      { id: type => `operator${type}_clash_sloweddown`, name: 'Enemies Killed While Slowed Down' }
    ]
  },
  {
    name: 'maverick',
    readableName: 'Maverick',
    role: 'attacker',
    ctu: 'GSUTR',
    badge: 'hF2gJuY',
    fullIndex: '2:10',
    gadget: [
      { id: type => `operator${type}_maverick_wallbreached`, name: 'Walls Breached With Torch' }
    ]
  },
  {
    name: 'kaid',
    readableName: 'Kaid',
    role: 'defender',
    ctu: 'GIGR',
    badge: 'l6UPyA8',
    fullIndex: '3:11',
    gadget: [
      { id: type => `operator${type}_kaid_electroclawelectrify`, name: 'Electroclaws Successfully Deployed' }
    ]
  },
  {
    name: 'nomad',
    readableName: 'Nomad',
    role: 'attacker',
    ctu: 'GIGR',
    badge: 'U8sOErk',
    fullIndex: '2:11',
    gadget: [
      { id: type => `operator${type}_nomad_airjabdetonate`, name: 'Airjabs Detonated' }
    ]
  },
  {
    name: 'mozzie',
    readableName: 'Mozzie',
    role: 'defender',
    ctu: 'SASR',
    badge: 'RHwnp7d',
    fullIndex: '2:12',
    gadget: [
      { id: type => `operator${type}_mozzie_droneshacked`, name: 'Drones Hacked' }
    ]
  },
  {
    name: 'gridlock',
    readableName: 'Gridlock',
    role: 'attacker',
    ctu: 'SASR',
    badge: 'A95h9XN',
    fullIndex: '3:12',
    gadget: [
      { id: type => `operator${type}_gridlock_traxdeployed`, name: 'Trax Deployed' }
    ]
  },
  {
    name: 'warden',
    readableName: 'Warden',
    role: 'defender',
    ctu: 'Secret Service',
    badge: 'OUhPdNj',
    fullIndex: '2:14',
    gadget: [
      { id: type => `operator${type}_warden_killswithglasses`, name: 'Kills While Using Glance' }
    ]
  },
  {
    name: 'nokk',
    readableName: 'Nøkk',
    role: 'attacker',
    ctu: 'Jaeger Corps',
    badge: 'P0tYlx7',
    fullIndex: '2:13',
    gadget: [
      { id: type => `operator${type}_nokk_observationtooldeceived`, name: 'Observation Tools Deceived' }
    ]
  },
  {
    name: 'goyo',
    readableName: 'Goyo',
    role: 'defender',
    ctu: 'Fuerzas Especiales',
    badge: 's2AjbNb',
    fullIndex: '2:15',
    gadget: [
      { id: type => `operator${type}_goyo_volcandetonate`, name: 'Volcán Detonated by Your Team' }
    ]
  },
  {
    name: 'amaru',
    readableName: 'Amaru',
    role: 'attacker',
    ctu: 'APCA',
    badge: 'BL4ue5Y',
    fullIndex: '2:16',
    gadget: [
      { id: type => `operator${type}_amaru_distancereeled`, name: 'Total Distance Reeled' }
    ]
  },
  {
    name: 'wamai',
    readableName: 'Wamai',
    role: 'defender',
    ctu: 'NIGHTHAVEN',
    badge: '497uSOq',
    fullIndex: '3:17',
    gadget: [
      { id: type => `operator${type}_wamai_gadgetdestroybymagnet`, name: 'Projectiles Captured' }
    ]
  },
  {
    name: 'kali',
    readableName: 'Kali',
    role: 'attacker',
    ctu: 'NIGHTHAVEN',
    badge: 'UH389qh',
    fullIndex: '2:17',
    gadget: [
      { id: type => `operator${type}_kali_gadgetdestroywithexplosivelance`, name: 'Gadgets Destroyed with the LV' }
    ]
  },
  {
    name: 'oryx',
    readableName: 'Oryx',
    role: 'defender',
    ctu: 'Unaffiliated',
    badge: 'vcUGkSs',
    fullIndex: '2:18',
    gadget: [
      { id: type => `operator${type}_oryx_killsafterdash`, name: 'Kills after Remah Dashes' }
    ]
  },
  {
    name: 'iana',
    readableName: 'Iana',
    role: 'attacker',
    ctu: 'REU',
    badge: 'fZbmkVz',
    fullIndex: '2:19',
    gadget: [
      { id: type => `operator${type}_iana_killsafterreplicator`, name: 'Kills after using Replicators' }
    ]
  }
];

const STATS = {
  general: type => [
    `general${type}_bulletfired`,
    `general${type}_bullethit`,
    `general${type}_headshot`,
    `general${type}_death`,
    `general${type}_killassists`,
    `general${type}_kills`,
    `general${type}_matchlost`,
    `general${type}_matchplayed`,
    `general${type}_matchwon`,
    `general${type}_meleekills`,
    `general${type}_penetrationkills`,
    `general${type}_revive`,
    `general${type}_timeplayed`,
    `general${type}_blindkills`,
    `general${type}_dbno`,
    `general${type}_dbnoassists`,
    `general${type}_gadgetdestroy`,
    `general${type}_barricadedeployed`,
    `general${type}_reinforcementdeploy`,
    `general${type}_rappelbreach`,
    `general${type}_suicide`,
    `general${type}_distancetravelled`,

    `general${type}_hostagedefense`,
    `general${type}_hostagerescue`,
    `general${type}_revivedenied`,
    `general${type}_serveraggression`,
    `general${type}_serverdefender`,
    `general${type}_servershacked`,

    `custom${type}_timeplayed`
  ],
  ranked: () => [
    'rankedpvp_kills',
    'rankedpvp_death',
    'rankedpvp_matchlost',
    'rankedpvp_matchplayed',
    'rankedpvp_matchwon',
    'rankedpvp_timeplayed',
  ],
  casual: () => [
    'casualpvp_kills',
    'casualpvp_death',
    'casualpvp_matchlost',
    'casualpvp_matchplayed',
    'casualpvp_matchwon',
    'casualpvp_timeplayed'
  ],
  mode: () => [
    'plantbombpvp_bestscore',
    'plantbombpvp_matchlost',
    'plantbombpvp_matchplayed',
    'plantbombpvp_matchwon',
    'plantbombpvp_timeplayed',

    'secureareapvp_bestscore',
    'secureareapvp_matchlost',
    'secureareapvp_matchplayed',
    'secureareapvp_matchwon',
    'secureareapvp_timeplayed',

    'rescuehostagepvp_bestscore',
    'rescuehostagepvp_matchlost',
    'rescuehostagepvp_matchplayed',
    'rescuehostagepvp_matchwon',
    'rescuehostagepvp_timeplayed'
  ],
  weaponTypes: type => [
    `weapontype${type}_kills`,
    `weapontype${type}_death`,
    `weapontype${type}_headshot`,
    `weapontype${type}_bulletfired`,
    `weapontype${type}_bullethit`,
    `weapontype${type}_chosen`
  ],
  weapons: type => [
    `weapon${type}_kills`,
    `weapon${type}_death`,
    `weapon${type}_headshot`,
    `weapon${type}_bulletfired`,
    `weapon${type}_bullethit`,
    `weapon${type}_chosen`
  ],
  operators: type => [
    `operator${type}_kills`,
    `operator${type}_death`,
    `operator${type}_roundwon`,
    `operator${type}_roundlost`,
    `operator${type}_headshot`,
    `operator${type}_meleekills`,
    `operator${type}_dbno`,
    `operator${type}_totalxp`,
    `operator${type}_timeplayed`,
  ],
  operatorGadgets: type => [].concat(...OPERATORS.slice(5).map(op => op.gadget.map(g => g.id(type)))),
  thunt: () => [
    'allterrohuntsolo_normal_bestscore',
    'allterrohuntsolo_hard_bestscore',
    'allterrohuntsolo_realistic_bestscore',

    'allterrohuntcoop_normal_bestscore',
    'allterrohuntcoop_hard_bestscore',
    'allterrohuntcoop_realistic_bestscore',

    'terrohuntclassicpve_matchwon',
    'terrohuntclassicpve_matchlost',
    'terrohuntclassicpve_matchplayed',
    'terrohuntclassicpve_bestscore',

    'protecthostagepve_matchwon',
    'protecthostagepve_matchlost',
    'protecthostagepve_matchplayed',
    'protecthostagepve_bestscore',

    'rescuehostagepve_matchwon',
    'rescuehostagepve_matchlost',
    'rescuehostagepve_matchplayed',
    'rescuehostagepve_bestscore',

    'plantbombpve_matchwon',
    'plantbombpve_matchlost',
    'plantbombpve_matchplayed',
    'plantbombpve_bestscore'
  ]
};

const RANKS = {
  23: { name: 'Champions', badge: 'e4WZL31' },
  22: { name: 'Diamond', badge: 'dPuxt0u' },

  21: { name: 'Platinum 1', badge: 'ROYSHwp' },
  20: { name: 'Platinum 2', badge: 'COVNQC3' },
  19: { name: 'Platinum 3', badge: '3OSWWcR' },

  18: { name: 'Gold 1', badge: 'FjWjpda' },
  17: { name: 'Gold 2', badge: 'rHBlUaX' },
  16: { name: 'Gold 3', badge: 'uXnGOgU' },

  15: { name: 'Silver 1', badge: 'tsjZmYr' },
  14: { name: 'Silver 2', badge: 'IMJsCu8' },
  13: { name: 'Silver 3', badge: 'pQqTT6W' },
  12: { name: 'Silver 4', badge: '07gFgBQ' },
  11: { name: 'Silver 5', badge: 'J2LkMdm' },

  10: { name: 'Bronze 1', badge: 'w1NLcy2' },
  9: { name: 'Bronze 2', badge: 'CQ0znH0' },
  8: { name: 'Bronze 3', badge: 'CC7Hr50' },
  7: { name: 'Bronze 4', badge: '2eAKgLa' },
  6: { name: 'Bronze 5', badge: 'k0VNpMK' },

  5: { name: 'Copper 1', badge: 'sfm37H4' },
  4: { name: 'Copper 2', badge: 'm7tEVkN' },
  3: { name: 'Copper 3', badge: 'NFBZU7f' },
  2: { name: 'Copper 4', badge: 'BpCq67f' },
  1: { name: 'Copper 5', badge: 'ZU3BXi4' },

  0: { name: 'Unranked', badge: 'VjY8z95' }
};

// old badge: Burnt Horizon (13) and below, badge: since Phantom Sight (14)
const OLD_RANKS = {
  20: { name: 'Diamond', oldBadge: 'BPTsruE', badge: 'h02BrKN' },

  19: { name: 'Platinum 1', oldBadge: 'vM99U2X', badge: 'p8J2gyx' },
  18: { name: 'Platinum 2', oldBadge: 'BWZntMj', badge: '0nSeDwK' },
  17: { name: 'Platinum 3', oldBadge: '6AE1DeN', badge: '27k46er' },

  16: { name: 'Gold 1', oldBadge: 'YSMXwwj' },
  15: { name: 'Gold 2', oldBadge: 'XmoIXvX' },
  14: { name: 'Gold 3', oldBadge: 'ua1gXAC' },
  13: { name: 'Gold 4', oldBadge: 'rrPfwSc' },

  12: { name: 'Silver 1', oldBadge: '5oHNIK6' },
  11: { name: 'Silver 2', oldBadge: 'fCzjRiu' },
  10: { name: 'Silver 3', oldBadge: 'BtHkA3t' },
  9: { name: 'Silver 4', oldBadge: '9YKfOUm' },

  8: { name: 'Bronze 1', oldBadge: 'UL72TCz' },
  7: { name: 'Bronze 2', oldBadge: 'ScN2Nq7' },
  6: { name: 'Bronze 3', oldBadge: 'y9S2Dxp' },
  5: { name: 'Bronze 4', oldBadge: 's7WbWgP' },

  4: { name: 'Copper 1', oldBadge: 'N0Ni07K' },
  3: { name: 'Copper 2', oldBadge: 'piH6pb4' },
  2: { name: 'Copper 3', oldBadge: 'ngBCfAK' },
  1: { name: 'Copper 4', oldBadge: 'yDpq16S' },

  0: { name: 'Unranked', oldBadge: 'bvnVUEm' }
};
Object.values(OLD_RANKS).map(rank => rank.badge = rank.badge || rank.oldBadge);

const SEASONS = {
  6: 'Health', 7: 'Blood Orchid', 8: 'White Noise',
  9: 'Chimera', 10: 'Para Bellum', 11: 'Grim Sky',
  12: 'Wind Bastion', 13: 'Burnt Horizon', 14: 'Phantom Sight',
  15: 'Ember Rise', 16: 'Shifting Tides', 17: 'Void Edge'
};

module.exports = {
  URLS,
  WEAPONTYPES,
  WEAPONS,
  OPERATORS,
  STATS,
  RANKS,
  OLD_RANKS,
  SEASONS
};
