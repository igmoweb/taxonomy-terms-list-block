#!/bin/bash

set -ex

if [ -z "$1" ]
then
      echo "version is empty"
      exit 2
fi

rm -rf svn
svn co https://plugins.svn.wordpress.org/taxonomy-block svn

rm -rf svn/assets

grunt replace-placeholders

cp -r build svn/trunk
cp -r assets-wporg svn/assets
cp -r build svn/tags/$1
