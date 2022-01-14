{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/df123677560db3b0db7c19d71981b11091fbeaf6.tar.gz") {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.emacs
    pkgs.git
    pkgs.nodePackages.npm
  ];

  TERM = "xterm-256color";
}
