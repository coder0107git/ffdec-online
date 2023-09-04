function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}

function blobFile(code, mimeType = "text/plain") {
    const blob = new Blob([code], { type: mimeType });
    return URL.createObjectURL(blob);
}

function initConsole() {
    const win = window.open(
        blobFile(`<p style="display: none;">&#8203;</p>
        <${"script"} src="https://cdn.jsdelivr.net/gh/gh-canon/stack-snippet-console@master/console.js"></${"script"}>
        <${"script"}>
            //console.log("test");
            console.config({ maximize: true, maxEntries: Number.MAX_SAFE_INTEGER })
            //console.log("Howdy!");
        </${"script"}>`, "text/html"), 
        "_blank"
    );

    let _console = {};
    let que = [];
    let consoleMethods = [
        "assert",
        "dir",
        "log",
        "info",
        "error",
        "warn",
        "clear",
        "time",
        "timeEnd",
        "count",
        "dirxml",
        "table",
        "config",
    ];

    consoleMethods.forEach(method => {
        _console[method] = console[method];

        console[method] = (...params) => que.push([method, params]);
    });

    let loaded = false;

    const noop = () => {};

    const promise = () => new Promise(res => res());

    function done() {
        if (loaded === false) {
            loaded = true;

            consoleMethods.forEach(method => {
                console[method] = (...params) =>
                    promise()
                        .then(() => (win.console[method] ?? noop)(...params))
                        //.then(() => alert("Modified!"))
                        .catch((...args) => _console.error(...args))
                        .finally(() => _console[method](...params));
            });

            que.forEach(([method, params]) => console[method](...params));

            // Doesn't work
            /*win.onbeforeunload = () => 
                    consoleMethods.forEach(
                        method => {
                            console[method] = _console[method]; alert("restored") }
                    );*/
        }

        //await new Promise(r => setTimeout(r, 200));
    }

    if (win.document.readyState === "complete") done();

    win.addEventListener("load", done, { once: true });
}

initConsole()

/*console.log("Pre");

await winLoaded();
await new Promise(r => setTimeout(r, 500));

console.log("Post");

setTimeout(() => console.log("Hello!"), 3000);*/