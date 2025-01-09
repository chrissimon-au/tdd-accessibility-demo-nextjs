{ pkgs, ... }:

{ 
  env.PLAYWRIGHT_BROWSERS_PATH=pkgs.playwright-driver.browsers;

  packages = [
    pkgs.nodejs_23
    pkgs.playwright-driver
    pkgs.watchexec
  ];

  languages.typescript.enable = true;

  enterShell = "code .";
}
