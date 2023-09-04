function initConsole() {
    const win = window.open(
        URL.createObjectURL(
            new Blob([`<p style="display: none;">&#8203;</p>
            <${"script"} src="https://cdn.jsdelivr.net/gh/gh-canon/stack-snippet-console@master/console.js"></${"script"}>
            <${"script"}>
                //console.log("test");
                console.config({ maximize: true, maxEntries: Number.MAX_SAFE_INTEGER })
                //console.log("Howdy!");
            </${"script"}>`], { type: "text/html" })
        ), 
        "_blank"
    );

    let _console = {};
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

    let loaded = false;

    const noop = () => {};

    const promise = () => new Promise(res => res());

    return new Promise(res => {
        const done = () => {
            if(loaded === false) {
                loaded = true;
                
                consoleMethods.forEach(method => {
                    _console[method] = console[method];
                    
                    console[method] = (...params) => promise()
                        .then(() => win.console[method](...params))
                        .then(() => alert("Modified!"))
                        .catch((...args) => _console.error(...args))
                        .finally(() => _console[method](...params));
                });
                
                win.onbeforeunload = () => 
                    consoleMethods.forEach(
                        method => {
                            console[method] = _console[method]; alert("restored") }
                    );
            }
            
            //await new Promise(r => setTimeout(r, 200));
            res();
        }
        if (win.document.readyState === "complete") done();
        
        win.addEventListener("load", done, { once: true });
    });
}

/*console.log("Pre");

await winLoaded();
await new Promise(r => setTimeout(r, 500));

console.log("Post");

setTimeout(() => console.log("Hello!"), 3000);*/