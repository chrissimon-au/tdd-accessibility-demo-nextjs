{ pkgs, ... }:

{ 
  env.PLAYWRIGHT_BROWSERS_PATH=pkgs.playwright-driver.browsers;
  env.PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true;

  packages = [
    pkgs.nodejs_23
    pkgs.playwright-driver
    pkgs.watchexec
  ];

  languages.typescript.enable = true;

  enterShell = "code .";
}
