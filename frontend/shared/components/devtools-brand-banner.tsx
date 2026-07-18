const BANNER = String.raw`
   ___  ___ _   _  ____  ____ _   _ _   _ _   _        _    ___ 
  / _ \|_ _| \ | |/ ___|/ ___| | | | | | | \ | |      / \  |_ _|
 | | | || ||  \| | |  _| |   | |_| | | | |  \| |     / _ \  | | 
 | |_| || || |\  | |_| | |___|  _  | |_| | |\  |    / ___ \ | | 
  \__\_\___|_| \_|\____|\____|_| |_|\___/|_| \_|   /_/   \_\___|
`;

const BANNER_SCRIPT = `
(() => {
  const key = "__QINGCHUN_AI_DEVTOOLS_BANNER__";
  if (globalThis[key]) return;
  globalThis[key] = true;
  const banner = ${JSON.stringify(BANNER)};
  console.log("%c" + banner, "color:#111827;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-weight:700;line-height:1.15");
  console.log(
    "%c  %c  %c  %c  %c  %c  %c  %c  ",
    "background:#000000",
    "background:#111111",
    "background:#262626",
    "background:#404040",
    "background:#737373",
    "background:#a3a3a3",
    "background:#d4d4d4",
    "background:transparent"
  );
  console.log("%cOfficial: https://ai.qingchun.xyz  |  Repository: https://github.com/qingchunnh/QingChun-AI  |  License: Apache License 2.0", "color:#64748b;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace");
})();
`;

export function DevtoolsBrandBanner() {
  return (
    <script
      id="qingchunai-devtools-brand"
      dangerouslySetInnerHTML={{ __html: BANNER_SCRIPT }}
    />
  );
}
