

document.getElementById("writer-container").style.height = document.body.clientHeight - 40 + "px";

let title_input = document.getElementById("title-text-input");
title_input.onfocus = function () {
    if (title_input.value == "Title") {
        title_input.value = "";
    }
}
title_input.onblur = function () {
    if (title_input.value == "") {
        title_input.value = "Title";
    }
}

let area_input = document.getElementById("write-area-textarea");
area_input.onfocus = function () {
    if (area_input.value == "Start to write something...") {
        area_input.value = "";
    }
}
area_input.onblur = function () {
    if (area_input.value == "") {
        area_input.value = "Start to write something...";
    }
}

let post_btn = document.getElementById("writer-post-btn");
post_btn.addEventListener('click', async function getNewFileHandle() {
    const options = {
        suggestedName: `${title_input.value}.html`,
        //startIn: directoryHandle;
        types: [
            {
                description: 'Html Files',
                accept: {
                    'text/plain': ['.html'],
                },
            },
        ],
    };
    const handle = await window.showSaveFilePicker(options);
    const writable = await handle.createWritable();
    await writable.write(article_structure(area_input.value));
    await writable.close();
});

function article_structure(content) {
    let time_List = new Date().toDateString().split(" ");
    let timeFormat = time_List[1] + " " + time_List[2] + "," + time_List[3];
    result = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title_input.value}</title>
            <link rel="stylesheet" href="../style/template.css">
            <link rel="stylesheet" href="../style/style.css">
            <link rel="stylesheet" href="../style/iconfont.css">
            <link rel="stylesheet" href="../style/frame.css">
        </head>
            <body>
                <nav id="nav"></nav>
                <article>
                    <main>
                        ${content}
                    </main>
                    <time>${timeFormat}</time>
                </article>
                <footer id="footer"></footer>
                <script src="../script/template.js"><\/script>
            </body>
        </html>
         `
    return result;
}
