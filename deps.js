function prefix(prefix, deps) {
    return deps
        .split("\n")
        .map(dep => `${prefix}${dep}`);
}

const dependencies = prefix => prefix(prefix, `avi.jar
cmykjpeg.jar
ddsreader.jar
ffdec_lib.jar
flamingo-6.2.jar
flashdebugger.jar
gif.jar
gnujpdf.jar
jargs.jar
JavactiveX.jar
jlayer-1.0.2.jar
jna-3.5.1.jar
jna-platform-3.5.1.jar
jpacker.jar
jpproxy.jar
jsyntaxpane-0.9.5.jar
LZMA.jar
minimal-json-0.9.5.jar
nellymoser.jar
sfntly.jar
substance-6.2.jar
substance-flamingo-6.2.jar
tablelayout.jar
tga.jar
treetable.jar
trident-6.2.jar
ttf.jar
vlcj-4.7.3.jar
vlcj-natives-4.7.0.jar`);
