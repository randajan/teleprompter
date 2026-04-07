import { solids } from "@randajan/props";

export class FileStore {

    constructor({
        mimeType = "text/plain",
        charset = "utf-8",
        extension = "txt",
        defaultFileName = "file",
        serialize = (data) => String(data),
        deserialize = (text) => text,
    } = {}) {

        solids(this, {
            mimeType,
            charset,
            extension,
            defaultFileName,
            serialize,
            deserialize
        });

    }

    save(data, fileName = this.defaultFileName) {
        const { serialize, mimeType, charset, extension } = this;

        const ext = `.${extension}`;

        if (!fileName.toLocaleLowerCase().endsWith(ext.toLocaleLowerCase())) { fileName += ext; }

        const content = serialize(data);
        const blob = new Blob([content], { type:`${mimeType};charset=${charset}` });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    }

    load() {
        const { extension, mimeType, charset, deserialize } = this;

        return new Promise((resolve, reject) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = `.${extension},${mimeType}`;
            input.style.display = "none";
            document.body.appendChild(input);

            const cleanup = () => {
                if (input.parentNode) {
                    input.parentNode.removeChild(input);
                }
            };

            input.addEventListener("change", () => {
                const file = input.files?.[0];

                if (!file) {
                    cleanup();
                    reject(new Error("No file selected"));
                    return;
                }

                const reader = new FileReader();

                reader.onload = () => {
                    try {
                        const result = deserialize(reader.result);
                        resolve(result);
                    } catch (cause) {
                        reject(new Error("Read failed", {cause}));
                    } finally {
                        cleanup();
                    }
                };

                reader.onerror = (cause) => {
                    cleanup();
                    reject(new Error("Load failed", {cause}));
                };

                reader.readAsText(file, charset);
            });

            input.click();
        });
    }
}