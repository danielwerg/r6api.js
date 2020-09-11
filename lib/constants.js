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
  { name: 'L85A2', id: 'B79310C6', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5vYQpoyk36foDzDq49jBd0/1479a2d7189e545555ceccecf6bd7cc3/L85A2.png' },
  { name: 'AR33', id: 'B79310D8', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/16U6xEvX8I5xQd9duveBLN/45d22960872cfa3fb6be9eb47fa0be4e/AR33.png' },
  { name: 'G36C', id: 'B79310DE', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2SZoqSXKoNPvZFIJsFsDE5/cb109885bf19c8697abf832f10cfd9a6/G36C.png' },
  { name: 'R4-C', id: 'B79310D2', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/dQbqK9VxczuiscwBDSkT8/777a062f6095dde0371eab5200dcb451/R4-C.png' },
  { name: '556XI', id: 'B79310D4', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2dgpAeAWb3SkZV7rxDbVdQ/fa32323256b7c6f8a1977d3f71e7d4b2/556xi.png' },
  { name: 'F2', id: '9B2CA14F', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5HTvw1cJInVAGxOLXR0war/2f142437f5c0944fdcfcce8a03c37676/F2.png' },
  { name: 'AK-12', id: '106FE7150', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7KAZZgnpqD07y47jVVXEuh/e0d7e67101f8f966aa6e1c59e835454f/AK-12.png' },
  { name: 'AUG A2', id: '9B2CA14A', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1eO39zRe8XxJXH1KZiIWhM/02049ced0fbfa630833e8b0d3c03de07/AUG_A2.png' },
  { name: '552 Commando', id: 'B79310D3', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1LT0N89YaOHvRwn3Pphr8K/02d4a3da9cda132d8201fd134f24fede/552_Commando.png' },
  { name: '416-C CARBINE', id: '106FE714D', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2I86r2a2QD8EHTZVZnxcxy/2913450ba952a16c29fac1f5ce58ba1a/416-C_Carbine.png' },
  { name: 'C8-SFW', id: '2CEABF00B', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1itXpz2GnvdwwRyhX1SYa2/b58ff71048fa3bb5ed09d5d935dc90f4/C8-SFW.png' },
  { name: 'MK17 CQB', id: '2CEAAA814', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4LytczDQmu0M63gO2WtCCm/331ef3b1938352ae71d7c0bd23de3596/Mk17_CQB.png' },
  { name: 'PARA-308', id: '8ACBED9B8', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6ub8y2Cs5EYhVPfDWuVVkW/82ca131a41ee4ba2e0b75f2dc52ed9e3/PARA-308.png' },
  { name: 'Type-89', id: '9A25C4B26', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7wLf325q9amF8bnVP1QGr0/2faff1a197f90dcded4472852a317d6b/Type-89.png' },
  { name: 'C7E', id: 'A3038BA91', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/63vTDjkXeKq7rOoSBhoJD4/08603e6603d564e0fa38af9ec86b7c1f/C7E.png' },
  { name: 'M762', id: 'E50FB57FB', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4oWAgi7tgQP1Tq0HooRtye/9109a74921ee17610d4bd85a61582823/M762.png' },
  { name: 'V308', id: 'BE9996F2D', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5YBZe76NUDO32eF66wW90g/488c315743d59230962a4d67618223d6/V308.png' },
  { name: 'SPEAR .308', id: 'BE99AD3BD', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/29LjYuJ4s6yA8k9Uv2u28C/89ec812559e7d74b7c269279f4c46d92/Spear_.308.png' },
  { name: 'AR-15.50', id: '1EFE80F033', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4lGGEGZLkbldz114Wl5hCo/78a04c46654f80fae03e730bd79f3563/AR-15.50.png' },
  { name: 'M4', id: '1EFE81B5D5', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3jhi90ycmuc8mAiuSXFoCi/bcf354459e7becd6ede52ee97917c832/M4.png' },
  { name: 'AK-74M', id: '23D027C51C', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1j5HiQP8aFphTe65fqDdg0/23eecb5c603c5ba9f59fc6cbc5e4a531/AK-74M.png' },
  { name: 'ARX200', id: '2418EC4362', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6VgkPBsr1WApI3rWc9kcM0/b18b8e25f3e951e8e722213f2ee59eb0/ARX200.png' },
  { name: 'F90', id: '2902BBFED9', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/62tE3th2ThcGHlrcqWkmEX/d69c9de199542e25fa55f6d293f15671/r6-operator-weapon-ar-f90.png' },
  { name: 'Commando 9', id: 'BE998B05E', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4P9dpUph5w3MSsLNnW6be/04baba24990fcb75a9c0bcfd01b7d190/Commando_9.png' },
  { name: 'SC3000K', id: '40705ECFA4', category: 'assault', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7x7eDTm2NNpfGiFMrfQqEX/9898e74c780537be3ca6d88db32ea21e/F2000.png' },

  // smg
  { name: 'FMG-9', id: 'B79310D0', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/0oneJNsBR06QjuowxwtHG/bd3b391c6eec2bd615f2ed83197a13ac/FMG-9.png' },
  { name: 'MP5K', id: 'B79310D1', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1pk8nOI7ybQjYOSI4fuzOm/fcd78df0f729be545e75c09aae85c360/MP5K.png' },
  { name: 'UMP45', id: 'B79310CF', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6X2EZPq2s8UKrP67uxz5FI/f0df4c57d5890c79311e4eb62d4470e7/UMP45.png' },
  { name: 'MP5', id: 'B79310C1', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/60YbOvSBQt6ZUlu8YDXoZm/51ef3857b2986de700262432e8433714/MP5.png' },
  { name: 'P90', id: 'B79310C7', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4nGrNspOvII2oS3lEMkg5x/2398a493c298bc654f97c58767aa40f3/P90.png' },
  { name: '9x19VSN', id: '106FE7151', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/42gH96xTTYaTZsfXI3c0wL/a7edbf11af97091ee884b68e59fe6a4f/9x19VSN.png' },
  { name: 'MP7', id: '106FE714F', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3a4dgTWGdiJqALhtRp4pKy/f2568d3de3cfe7e4b53179e8653cd2a2/MP7.png' },
  { name: '9mm C1', id: '2CEABC77A', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/60sbThKtOpNOwKu3OP0oGV/672fd9263f7786402a0d855273473a6f/9mm_C1.png' },
  { name: 'MPX', id: '5BD3A85FC', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5HFewpAJ8npDDCKFnEadhL/d398bb477d6b56fe41bfdb5862ed31c0/MPX.png' },
  { name: 'M12', id: '8ACBEC5F2', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4FxqA5pa8JY9QQ7FEcjwPw/ffc779fcde5b970e7b95db6653637dab/M12.png' },
  { name: 'MP5SD', id: '99EB07773', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5HaMldwFltBwiiyDDfkPpD/6de3aa9aaa17458e7f6186ba59b8deff/MP5SD.png' },
  { name: 'PDW9', id: 'A3038BA94', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4yYCuRnduMq35CTHfq6wwU/b7d49cdbcb05917e014c99efeaadd33b/PDW9.png' },
  { name: 'Vector .45 ACP', id: 'A3038BA92', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7D1cDf13FqUhoLihzvuPln/068aa7e507155598449c58c0a49a90d6/Vector_.45_ACP.png' },
  { name: 'T-5 SMG', id: 'B699FDA28', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1Ne8bvX8BdCALevWKMllQN/4baa3e79d323de134dd182e0272b9c3b/T-5_SMG.png' },
  { name: 'Scorpion EVO 3 A1', id: 'E50FA8B51', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6OdwaLWxcnFvhlVwWbP2Du/4f7e94bdb6d34d5c0aa7b7b147b4092e/Scorpion_EVO_3_A1.png' },
  { name: 'K1A', id: '128C51CBEF', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5mUa2p8WXbiyD71qUI8sGk/ed753b6f0ae30ab5737486dfcf32ee9f/K1A.png' },
  { name: 'Mx4 Storm', id: '172522E967', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4qRh1frGkQZxNyeKA4D6n1/20f89cd1d9953f06207b7340ea77fb17/Mx4_Storm.png' },
  { name: 'AUG A3', id: '2418EC6F2C', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3W9XJdMOgpHSw55HfwRSAv/cf8f220678d503e6c3e535c00b2e636a/AUG_A3.png' },
  { name: 'P10 RONI', id: '2902BB46BB', category: 'smg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7K86OBjL3zmYWt0ZvUcCLj/16a947334e39f27da177d787773593e4/r6-operator-weapon-smg-p10roni.png' },

  // lmg
  { name: '6P41', id: 'B79310DA', category: 'lmg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1wxS2HOCvoPAfnJEDFWjfw/7feddb98582ec37b500243d3f3e19eca/6P41.png' },
  { name: 'G8A1', id: '106FE714C', category: 'lmg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4TIb7oeJesaROOOfTlCBaZ/ffd6a802f9a779a0d39b2122c49b3254/G8A1.png' },
  { name: 'M249', id: '8ACBE8797', category: 'lmg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7z8UpVPS3P14OC1oL9dDIn/39c0c657f154218003fd4b2a9250b92f/M249.png' },
  { name: 'T-95 LSW', id: 'B699FDA29', category: 'lmg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/23HCxaNTRUHBlFAvCTMZQm/fe319cc164fac034a29e9b114ae7d5cb/T-95_LSW.png' },
  { name: 'LMG-E', id: 'E50FB57FC', category: 'lmg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7JVJIew6t3iKwgByvrFXyi/7ba44dfda28b525506633e453104a604/LMG-E.png' },
  { name: 'ALDA 5.56', id: '172522E96A', category: 'lmg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/39yB6TFl9ph6Rb4bDV4lqK/7f9b3abf8dff19bacc026a7212849ca4/ALDA_5.56.png' },
  { name: 'M249 SAW', id: '2902BB7B8C', category: 'lmg', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7z8UpVPS3P14OC1oL9dDIn/39c0c657f154218003fd4b2a9250b92f/M249.png' },

  // marksman
  { name: '417', id: 'B79310C0', category: 'marksman', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5djkS4YtAtOF0vBmg0T60x/ea2b1ff7e5367e66c99bc7ad7e95bfe3/417.png' },
  { name: 'OTs-03', id: '106FE7152', category: 'marksman', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4fXznwDtLt61VCF8QIF4N3/34e2e6d6c33d4c504c945bdd13c322f6/OTs-03.png' },
  { name: 'CAMRS', id: '2CEAAB41D', category: 'marksman', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4dBzqVVmnpv1DZi91LAnEN/e374b4ea289fc992280b943cdbb94d60/CAMRS.png' },
  { name: 'SR-25', id: '2CEABFB43', category: 'marksman', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3H3sICdj6BK8LhtQPRd2aJ/26826ebba73e0e5fd503256d069f3256/SR-25.png' },
  { name: 'Mk 14 EBR', id: '128C5259FA', category: 'marksman', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6KIMqp5dA95z1RI3PrG9jv/eb939638169811a3fa858a44e6e5d97e/Mk_14_EBR.png' },
  { name: 'CSRX 300', id: '33E28FCCA0', category: 'marksman', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7tUB9ZNXJhdN6ejAkCEeFQ/99691bcc19f641cf872925905d08a539/CSRX_300.png' },

  // pistol
  { name: 'P226 MK 25', id: 'B79310CA', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/RTQvPQcywlRwUS1FjIKCX/6fc72fee2191c2e723276bc10ae4114e/P226_Mk_25.png' },
  { name: 'M45 MEUSOC', id: 'B79310D7', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3u5cecgWYl3WuJK50mKEGd/a4a0eb15c710edfc0d29e98c2ee7ea33/M45_MEUSOC.png' },
  { name: '5.7 USG', id: '9B2CA14C', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/tkYcSAJSe5yGkeUhzZqBO/e81feb86df4a7eb6951052bec26b6ed7/5.7_USG.png' },
  { name: 'P9', id: 'B79310D9', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6Fd1cl17KA0CtgodEiiY6v/d0f145ea72f2aacbd04260ba7d8f1c74/P9.png' },
  { name: 'LFP586', id: 'B79310C8', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1zc7UtdBfCZakwbiYqBvSz/1fd3f1584de38ca7c9315d498f094276/LFP586.png' },
  { name: 'GSH-18', id: '106FE7153', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5s5Q33j3MNcXf9lwfxfd7m/4eb3a6af1d431481b6ddcec44fbc7602/GSh-18.png' },
  { name: 'PMM', id: '9B2CB308', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3y4LIwwm8YNQHAv8oOkWCK/a2375901cee34e68fa39c976d85de8aa/PMM.png' },
  { name: 'P12', id: 'B79310CB', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2mpM7rah7rwEW0bViIirUC/ed9caa4db58421519fa4db390b1aa164/P12.png' },
  { name: 'MK1 9mm', id: '37ACC03F7', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3tWoNeF3jQYs3w4EOydQYs/434409c96693df1fd3e969d778e70795/Mk1_9mm_BI.png' },
  { name: 'D-50', id: '53AEC9396', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6mMQRDsrComRFa7bC6cNkG/8cd17e545e3d28dcc11a040d000cfa16/D-50.png' },
  { name: 'PRB92', id: '8ACBEC355', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/dl28J1HsE7mzhj66pmd5D/b8d8fc48d2dde13154047de94abbd8ca/PRB92.png' },
  { name: 'P229', id: '959B5DBD4', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/76ja0RxqzHW9PpvWgpG7Sk/cb753b50b20fe67deaef54d8b2a46b54/P229.png' },
  { name: 'USP40', id: 'A3038BA93', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7FxemzWRtlpAhK9MyKp1Gp/817cc25b6b7c3575dc1ba53a6a8170a9/USP40.png' },
  { name: 'Q-929', id: 'B699FDA2A', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2fRVszR5yGDHbV0AL8muso/0838dac90b66aa810daa49d36382fb64/Q-929.png' },
  { name: 'RG15', id: 'E50FB57FD', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2LNSsp7B7wUnnPUweir7Jm/9f66d53be7a63a17a55253a0bea6eec1/RG15.png' },
  { name: 'Bailiff 410', id: '172522E96B', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/N8FLbo4fsNyBe8msKgRhT/8f403dc0b58087bcafab786dd95ba33f/Bailiff_410.png' },
  { name: 'Keratos .357', id: '199D70994A', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4niSMDCeiryoMBXJZq60Vv/48339331d05e289868cf4050c49b1b2b/D-40.png' },
  { name: '1911 TACOPS', id: '1EFE81B5D4', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/189UukZ6fVnvQR6LJtLYry/6eec29603d5b7b0ca8cab6ac0ef083ac/1911_TACOPS.png' },
  { name: 'P-10C', id: '1EFE80F702', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2l4qwB50zSFhFZVYRLNwqg/20df8114f69f96f2adc54779ccc5bbaa/P-10C.png' },
  { name: '.44 Mag Semi-Auto', id: '2418EC5F35', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6W3Jz0YcQzbZ6BOPr7VVel/4c67f342964132a652f7d5821e887050/.44_Mag_Semi-Auto.png' },
  { name: 'SDP 9mm', id: '2A69013364', category: 'pistol', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/Tgsdyz3XEqmgUYi9aZZgb/6755f4da7af7a7179ffab92acf8d477e/SDP_9mm.png' },

  // shotgun
  { name: 'M590A1', id: '9B2CA14E', category: 'shotgun', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2zRHmgqENNiZqXQxC9Rsbj/e6542407c642f9b7c5a4546afb6db30a/M590A1.png' },
  { name: 'M1014', id: 'B79310CC', category: 'shotgun', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2pUiVbwNnQnDTesmWXktqW/f27c1fab9a354bb89cbe309a688f5e02/M1014.png' },
  { name: 'SG-CQB', id: '9B2CA14B', category: 'shotgun', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5JoL3b36Fsztt9Q2XYmrbJ/dacec96948d3f8fe92914a69b9aac593/SG-CQB.png' },
  { name: 'SASG-12', id: '9B2CB313', category: 'shotgun', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2Q6mL4CbifmIgifV2yV3Hi/2bb2b323f055b03a2c1ba516c262c24e/SASG-12.png' },
  { name: 'M870', id: '106FE714E', category: 'shotgun', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2rkU6g4Rlg0e0U4rczWGTV/a51589a54c43f476d8eb984c0ea881e9/M870.png' },
  { name: 'Super 90', id: '2CEABFF54', category: 'shotgun', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1TLWSu0xHJlAsfEfafeC9X/f9647e70a18962bf1627095c8b46832e/Super_90.png' },
  { name: 'SPAS-12', id: '2CEABF739', category: 'shotgun', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7Hp6Fbss6uI59OT4nZNB6e/a4d09954803cb2580353cfa03e8c778b/SPAS-12.png' },
  { name: 'SPAS-15', id: '8ACBEBD23', category: 'shotgun', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/CyofBgipHq4RTafvPFWd4/bc3d0ecc871b70e57735855f852efacf/SPAS-15.png' },
  { name: 'Supernova', id: '959B746E6', category: 'shotgun', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2tpjCRFLcc3hogjJGbKDsi/5ad0ab63b7245022aca5c1c1fb42d473/SuperNova.png' },
  { name: 'ITA12L', id: 'A3038B5A5', category: 'shotgun', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4Y6ziRzm9RiPii83fm8BV1/1f472744d2c2dec8d9206f4d8733d92c/ITA12L.png' },
  { name: 'ITA12S', id: 'A3038BA90', category: 'shotgun', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5G4DroaSdqHzJWCe7qqbHZ/5dd2e03f853182c78a1e7fcbc642f0cf/ITA12S.png' },
  { name: 'SIX12', id: 'B699FDA2B', category: 'shotgun', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2v6MwsHwjOZ5Muid53lyfN/e5f1c4997db93abfe3ac356fce23376c/SIX12.png' },
  { name: 'SIX12 SD', id: 'B699FDA2C', category: 'shotgun', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1GTua079Xbtkpjhx96sRsW/079ed1a71a0d12b5e48e1b0d40b87110/SIX12_SD.png' },
  { name: 'FO-12', id: 'E50FB57FA', category: 'shotgun', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4TDWnhbgvLkc6HBWDJp2ST/f50cbd83d6d295ab59f17f7e21d713bc/FO-12.png' },
  { name: 'BOSG.12.2', id: '128C51DEC8', category: 'shotgun', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2ZjVndetsX8WEn5ZfyUQa0/e3a781be7eab22876d25f748e8fd0f5a/BOSG.12.2.png' },
  { name: 'ACS12', id: 'BE99AD3BE', category: 'shotgun', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/13z63kT1NLzn1U99o7WC4T/8655d3200f24b87246c36f2622603457/ACS12_PB.png' },
  { name: 'TCSG12', id: '2418EC7D3A', category: 'shotgun', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2NDbY7BTBJ9R09LUilTlRf/3728337cd3ba14ed6ab9de0c22e879af/TCSG12.png' },
  { name: 'Super Shorty', id: '1EFE80F701', category: 'shotgun', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7Dq8LDmIxAveRqXM17orUW/cbd96b47cd8ca74a7827b16ef73fe7cf/r6-operator-weapon-sa-supershorty.png' },

  // mp
  { name: 'SMG-11', id: 'B79310CE', category: 'mp', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3WExw7Kepz9uAiWAbWW457/875fc631a3cf9fcc2849d9db2989cbcd/SMG-11.png' },
  { name: 'Bearing 9', id: '99EB0571E', category: 'mp', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4mdftEOh5Vu9KhhpgKLKrT/abedcc75868774018295ec2a08a7b3de/Bearing_9.png' },
  { name: 'C75 Auto', id: '128C51DEC6', category: 'mp', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3wUuefwPjU705mZkTdJ9UH/8ccb11884cfa34c176ac5500af139177/C75_Auto.png' },
  { name: 'SMG-12', id: '128C51CBED', category: 'mp', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/EwJgB7KdgOb6dDm7ro33u/b73f0890f992c1a365210f08efcc6db5/SMG-12.png' },
  { name: 'SPSMG9', id: '1EFE81B5D6', category: 'mp', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5EtwSgylXckBNg4n6gDR9J/bc6fc6c5c12ae11da59aee95828ebd76/SPSMG9.png' },

  // shield
  // { name: 'G52-Tactical Shield', id: '', category: 'shield', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7qmWjGZayvK4t6E80Gvu7g/8b789d6d639744dce100c2cfb9709e6a/G52-Tactical_Shield.png' },
  // { name: 'Extendable Shield aka Le Roc', id: '', category: 'shield', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4XLgMhsaiz20Gd5JJp80lW/40af7e3fafc77831bd761a02af83927c/Extendable-Shield.png' },
  // { name: 'Ballistic Shield', id: '', category: 'shield', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2C21gwsjOka5Rwp8qSM5hA/a38937032260bce4f690fb9bb8adf4c0/Ballistic_Shield.png' },
  // { name: 'CCE Shield', id: '', category: 'shield', image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5mmGgrYdJJHw2moBIEW9An/64e9727d959d7afdbb4fb06e2f75574a/CCE_Shield.png' },

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
  },
  {
    name: 'melusi',
    readableName: 'Melusi',
    role: 'defender',
    ctu: 'Inkaba Task Force',
    badge: 'tlAhOmb',
    fullIndex: '2:1A',
    gadget: [
      { id: type => `operator${type}_melusi_sloweddown`, name: 'Attackers slowed by Banshee' }
    ]
  },
  {
    name: 'ace',
    readableName: 'Ace',
    role: 'attacker',
    ctu: 'NIGHTHAVEN',
    badge: '9C0j8iz',
    fullIndex: '4:17',
    gadget: [
      { id: type => `operator${type}_ace_selmadetonate`, name: 'S.E.L.M.A. Detonations' }
    ]
  },
  {
    name: 'zero',
    readableName: 'Zero',
    role: 'attacker',
    ctu: 'ROS',
    badge: 'xWtzdxN',
    fullIndex: '1:1B',
    gadget: [
      { id: type => `operator${type}_zero_gadgetsdestroyed`, name: 'Gadgets Destroyed by ARGUS Camera' }
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

const OLD_SEASONS = {
  1: {
    name: 'Black Ice',
    color: '#2e93b3',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/67sZXc4UuXK2YPq8uj0mgE/6d0a5e1c6a342f5219cba2fc89e0ba14/r6s-seasons-y1s1.jpg'
  },
  2: {
    name: 'Dust Line',
    color: '#d0a344',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5u2ecpIe98X528KgYQiEt/5833e27e347176f5e041cc533d48ac95/r6s-seasons-y1s2.jpg'
  },
  3: {
    name: 'Skull Rain',
    color: '#47893b',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2X0s4QopJikcMNN4qg9KPS/5ef0ae117679ee7b1342c776a77c9dd4/r6s-seasons-y1s3.jpg'
  },
  4: {
    name: 'Red Crow',
    color: '#bd1e2c',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/66IKfs4aSnSkxaToTmmVBt/1532ccea8dd02b3ea44f254e4fdac27f/r6s-seasons-y1s4.jpg'
  },
  5: {
    name: 'Velvet Shell',
    color: '#723093',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5OKGWvBbiscdZNmjr0PP9q/f5cff0dae8546193f9601fcf703f7f0e/r6s-seasons-y2s1.jpg'
  }
};

const SEASONS = {
  6: {
    name: 'Health',
    color: '#0050b3',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2w0kuPWW4vZS2MvHxpjgKL/527a78f482f03250f48ee05fabb843a9/r6s-seasons-y2s2.jpg'
  },
  7: {
    name: 'Blood Orchid',
    color: '#ca361c',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5Is8lRiLLAaU0Uaj46Bu5Z/d46a8652cdf16426b7c9a0d634442be5/r6s-seasons-y2s3.jpg'
  },
  8: {
    name: 'White Noise',
    color: '#006543',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6FvQKw65QzOqhVKxbjBg1Z/70ea9eb8865182504f74cfea10f88c0a/r6s-seasons-y2s4.jpg'
  },
  9: {
    name: 'Chimera',
    color: '#ffc113',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/35ZyIYUW7odr1tiGyGNd8R/8a578688e5c46ed779a382c940bf270b/rainbow6siege-chimera-thumb_318068.jpg'
  },
  10: {
    name: 'Para Bellum',
    color: '#949f39',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/522ZBrBzlJMoTi63hrwuna/3f9007ceaa80b8110fa282937309ac1e/rainbow6siege_parabellum_thumb_323480.jpg'
  },
  11: {
    name: 'Grim Sky',
    color: '#81a0c1',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4y07zikRXB4BcyRQy5Anoe/2e6de56c3ea34cadb300326102963340/rainbow6siege_grimsky_thumb_333789.jpg'
  },
  12: {
    name: 'Wind Bastion',
    color: '#aa854f',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1VeuGBLdSsadK5MdLfCL9k/b9e213c4aeb8dfe6e1f137968770912a/rainbow6siege_windbastion_thumb_340468.jpg'
  },
  13: {
    name: 'Burnt Horizon',
    color: '#d2005a',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4J2E0yJ2cZsKgx5OrFGkvR/0f966f31b3d8ad2ef13926b075769334/r6s-seasons-y4s1.jpg'
  },
  14: {
    name: 'Phantom Sight',
    color: '#304395',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/29ze1Zxf173boRuyaFHuQV/c240df821c3ec407b09118c68a1300c0/r6s-seasons-y4s2.jpg'
  },
  15: {
    name: 'Ember Rise',
    color: '#156309',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1JeHAGdUglVNSUUvSkxSia/1c8b76a4256091ca40434e89addaacf2/r6s-seasons-y4s3.jpg'
  },
  16: {
    name: 'Shifting Tides',
    color: '#089eb3',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6uZSbKGZiwF7Zv5egr4zks/5597030f075ad99c0a18a1dcea34ef87/r6s-seasons-y4s4.jpg'
  },
  17: {
    name: 'Void Edge',
    color: '#946a97',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2584xuwMoCH1FJc9n34jLo/9dfec73fd217a889a7bfe66e1f412cd6/r6s-seasons-y5s1.jpg'
  },
  18: {
    name: 'Steel Wave',
    color: '#2b7f9b',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4soZ80QzL9WoLqvq8Hz647/d8d70312ec2849c276b459c3ef0482cd/r6s-seasons-y5s2.jpg'
  },
  19: {
    name: 'Shadow Legacy',
    color: '#6ca511',
    image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5H87SAzADrzRmroVnJzuUE/2e73c489074b538055df0f793b4e1639/r6s-seasons-y5s3.jpg'
  }
};

module.exports = {
  URLS,
  WEAPONTYPES,
  WEAPONS,
  OPERATORS,
  STATS,
  RANKS,
  OLD_RANKS,
  OLD_SEASONS,
  SEASONS
};
