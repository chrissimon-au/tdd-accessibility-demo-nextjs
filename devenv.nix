{ pkgs, ... }:

{ 
  env.PLAYWRIGHT_BROWSERS_PATH=pkgs.playwright-driver.browsers;

  packages = [
    pkgs.vscodium-fhs
    pkgs.nodejs_23
    pkgs.playwright-driver
  ];

  languages.typescript.enable = true;

  enterShell = "code .";
}
