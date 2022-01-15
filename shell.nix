{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/df123677560db3b0db7c19d71981b11091fbeaf6.tar.gz") {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.emacs
    pkgs.git
    pkgs.nodejs-16_x
    pkgs.nodePackages.npm
    pkgs.docker
    pkgs.docker-compose
  ];

  shellHook =
    ''
    echo "Starting dev database"
    docker-compose -f prisma/docker-compose.yml up -d
    trap "docker-compose -f prisma/docker-compose.yml down" EXIT
    '';

  TERM = "xterm-256color";
  DATABASE_URL = "postgres://postgres@localhost:6543/todos";
}
