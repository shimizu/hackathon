#! /bin/sh

tree -f | sed 's/\.$/\.<br\/>/g' | sed 's/[  ]/\&ensp;/g' | sed 's/\(─\&ensp;\)\(.*\)\(\/\)\(.*$\)/\1<a href="\2\3\4">\4<\/a><br\/>/g' > index.html
