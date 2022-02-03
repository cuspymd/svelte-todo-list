{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/a7ecde854aee5c4c7cd6177f54a99d2c1ff28a31.tar.gz") {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.emacs
    pkgs.git
    pkgs.nodejs-16_x
    pkgs.nodePackages.npm
    pkgs.docker
    pkgs.docker-compose
    pkgs.nodePackages.prisma
  ];

  shellHook = with pkgs;
    ''
    echo "Starting dev database"
    docker-compose -f prisma/docker-compose.yml up -d
    trap "docker-compose -f prisma/docker-compose.yml down" EXIT
    export PRISMA_MIGRATION_ENGINE_BINARY="${prisma-engines}/bin/migration-engine"
    export PRISMA_QUERY_ENGINE_BINARY="${prisma-engines}/bin/query-engine"
    export PRISMA_QUERY_ENGINE_LIBRARY="${prisma-engines}/lib/libquery_engine.node"
    export PRISMA_INTROSPECTION_ENGINE_BINARY="${prisma-engines}/bin/introspection-engine"
    export PRISMA_FMT_BINARY="${prisma-engines}/bin/prisma-fmt"
    npm install
    '';

  TERM = "xterm-256color";
  DATABASE_URL = "postgres://postgres@localhost:6543/todos";
}
