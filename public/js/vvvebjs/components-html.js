Vvveb.ComponentsGroup['Base'] =
    ["html/heading", "html/image", "html/button", "html/paragraph", "html/hr", "html/form", "html/textinput", "html/textareainput", "html/selectinput"/*, "html/fileinput"*/, "html/checkbox", "html/radiobutton", "html/link", "html/list", "html/table", "html/audio"];

Vvveb.Components.extend("_base", "html/heading", {
    image: "icons/heading.png",
    name: "Heading",
    nodes: ["h1", "h2", "h3", "h4", "h5", "h6"],
    html: "<h1>Judul Konten</h1>",

    properties: [{
        name: "Size",
        key: "size",
        inputtype: SelectInput,

        onChange: function (node, value) {

            return changeNodeName(node, "h" + value);
        },

        init: function (node) {
            let regex;
            regex = /H(\d)/.exec(node.nodeName);
            if (regex && regex[1]) {
                return regex[1]
            }
            return 1
        },

        data: {
            options: [{
                value: "1",
                text: "Heading 1"
            }, {
                value: "2",
                text: "Heading 2"
            }, {
                value: "3",
                text: "Heading 3"
            }, {
                value: "4",
                text: "Heading 4"
            }, {
                value: "5",
                text: "Heading 5"
            }, {
                value: "6",
                text: "Heading 6"
            }]
        },
    }]
});


let linkComponentProperties = [
    /*	{
            name: "Text",
            key: "text",
            sort:1,
            htmlAttr: "innerText",
            inputtype: TextInput
        },*/
    {
        name: "Url",
        key: "href",
        sort: 2,
        htmlAttr: "href",
        inputtype: LinkInput
    }, {
        name: "Rel",
        key: "rel",
        sort: 3,
        htmlAttr: "rel",
        inputtype: LinkInput
    }, {
        name: "Target",
        key: "target",
        sort: 4,
        htmlAttr: "target",
        inputtype: SelectInput,
        data: {
            options: [{
                value: "",
                text: ""
            }, {
                value: "_blank",
                text: "Blank"
            }, {
                value: "_parent",
                text: "Parent"
            }, {
                value: "_self",
                text: "Self"
            }, {
                value: "_top",
                text: "Top"
            }]
        },
    }, {
        name: "Download",
        sort: 5,
        key: "download",
        htmlAttr: "download",
        inputtype: CheckboxInput,
    }];

Vvveb.Components.extend("_base", "html/link", {
    nodes: ["a"],
    name: "Link",
    html: '<a href="#" rel="noopener">Link Text</a>',
    image: "icons/link.png",
    properties: linkComponentProperties
});

Vvveb.Components.extend("_base", "html/image", {
    nodes: ["img"],
    name: "Image",
    html: '<img src="' + Vvveb.baseUrl + 'icons/image.svg" class="mw-100 align-center">',
    image: "icons/image.png",
    resizable: true,//show select box resize handlers

    properties: [{
        name: "Image",
        key: "src",
        htmlAttr: "src",
        inputtype: ImageInput
    }, {
        name: "Width",
        key: "width",
        htmlAttr: "width",
        inputtype: NumberInput
    }, {
        name: "Height",
        key: "height",
        htmlAttr: "height",
        inputtype: NumberInput
    }, {
        name: "Alt",
        key: "alt",
        htmlAttr: "alt",
        inputtype: TextInput
    }, {
        name: "Align",
        key: "align",
        htmlAttr: "class",
        inline: false,
        validValues: ["", "align-left", "align-center", "align-right"],
        inputtype: RadioButtonInput,
        data: {
            extraclass: "btn-group-sm btn-group-fullwidth",
            options: [{
                value: "",
                icon: "la la-times",
                //text: "None",
                title: "None",
                checked: true,
            }, {
                value: "align-left",
                //text: "Left",
                title: "text-start",
                icon: "la la-align-left",
                checked: false,
            }, {
                value: "align-center",
                //text: "Center",
                title: "Center",
                icon: "la la-align-center",
                checked: false,
            }, {
                value: "align-right",
                //text: "Right",
                title: "Right",
                icon: "la la-align-right",
                checked: false,
            }],
        },
    }, {
        key: "link_options",
        inputtype: SectionInput,
        //name:false,
        data: { header: "Link" },
    }, {
        name: "Enable link",
        key: "enable_link",
        inputtype: CheckboxInput,
        data: {
            className: "form-switch"
        },
        setGroup: value => {
            let group = document.querySelectorAll('.mb-3[data-group="link"]');
            if (group.length) {
                group.forEach(el => {
                    if (value) {
                        el.style.display = "";
                    } else {
                        el.style.display = "none";
                    }
                });
            }
        },
        onChange: function (node, value, input) {
            this.setGroup(value);
            if (value) {
                const wrappingElement = document.createElement('a');
                node.replaceWith(wrappingElement);
                wrappingElement.appendChild(node);
            } else {
                if (node.parentNode.tagName.toLowerCase() == "a") {
                    node.parentNode.replaceWith(node);
                }
            }
            return node;
        },
        init: function (node) {
            let value = node.parentNode.tagName.toLowerCase() == "a";
            this.setGroup(value);
            return value;
        }
    }].concat(
        //add link properties after setting parent to <a> element
        linkComponentProperties.map(
            (el) => { let a = Object.assign({}, el); a["parent"] = "a"; a["group"] = "link"; return a }
        )),

    init(node) {
        let group = document.querySelectorAll('.mb-3[data-group="link"]');
        if (group.length) {
            group.forEach(el => {
                if (value) {
                    el.style.display = "";
                } else {
                    el.style.display = "none";
                }
            });
        }

        return node;
    }
});

Vvveb.Components.extend("_base", "html/hr", {
    image: "icons/hr.png",
    nodes: ["hr"],
    name: "Horizontal Rule",
    html: '<hr class="border-secondary border-4 opacity-25">',
    properties: [{
        name: "Type",
        key: "border-color",
        htmlAttr: "class",
        validValues: ["border-primary", "border-secondary", "border-success", "border-danger", "border-warning", "border-info", "border-light", "border-dark", "border-white"],
        inputtype: SelectInput,
        data: {
            options: [{
                value: "Default",
                text: ""
            }, {
                value: "border-primary",
                text: "Primary"
            }, {
                value: "border-secondary",
                text: "Secondary"
            }, {
                value: "border-success",
                text: "Success"
            }, {
                value: "border-danger",
                text: "Danger"
            }, {
                value: "border-warning",
                text: "Warning"
            }, {
                value: "border-info",
                text: "Info"
            }, {
                value: "border-light",
                text: "Light"
            }, {
                value: "border-dark",
                text: "Dark"
            }, {
                value: "border-white",
                text: "White"
            }]
        }
    }, {
        name: "Border",
        key: "border-size",
        htmlAttr: "class",
        validValues: ["border-1", "border-2", "border-3", "border-4", "border-5"],
        inputtype: SelectInput,
        data: {
            options: [{
                value: "Default",
                text: ""
            }, {
                value: "border-1",
                text: "Size 1"
            }, {
                value: "border-2",
                text: "Size 2"
            }, {
                value: "border-3",
                text: "Size 3"
            }, {
                value: "border-4",
                text: "Size 4"
            }, {
                value: "border-5",
                text: "Size 5"
            }]
        }
    }, {
        name: "Opacity",
        key: "opacity",
        htmlAttr: "class",
        validValues: ["opacity-25", "opacity-50", "opacity-75", "opacity-100"],
        inputtype: SelectInput,
        data: {
            options: [{
                value: "Default",
                text: ""
            }, {
                value: "opacity-25",
                text: "Opacity 25%"
            }, {
                value: "opacity-50",
                text: "Opacity 50%"
            }, {
                value: "opacity-75",
                text: "Opacity 75%"
            }, {
                value: "opacity-100",
                text: "Opacity 100%"
            }]
        }
    }]
});

Vvveb.Components.extend("_base", "html/label", {
    name: "Label",
    nodes: ["label"],
    html: '<label for="">Label</label>',
    properties: [{
        name: "For id",
        htmlAttr: "for",
        key: "for",
        inputtype: TextInput
    }]
});


Vvveb.Components.extend("_base", "html/textinput", {
    name: "Input",
    nodes: ["input"],
    //attributes: {"type":"text"},
    image: "icons/input.png",
    html: '<input type="text" class="form-control">',
    properties: [{
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput
    }, {
        name: "Value",
        key: "value",
        htmlAttr: "value",
        inputtype: TextInput
    }, {
        name: "Type",
        key: "type",
        htmlAttr: "type",
        inputtype: SelectInput,
        data: {
            options: [{
                value: "text",
                text: "text"
            }, {
                value: "button",
                text: "button"
            }, {
                value: "checkbox",
                text: "checkbox"
            }, {
                value: "color",
                text: "color"
            }, {
                value: "date",
                text: "date"
            }, {
                value: "datetime-local",
                text: "datetime-local"
            }, {
                value: "email",
                text: "email"
            }, {
                value: "file",
                text: "file"
            }, {
                value: "hidden",
                text: "hidden"
            }, {
                value: "image",
                text: "image"
            }, {
                value: "month",
                text: "month"
            }, {
                value: "number",
                text: "number"
            }, {
                value: "password",
                text: "password"
            }, {
                value: "radio",
                text: "radio"
            }, {
                value: "range",
                text: "range"
            }, {
                value: "reset",
                text: "reset"
            }, {
                value: "search",
                text: "search"
            }, {
                value: "submit",
                text: "submit"
            }, {
                value: "tel",
                text: "tel"
            }, {
                value: "text",
                text: "text"
            }, {
                value: "time",
                text: "time"
            }, {
                value: "url",
                text: "url"
            }, {
                value: "week",
                text: "week"
            }]
        }
    }, {
        name: "Placeholder",
        key: "placeholder",
        htmlAttr: "placeholder",
        inputtype: TextInput
    }, {
        name: "Disabled",
        key: "disabled",
        htmlAttr: "disabled",
        col: 6,
        inline: true,
        inputtype: CheckboxInput,
    }, {
        name: "Required",
        key: "required",
        htmlAttr: "required",
        col: 6,
        inline: true,
        inputtype: CheckboxInput,
    }]
});

Vvveb.Components.extend("_base", "html/selectinput", {
    nodes: ["select"],
    name: "Select Input",
    image: "icons/select_input.png",
    html: '<select class="form-control"><option value="value1">Text 1</option><option value="value2">Text 2</option><option value="value3">Text 3</option></select>',

    beforeInit: function (node) {
        properties = [];
        let i = 0;

        node.querySelectorAll('option').forEach(el => {
            data = { "value": el.value, "text": el.text };
            i++;
            properties.push({
                name: "Option " + i,
                key: "option" + i,
                //index: i - 1,
                optionNode: el,
                inline: true,
                inputtype: TextValueInput,
                data: data,
                onChange: function (node, value, input) {

                    option = this.optionNode;

                    //if remove button is clicked remove option and render row properties
                    if (input.nodeName == 'BUTTON') {
                        option.remove();
                        Vvveb.Components.render("html/selectinput");
                        return node;
                    }

                    if (input.name == "value") option.setAttribute("value", value);
                    else if (input.name == "text") option.textContent = value;
                    return node;
                },
            });
        });

        //remove all option properties
        this.properties = this.properties.filter(function (item) {
            return item.key.indexOf("option") === -1;
        });

        //add remaining properties to generated column properties
        this.properties = properties.concat(this.properties);

        return node;
    },

    properties: [{
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput
    }, {
        name: "Disabled",
        key: "disabled",
        htmlAttr: "disabled",
        col: 6,
        inline: true,
        inputtype: CheckboxInput,
    }, {
        name: "Required",
        key: "required",
        htmlAttr: "required",
        col: 6,
        inline: true,
        inputtype: CheckboxInput,
    }, {
        name: "Option",
        key: "option1",
        inputtype: TextValueInput
    }, {
        name: "Option",
        key: "option2",
        inputtype: TextValueInput
    }, {
        name: "",
        key: "addChild",
        inputtype: ButtonInput,
        data: { text: "Add option", icon: "la-plus" },
        onChange: function (node) {
            node.append(generateElements('<option value="value">Text</option>')[0]);

            //render component properties again to include the new column inputs
            Vvveb.Components.render("html/selectinput");

            return node;
        }
    }]
});

Vvveb.Components.extend("_base", "html/textareainput", {
    nodes: ["textarea"],
    name: "Text Area",
    image: "icons/textarea.png",
    html: '<textarea class="form-control"></textarea>',
    properties: [{
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput
    }, {
        name: "Value",
        key: "value",
        htmlAttr: "value",
        inputtype: TextInput
    }, {
        name: "Placeholder",
        key: "placeholder",
        htmlAttr: "placeholder",
        inputtype: TextInput
    }, {
        name: "Columns",
        key: "cols",
        htmlAttr: "cols",
        inputtype: NumberInput
    }, {
        name: "Rows",
        key: "rows",
        htmlAttr: "rows",
        inputtype: NumberInput
    }, {
        name: "Disabled",
        key: "disabled",
        htmlAttr: "disabled",
        col: 6,
        inline: true,
        inputtype: CheckboxInput,
    }, {
        name: "Required",
        key: "required",
        htmlAttr: "required",
        col: 6,
        inline: true,
        inputtype: CheckboxInput,
    }]
});
Vvveb.Components.extend("_base", "html/radiobutton", {
    name: "Radio Button",
    attributes: { "type": "radio" },
    image: "icons/radio_button.png",
    html: `<div class="form-check">
			  <label class="form-check-label">
				<input class="form-check-input" type="radio" name="radiobutton"> Option 1
			  </label>
			</div>
			<div class="form-check">
			  <label class="form-check-label">
				<input class="form-check-input" type="radio" name="radiobutton" checked> Option 2
			  </label>
			</div>
			<div class="form-check">
			  <label class="form-check-label">
				<input class="form-check-input" type="radio" name="radiobutton"> Option 3
			  </label>
			</div>`,
    properties: [{
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput,
        //inline:true,
        //col:6
    }, {
        name: "Value",
        key: "value",
        htmlAttr: "value",
        inputtype: TextInput,
        //inline:true,
        //col:6
    }, {
        name: "Checked",
        key: "checked",
        htmlAttr: "Checked",
        inputtype: CheckboxInput,
        //inline:true,
        //col:6
    }, {
        name: "Disabled",
        key: "disabled",
        htmlAttr: "disabled",
        col: 6,
        inline: true,
        inputtype: CheckboxInput,
    }, {
        name: "Required",
        key: "required",
        htmlAttr: "required",
        col: 6,
        inline: true,
        inputtype: CheckboxInput,
    }]
});

Vvveb.Components.extend("_base", "html/checkbox", {
    name: "Checkbox",
    attributes: { "type": "checkbox" },
    image: "icons/checkbox.png",
    html: `<div class="form-check">
			  <label class="form-check-label">
				<input class="form-check-input" type="checkbox" value=""> Default checkbox
			  </label>
			</div>`,
    properties: [{
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput,
        //inline:true,
        //col:6
    }, {
        name: "Value",
        key: "value",
        htmlAttr: "value",
        inputtype: TextInput,
        //inline:true,
        //col:6
    }, {
        name: "Checked",
        key: "checked",
        htmlAttr: "Checked",
        inputtype: CheckboxInput,
        //inline:true,
        //col:6
    }, {
        name: "Disabled",
        key: "disabled",
        htmlAttr: "disabled",
        col: 6,
        inline: true,
        inputtype: CheckboxInput,
    }, {
        name: "Required",
        key: "required",
        htmlAttr: "required",
        col: 6,
        inline: true,
        inputtype: CheckboxInput,
    }]
});

/*
Vvveb.Components.extend("_base", "html/fileinput", {
    name: "Input group",
    attributes: {"type":"file"},
    image: "icons/text_input.svg",
    html: '<input type="file" class="form-control">'
});
*/

Vvveb.Components.extend("_base", "html/video", {
    nodes: ["video"],
    name: "Video",
    html: '<video width="320" height="240" playsinline loop autoplay muted src="../../media/demo/sample.webm" poster="../../media/sample.webp"><video>',
    dragHtml: '<img  width="320" height="240" src="' + Vvveb.baseUrl + 'icons/video.svg">',
    image: "icons/video.png",
    resizable: true,//show select box resize handlers
    properties: [{
        name: "Video",
        //child: "source",
        key: "src",
        htmlAttr: "src",
        inputtype: VideoInput
    }, {
        name: "Poster",
        key: "poster",
        htmlAttr: "poster",
        inputtype: ImageInput
    }, {
        name: "Width",
        key: "width",
        htmlAttr: "width",
        inputtype: TextInput
    }, {
        name: "Height",
        key: "height",
        htmlAttr: "height",
        inputtype: TextInput
    }, {
        name: "Muted",
        key: "muted",
        htmlAttr: "muted",
        inputtype: CheckboxInput
    }, {
        name: "Loop",
        key: "loop",
        htmlAttr: "loop",
        inputtype: CheckboxInput
    }, {
        name: "Autoplay",
        key: "autoplay",
        htmlAttr: "autoplay",
        inputtype: CheckboxInput
    }, {
        name: "Plays inline",
        key: "playsinline",
        htmlAttr: "playsinline",
        inputtype: CheckboxInput
    }, {
        name: "Controls",
        key: "controls",
        htmlAttr: "controls",
        inputtype: CheckboxInput
    }, {
        name: "",
        key: "autoplay_warning",
        inline: false,
        col: 12,
        inputtype: NoticeInput,
        data: {
            type: 'warning',
            title: 'Autoplay',
            text: 'Most browsers allow auto play only if video is muted and plays inline'
        }
    }]
});


Vvveb.Components.extend("_base", "html/button", {
    nodes: ["button"],
    name: "Html Button",
    image: "icons/button.png",
    html: '<button class="btn btn-secondary">Button</button>',
    properties: [{
        name: "Text",
        key: "text",
        htmlAttr: "innerHTML",
        inputtype: TextInput
    }, {
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput
    }, {
        name: "Type",
        key: "type",
        htmlAttr: "type",
        inputtype: SelectInput,
        data: {
            options: [{
                value: "button",
                text: "button"
            }, {
                value: "reset",
                text: "reset"
            }, {
                value: "submit",
                text: "submit"
            }],
        }
    }, {
        name: "Autofocus",
        key: "autofocus",
        htmlAttr: "autofocus",
        inputtype: CheckboxInput,
        inline: true,
        col: 6,
    }, {
        name: "Disabled",
        key: "disabled",
        htmlAttr: "disabled",
        inputtype: CheckboxInput,
        inline: true,
        col: 6,
    }]
});

Vvveb.Components.extend("_base", "html/paragraph", {
    nodes: ["p"],
    name: "Paragraph",
    image: "icons/paragraph.png",
    html: '<p>Ini adalah contoh text parapgrah yang dapat kamu ubah sesuai dengan konten landing page kamu. konten ini hanya contoh silahkan tulis sesuai dengan gaya copywriter kamu. </p>',
    properties: [{
        name: "Text align",
        key: "p-text-align",
        htmlAttr: "class",
        inline: false,
        validValues: ["", "text-start", "text-center", "text-end"],
        inputtype: RadioButtonInput,
        data: {
            extraclass: "btn-group-sm btn-group-fullwidth",
            options: [{
                value: "",
                icon: "la la-times",
                //text: "None",
                title: "None",
                checked: true,
            }, {
                value: "text-start",
                //text: "Left",
                title: "text-start",
                icon: "la la-align-left",
                checked: false,
            }, {
                value: "text-center",
                //text: "Center",
                title: "Center",
                icon: "la la-align-center",
                checked: false,
            }, {
                value: "text-end",
                //text: "Right",
                title: "Right",
                icon: "la la-align-right",
                checked: false,
            }],
        },
    }]
});

Vvveb.Components.extend("_base", "html/blockquote", {
    nodes: ["blockquote"],
    name: "Blockquote",
    image: "icons/blockquote.svg",
    html: `<blockquote cite="https://en.wikipedia.org/wiki/Marcus_Aurelius">
				<p>Today I shall be meeting with interference, ingratitude, insolence, disloyalty, ill-will, and selfishness all of them due to the offenders' ignorance of what is good or evil.</p>
				<cite class="small">
					<a href="https://en.wikipedia.org/wiki/Marcus_Aurelius" class="text-decoration-none" target="blank">Marcus Aurelius</a>
				</cite>	
			</blockquote>`,
    properties: [{
        name: "Cite",
        key: "cite",
        inline: false,
        htmlAttr: "cite",
        inputtype: TextInput,
    }]
});

Vvveb.Components.extend("_base", "html/list", {
    nodes: ["ul", "ol"],
    name: "List",
    image: "icons/list.png",
    html: `<ul>
				<li>Landing page dirancang khusus untuk mendorong pengunjung melakukan tindakan tertentu, seperti mengisi formulir, membeli produk, atau mendaftar layanan.</li>
				<li>Landing page dirancang khusus untuk mendorong pengunjung melakukan tindakan tertentu, seperti mengisi formulir, membeli produk, atau mendaftar layanan.</li>
				<li>Landing page dirancang khusus untuk mendorong pengunjung melakukan tindakan tertentu, seperti mengisi formulir, membeli produk, atau mendaftar layanan.</li>
			</ul>`,
});

Vvveb.Components.extend("_base", "html/preformatted", {
    nodes: ["pre"],
    name: "Preformatted",
    image: "icons/paragraph.svg",
    html: `<pre>Today I shall be meeting with interference, 
ingratitude, insolence, disloyalty, ill-will, and
selfishness all of them due to the offenders'
ignorance of what is good or evil..</pre>`,
    properties: [{
        name: "Text",
        key: "text",
        inline: false,
        htmlAttr: "innerHTML",
        inputtype: TextareaInput,
        data: {
            rows: 20,
        }
    }]
});

Vvveb.Components.extend("_base", "html/form", {
    nodes: ["form"],
    image: "icons/form.png",
    name: "Form",
    html: `<div data-v-component-plugin-contact-form-form="" data-v-save="true" data-v-email="true" data-v-sendto="" data-v-confirm-email="true" data-v-name="contact-form-appointment">

		<div class="notifications" data-v-notifications="">

			<div class="alert alert-danger d-flex alert-dismissable    " role="alert" data-v-if="this.errors">

				<div class="icon align-middle me-2">
					<i class="align-middle la la-2x lh-1 la-exclamation-triangle"></i>
				</div>

				<div class="flex-grow-1 align-self-center text-small">
					<div data-v-notification-error="">
						<div data-v-notification-text="">Pesan gagal terkirim, pastikan data input benar</div>
					</div>				</div>


				
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="41" height="64" fill="#dc3545" class="btn-close"><defs><style>.eva-11{fill:#fff;opacity:0;}.eva-12{fill:inherit;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="close-square"><g id="close-square-2" data-name="close-square"><rect class="eva-11"></rect><path class="eva-12" d="M18,3H6A3,3,0,0,0,3,6V18a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V6A3,3,0,0,0,18,3ZM14.71,13.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0L12,13.41l-1.29,1.3a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L10.59,12l-1.3-1.29a1,1,0,0,1,1.42-1.42L12,10.59l1.29-1.3a1,1,0,0,1,1.42,1.42L13.41,12Z" fill="#dc3545" color="#dc3545"></path></g></g></g></svg></div>			<div class="alert alert-success d-flex  alert-dismissable d-flex" role="alert" data-v-notification-success="">

				<div class="icon align-middle me-2">
					<i class="align-middle la la-2x lh-1 la-check-circle"></i>
				</div>

				<div class="flex-grow-1 align-self-center align-middle" data-v-notification-text="">Pesan telah berhasil kami terima</div>

				
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="41" height="64" fill="#28a745" class="btn-close"><defs><style>.eva-11{fill:#fff;opacity:0;}.eva-12{fill:inherit;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="close-square"><g id="close-square-2" data-name="close-square"><rect class="eva-11"></rect><path class="eva-12" d="M18,3H6A3,3,0,0,0,3,6V18a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V6A3,3,0,0,0,18,3ZM14.71,13.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0L12,13.41l-1.29,1.3a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L10.59,12l-1.3-1.29a1,1,0,0,1,1.42-1.42L12,10.59l1.29-1.3a1,1,0,0,1,1.42,1.42L13.41,12Z" fill="#dc3545" color="#dc3545"></path></g></g></g></svg></div>		</div>

	<form action="" method="post" data-v-vvveb-action="submit" data-selector="[data-v-component-plugin-contact-form-form]" data-v-vvveb-on="submit">
	  <input type="hidden" class="form-control" placeholder="First name" name="firstname-empty" value="">	

	  <div class="row mt-4">
		<div class="col">
		  <input type="email" class="form-control" placeholder="Masukan Nama Email" name="email" required="" fdprocessedid="iz9weh" value="">
		</div>
	  </div>
	  <div class="row mt-4">
		<div class="col">
		  <textarea class="form-control" name="message" rows="3" placeholder="Tinggalkan Pesan" required=""></textarea>
		</div>
	  </div>

	 

	 <input type="text" class="form-control d-none" placeholder="Contact form" name="contact-form" value="">	
	 
	 <input type="text" class="form-control d-none" placeholder="Subject" name="subject-empty" value="">	
	 
	 	
	 

	  <div class="row mt-4">
		<div class="col">
		  <button type="submit" class="btn btn-primary" fdprocessedid="6wvwwu">
                  <span class="loading d-none">
                    <span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true">
                    </span>
                    <span>Submitting</span> ... </span>

                  <span class="button-text">
                    <span>Submit</span>
                    <i class="la la-lg la-envelope opacity-50 ms-2"></i>
                  </span>
                </button>
		</div>
	  </div>
	</form>
</div>`,
    properties: [/*{
        name: "Style",
        key: "style",
        htmlAttr: "class",
        validValues: ["", "form-search", "form-inline", "form-horizontal"],
        inputtype: SelectInput,
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "form-search",
                text: "Search"
            }, {
                value: "form-inline",
                text: "Inline"
            }, {
                value: "form-horizontal",
                text: "Horizontal"
            }]
        }
    }, */{
            name: "Action",
            key: "action",
            htmlAttr: "action",
            inputtype: TextInput
        }, {
            name: "Method",
            key: "method",
            htmlAttr: "method",
            inputtype: SelectInput,
            data: {
                options: [{
                    value: "post",
                    text: "Post"
                }, {
                    value: "get",
                    text: "Get"
                }]
            }
        }, {
            name: "Encoding type",
            key: "enctype",
            htmlAttr: "enctype",
            inputtype: SelectInput,
            data: {
                options: [{
                    value: "",
                    text: ""
                }, {
                    value: "application/x-www-form-urlencoded",
                    text: "Url encoded (default)"
                }, {
                    value: "multipart/form-data",
                    text: "Multipart (for file upload)"
                }, {
                    value: "text/plain",
                    text: "Text plain"
                }]
            }
        }]
});

Vvveb.Components.extend("_base", "html/tablerow", {
    nodes: ["tr"],
    image: "icons/table.png",
    name: "Table Row",
    html: "<tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr>",
    properties: [{
        name: "Type",
        key: "type",
        htmlAttr: "class",
        inputtype: SelectInput,
        validValues: ["", "success", "danger", "warning", "active"],
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "success",
                text: "Success"
            }, {
                value: "error",
                text: "Error"
            }, {
                value: "warning",
                text: "Warning"
            }, {
                value: "active",
                text: "Active"
            }]
        }
    }]
});
Vvveb.Components.extend("_base", "html/tablecell", {
    nodes: ["td"],
    image: "icons/table.png",
    name: "Table Cell",
    html: "<td>Cell</td>"
});

Vvveb.Components.extend("_base", "html/tableheadercell", {
    nodes: ["th"],
    image: "icons/table.png",
    name: "Table Header Cell",
    html: "<th>Head</th>"
});

Vvveb.Components.extend("_base", "html/tablebody", {
    nodes: ["tbody"],
    image: "icons/table.png",
    name: "Table Body",
    html: "<tbody>Table body</tbody>"
});

Vvveb.Components.extend("_base", "html/tablefooter", {
    nodes: ["tfooter"],
    image: "icons/table.png",
    name: "Table Footer",
    html: "<tfooter>Table footer</tfooter>"
});

Vvveb.Components.extend("_base", "html/tablehead", {
    nodes: ["thead"],
    image: "icons/table.png",
    name: "Table Head",
    html: "<thead><tr><th>Head 1</th><th>Head 2</th><th>Head 3</th></tr></thead>",
    properties: [{
        name: "Type",
        key: "type",
        htmlAttr: "class",
        inputtype: SelectInput,
        validValues: ["", "success", "danger", "warning", "info"],
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "success",
                text: "Success"
            }, {
                value: "anger",
                text: "Error"
            }, {
                value: "warning",
                text: "Warning"
            }, {
                value: "info",
                text: "Info"
            }]
        }
    }]
});

Vvveb.Components.extend("_base", "html/table", {
    nodes: ["table"],
    classes: ["table"],
    image: "icons/table.png",
    name: "Table",
    html: `<table class="table table-striped table-hover">
			  <thead>
				<tr>
				  <th scope="col">#</th>
				  <th scope="col">Nama Depan</th>
				  <th scope="col">Belakang</th>
				  <th scope="col">Email</th>
				</tr>
			  </thead>
			  <tbody>
				<tr>
				  <th scope="row">1</th>
				  <td>Rudi</td>
				  <td>Otto</td>
				  <td>rudi@landingin.id</td>
				</tr>
				<tr>
				  <th scope="row">2</th>
				  <td>Rana</td>
				  <td>Rahman</td>
				  <td>rana@landingin.id</td>
				</tr>
				<tr>
				  <th scope="row">3</th>
				  <td colspan="2">Kemal</td>
				  <td>kemal@landingin.id</td>
				</tr>
			  </tbody>
			</table>`,
    properties: [{
        name: "Type",
        key: "type",
        htmlAttr: "class",
        validValues: ["table-primary", "table-secondary", "table-success", "table-danger", "table-warning", "table-info", "table-light", "table-dark", "table-white"],
        inputtype: SelectInput,
        data: {
            options: [{
                value: "Default",
                text: ""
            }, {
                value: "table-primary",
                text: "Primary"
            }, {
                value: "table-secondary",
                text: "Secondary"
            }, {
                value: "table-success",
                text: "Success"
            }, {
                value: "table-danger",
                text: "Danger"
            }, {
                value: "table-warning",
                text: "Warning"
            }, {
                value: "table-info",
                text: "Info"
            }, {
                value: "table-light",
                text: "Light"
            }, {
                value: "table-dark",
                text: "Dark"
            }, {
                value: "table-white",
                text: "White"
            }]
        }
    }, {
        name: "Responsive",
        key: "responsive",
        htmlAttr: "class",
        validValues: ["table-responsive"],
        inputtype: ToggleInput,
        data: {
            on: "table-responsive",
            off: ""
        }
    }, {
        name: "Small",
        key: "small",
        htmlAttr: "class",
        validValues: ["table-sm"],
        inputtype: ToggleInput,
        data: {
            on: "table-sm",
            off: ""
        }
    }, {
        name: "Hover",
        key: "hover",
        htmlAttr: "class",
        validValues: ["table-hover"],
        inputtype: ToggleInput,
        data: {
            on: "table-hover",
            off: ""
        }
    }, {
        name: "Bordered",
        key: "bordered",
        htmlAttr: "class",
        validValues: ["table-bordered"],
        inputtype: ToggleInput,
        data: {
            on: "table-bordered",
            off: ""
        }
    }, {
        name: "Striped",
        key: "striped",
        htmlAttr: "class",
        validValues: ["table-striped"],
        inputtype: ToggleInput,
        data: {
            on: "table-striped",
            off: ""
        }
    }, {
        name: "Inverse",
        key: "inverse",
        htmlAttr: "class",
        validValues: ["table-inverse"],
        inputtype: ToggleInput,
        data: {
            on: "table-inverse",
            off: ""
        }
    },
    {
        name: "Head options",
        key: "head",
        htmlAttr: "class",
        child: "thead",
        inputtype: SelectInput,
        validValues: ["", "thead-dark", "thead-light"],
        data: {
            options: [{
                value: "",
                text: "None"
            }, {
                value: "thead-default",
                text: "Default"
            }, {
                value: "thead-inverse",
                text: "Inverse"
            }]
        }
    }]
});

Vvveb.Components.extend("_base", "html/audio", {
    nodes: ["audio"],
    attributes: ["data-component-audio"],
    name: "Audio",
    image: "icons/audio.png",
    html: `<figure data-component-audio><audio controls src="#"></audio></figure>`,
    properties: [{
        name: "Src",
        key: "src",
        child: "audio",
        htmlAttr: "src",
        inputtype: LinkInput
    }, {
        key: "audio_options",
        inputtype: SectionInput,
        name: false,
        data: { header: "Options" },
    }, {
        name: "Autoplay",
        key: "autoplay",
        htmlAttr: "autoplay",
        child: "audio",
        inputtype: CheckboxInput,
        inline: true,
        col: 4,
/*    }, {
        name: "Controls",
        key: "controls",
        htmlAttr: "controls",
        inputtype: CheckboxInput,
        child:"audio",
        inline:true,
        col:4,
*/    }, {
        name: "Loop",
        key: "loop",
        htmlAttr: "loop",
        inputtype: CheckboxInput,
        child: "audio",
        inline: true,
        col: 4
    }]
});


Vvveb.Components.extend("_base", "html/pdf", {
    attributes: ["data-component-pdf"],
    image: "icons/pdf.svg",
    name: "Pdf embed",
    html: `<object data="" type="application/pdf" data-component-pdf></object>`,
    properties: [{
        name: "Data",
        key: "data",
        htmlAttr: "data",
        inputtype: TextInput
    }]
});

Vvveb.Components.extend("_base", "html/embed", {
    attributes: ["data-component-embed"],
    image: "icons/embed.svg",
    name: "Embed",
    html: `<object data="" type="application/pdf" data-component-pdf></object>`,
    properties: [{
        name: "Data",
        key: "data",
        htmlAttr: "data",
        inputtype: TextInput
    }]
});

Vvveb.Components.extend("_base", "html/html", {
    nodes: ["html"],
    name: "Html Page",
    image: "icons/posts.png",
    html: `<html><body></body></html>`,
    properties: [{
        name: "Title",
        key: "title",
        htmlAttr: "innerHTML",
        inputtype: TextInput,
        child: "title",
    }, {
        name: "Meta description",
        key: "description",
        htmlAttr: "content",
        inputtype: TextInput,
        child: 'meta[name=description]',
    }, {
        name: "Meta keywords",
        key: "keywords",
        htmlAttr: "content",
        inputtype: TextInput,
        child: 'meta[name=keywords]',
    }]
});

/*
Vvveb.ComponentsGroup['Base'] =
["html/heading", "html/image", "html/hr",  "html/form", "html/textinput", "html/textareainput", "html/selectinput", "html/fileinput", "html/checkbox", "html/radiobutton", "html/link", "html/video", "html/button", "html/paragraph", "html/blockquote", "html/list", "html/table", "html/preformatted"];

*/

Vvveb.Components.extend("_base", "html/iframe", {
    attributes: ["data-component-iframe"],
    name: "Iframe",
    image: "icons/file.svg",
    html: '<div data-component-iframe><iframe src="https://www.vvveb.com" width="320" height="240"></iframe></div>',
    properties: [{
        name: "Src",
        key: "src",
        htmlAttr: "src",
        child: "iframe",
        inputtype: TextInput
    }, {
        name: "Width",
        key: "width",
        htmlAttr: "width",
        child: "iframe",
        inputtype: CssUnitInput
    }, {
        name: "Height",
        key: "height",
        htmlAttr: "height",
        child: "iframe",
        inputtype: CssUnitInput
    }]
});
