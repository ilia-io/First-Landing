import path from 'path';
import {correct, StageTest, wrong} from 'hs-test-web';

const pagePath = path.join(import.meta.url, '../../src/index.html');


class Test extends StageTest {

    page = this.getPage(pagePath)

    tests = [this.page.execute(() => {
        // test #1
        // # OF NODES

        // HELPERS-->
        this.notExist = (node, parentNode = "body", nodeName) => {
            if (typeof parentNode !== "string") return !parentNode.querySelector(node)
            const element = document.body.querySelector(node)
            if (!element) return true
            if (nodeName) return element.nodeName.toLowerCase() !== nodeName
            const parent = element.parentElement
            return parent.nodeName.toLowerCase() !== parentNode
        };
        this.innerTextExist = (node, correctVal) => {
            let element = node;
            if (typeof element === "string") element = document.querySelector(node);
            if (correctVal) return !element.innerText.trim().includes(correctVal)
            return !element.innerText || element.innerText.trim().length === 0;
        };
        this.correctAttr = (node, attr, correctVal) => {
            let element = node;
            if (typeof element === "string") element = document.querySelector(node);
            if (!element) return true
            const _attr = element.getAttribute(attr)
            //console.log(element[attr].toString())
            return !_attr || !_attr.includes(correctVal);
        };
        this.correctStyle = (node, prop, correctVal) => {
            let element = node;
            if (typeof element === "string") element = document.querySelector(node);
            let style = getComputedStyle(element)[prop];
            if (style.includes("px")) {
                style = Math.round(style.split("px")[0]) + 1
                correctVal = Math.round(correctVal.split("px")[0]) + 1
            }
            //console.log(style)
            return !style || style !== correctVal
        };
        this.bgColorExist = (node) => {
            const empty = "rgba(0, 0, 0, 0)";
            const element = document.querySelector(node);
            const style = getComputedStyle(element).backgroundColor;
            return !style || style.trim() === empty;
        };
        // <--HELPERS

        // check number of nodes in body
        let bodyNodes = Array.from(document.body.childNodes);
        this.innerBodyElements = bodyNodes.filter(
            e => e.nodeType === Node.ELEMENT_NODE);

        let len = this.innerBodyElements.length;
        const totalElements = 3;
        const errorMsg = `There should be ${totalElements} elements in the body of the HTML document, found: ${len}`;
        return len === totalElements ? correct() : wrong(errorMsg);

    }), this.page.execute(() => {
        // test #2
        // TAG EXIST

        // check if header exist
        let errorMsg = "The header tag is missing in the body of the HTML document.";
        if (this.notExist("header")) return wrong(errorMsg);

        // check if main exist
        errorMsg = "The main tag is missing in the body of the HTML document.";
        if (this.notExist("main")) return wrong(errorMsg);

        // check if footer exist
        errorMsg = "The footer tag is missing in the body of the HTML document.";
        if (this.notExist("footer")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #3
        // INNER TEXT
        // this test will be removed in later stages

        // header check is removed

        // main check is removed

        // footer check is removed

        return correct()

    }), this.page.execute(() => {
        // test #4
        // CSS LINK

        // check if css link exist
        const link = document.head.querySelector("link");
        let errorMsg = "CSS link is missing in the head of the HTML document.";
        if (!link) return wrong(errorMsg)

        // check if css link has right href
        errorMsg = "CSS link is missing the correct href attribute value.";
        if (this.correctAttr("link", "href", "style.css")) return wrong(errorMsg);

        // check if css link has right type
        errorMsg = "CSS link is missing the correct type attribute value.";
        if (this.correctAttr("link", "type", "text/css")) return wrong(errorMsg);

        // check if css link has right rel
        errorMsg = "CSS link is missing the correct rel attribute value.";
        if (this.correctAttr("link", "rel", "stylesheet")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #5
        // HEIGHT

        // check if body has max-height
        let errorMsg = "The body tag doesn't have a correct max-height value.";
        if (this.correctStyle("body", "maxHeight", "600px")) return wrong(errorMsg)

        // check if header has min-height
        errorMsg = "The header tag doesn't have the correct min-height value.";
        if (this.correctStyle("header", "minHeight", "60px")) return wrong(errorMsg)

        // check if main has min-height
        errorMsg = "The main tag doesn't have the correct min-height value.";
        if (this.correctStyle("main", "minHeight", "360px")) return wrong(errorMsg)

        // check if footer has min-height
        errorMsg = "The footer tag doesn't have the correct min-height value.";
        if (this.correctStyle("footer", "minHeight", "180px")) return wrong(errorMsg)

        return correct()

    }), this.page.execute(() => {
        // test #6
        // BACKGROUND COLOR
        // this test will be removed in later stages

        // check if header has correct bg color
        let errorMsg = "The header tag doesn't have the correct background color value.";
        if (this.correctStyle("header", "backgroundColor", "rgba(0, 0, 0, 0.85)")) return wrong(errorMsg)

        // check if main has bg color
        // this check is removed in stage3

        // check if footer has bg color
        errorMsg = "The footer tag doesn't have a background color value.";
        if (this.bgColorExist("footer")) return wrong(errorMsg)

        return correct()

    }), this.page.execute(() => {
        // test #7
        // BODY

        // check if body has correct margin
        let errorMsg = "The body tag doesn't have the correct margin value.";
        if (this.correctStyle("body", "margin", "0px")) return wrong(errorMsg)

        // check if body has different font-family
        errorMsg = "The body tag doesn't have the correct font-family value.";
        if (this.correctStyle("body", "font-family", "sans-serif")) return wrong(errorMsg)

        return correct()

    }), this.page.execute(() => {
        // test #8
        // NAV

        // check if nav exist
        let errorMsg = "The nav tag is missing inside the header tag.";
        if (this.notExist("nav", "header")) return wrong(errorMsg);

        // CONTAINER STYLE

        // check if nav has max-width style
        errorMsg = "The nav tag doesn't have the correct max-width value.";
        if (this.correctStyle("nav", "maxWidth", "100%")) return wrong(errorMsg)

        // check if nav has padding right style
        errorMsg = "The nav tag doesn't have the correct padding right value.";
        if (this.correctStyle("nav", "paddingRight", "16px")) return wrong(errorMsg)

        // check if nav has padding left style
        errorMsg = "The nav tag doesn't have the correct padding left value.";
        if (this.correctStyle("nav", "paddingLeft", "16px")) return wrong(errorMsg)

        // check if nav has margin right style
        errorMsg = "The nav tag doesn't have the correct margin right value.";
        if (this.correctStyle("nav", "marginRight", "0px")) return wrong(errorMsg)

        // check if nav has margin left style
        errorMsg = "The nav tag doesn't have the correct margin left value.";
        if (this.correctStyle("nav", "marginLeft", "0px")) return wrong(errorMsg)

        return correct()

    }), this.page.execute(() => {
        // test #9
        // NAV FLEX

        // check if nav has flex style
        let errorMsg = "The nav tag doesn't have the correct display value.";
        if (this.correctStyle("nav", "display", "flex")) return wrong(errorMsg)

        // check if nav has flex wrap style
        errorMsg = "The nav tag doesn't have the correct flex-wrap value.";
        if (this.correctStyle("nav", "flexWrap", "wrap")) return wrong(errorMsg)

        // check if nav has justify-content style
        errorMsg = "The nav tag doesn't have the correct justify-content value.";
        if (this.correctStyle("nav", "justifyContent", "space-between")) return wrong(errorMsg)

        return correct()

    }), this.page.execute(() => {
        // test #10
        // PY-1

        // NAV
        // check if nav has padding top style
        let errorMsg = "The nav tag doesn't have the correct padding top value.";
        if (this.correctStyle("nav", "paddingTop", "4px")) return wrong(errorMsg)

        // check if nav has padding bottom style
        errorMsg = "The nav tag doesn't have the correct padding bottom value.";
        if (this.correctStyle("nav", "paddingBottom", "4px")) return wrong(errorMsg)

        // HEADER
        // check if header has padding top style
        errorMsg = "The header tag doesn't have the correct padding top value.";
        if (this.correctStyle("header", "paddingTop", "4px")) return wrong(errorMsg)

        // check if header has padding bottom style
        errorMsg = "The header tag doesn't have the correct padding bottom value.";
        if (this.correctStyle("header", "paddingBottom", "4px")) return wrong(errorMsg)

        return correct()

    }), this.page.execute(() => {
        // test #11
        // LINKS EXIST

        // LINK_LOGO
        // check if link logo exist
        let errorMsg = "The anchor tag with the id of 'link_logo' is missing inside the nav tag.";
        if (this.notExist("#link_logo", "nav", "a")) return wrong(errorMsg);

        // LINK_HOME
        // check if link home exist
        errorMsg = "The anchor tag with the id of 'link_home' is missing inside the nav tag.";
        if (this.notExist("#link_home", "nav", "a")) return wrong(errorMsg);

        // LINK_PRODUCT
        // check if link product exist
        errorMsg = "The anchor tag with the id of 'link_product' is missing inside the nav tag.";
        if (this.notExist("#link_product", "nav", "a")) return wrong(errorMsg);

        // LINK_CONTACT
        // check if link contact exist
        errorMsg = "The anchor tag with the id of 'link_contact' is missing inside the nav tag.";
        if (this.notExist("#link_contact", "nav", "a")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #12
        // LINKS HREF

        // LINK_LOGO
        // check if link logo href correct
        let errorMsg = "The anchor tag with the id of 'link_logo' is missing the correct href attribute.";
        if (this.correctAttr("#link_logo", "href", "#home")) return wrong(errorMsg);

        // LINK_HOME
        // check if link home href correct
        errorMsg = "The anchor tag with the id of 'link_home' is missing the correct href attribute.";
        if (this.correctAttr("#link_home", "href", "#home")) return wrong(errorMsg);

        // LINK_PRODUCT
        // check if link product href correct
        errorMsg = "The anchor tag with the id of 'link_product' is missing the correct href attribute.";
        if (this.correctAttr("#link_product", "href", "#product")) return wrong(errorMsg);

        // LINK_CONTACT
        // check if link contact href correct
        errorMsg = "The anchor tag with the id of 'link_contact' is missing the correct href attribute.";
        if (this.correctAttr("#link_contact", "href", "#contact")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #13
        // LINK IMG

        // check if img exist
        let errorMsg = "The image tag is missing inside the link tag with the id of 'link_logo'.";
        if (this.notExist("img", "a")) return wrong(errorMsg);

        // check if img has correct src
        errorMsg = "The image tag in '#link_logo' doesn't have an src attribute value.";
        if (this.correctAttr("img", "src", "")) return wrong(errorMsg);

        // check if img has correct width
        errorMsg = "The image tag in '#link_logo' doesn't have the correct width attribute value.";
        if (this.correctAttr("img", "width", "64")) return wrong(errorMsg);

        // check if img has correct height
        errorMsg = "The image tag in '#link_logo' doesn't have the correct height attribute value.";
        if (this.correctAttr("img", "height", "64")) return wrong(errorMsg);

        // check if img has correct title
        errorMsg = "The image tag in '#link_logo' doesn't have a title attribute value.";
        if (this.correctAttr("img", "title", "")) return wrong(errorMsg);

        // check if img has correct alt
        errorMsg = "The image tag in '#link_logo' doesn't have an alt attribute value.";
        if (this.correctAttr("img", "alt", "")) return wrong(errorMsg);


        return correct()

    }), this.page.execute(() => {
        // test #14
        // LINKS MY-AUTO

        // LINK_LOGO
        // check if link logo margin-top correct
        let errorMsg = "The anchor tag with the id of 'link_logo' doesn't have the correct margin-top value.";
        if (this.correctStyle("#link_logo", "marginTop", "0px")) return wrong(errorMsg);

        // check if link logo margin-bottom correct
        errorMsg = "The anchor tag with the id of 'link_logo' doesn't have the correct margin-bottom value.";
        if (this.correctStyle("#link_logo", "marginBottom", "0px")) return wrong(errorMsg);

        // LINK_HOME
        // check if link home margin-top correct
        errorMsg = "The anchor tag with the id of 'link_home' doesn't have the correct margin-top value.";
        if (this.correctStyle("#link_home", "marginTop", "23.25px")) return wrong(errorMsg);

        // check if link home margin-bottom correct
        errorMsg = "The anchor tag with the id of 'link_home' doesn't have the correct margin-bottom value.";
        if (this.correctStyle("#link_home", "marginBottom", "23.25px")) return wrong(errorMsg);

        // LINK_PRODUCT
        // check if link product margin-top correct
        errorMsg = "The anchor tag with the id of 'link_product' doesn't have the correct margin-top value.";
        if (this.correctStyle("#link_product", "marginTop", "23.25px")) return wrong(errorMsg);

        // check if link product margin-bottom correct
        errorMsg = "The anchor tag with the id of 'link_product' doesn't have the correct margin-bottom value.";
        if (this.correctStyle("#link_product", "marginBottom", "23.25px")) return wrong(errorMsg);

        // LINK_CONTACT
        // check if link contact margin-top correct
        errorMsg = "The anchor tag with the id of 'link_contact' doesn't have the correct margin-top value.";
        if (this.correctStyle("#link_contact", "marginTop", "23.25px")) return wrong(errorMsg);

        // check if link contact margin-bottom correct
        errorMsg = "The anchor tag with the id of 'link_contact' doesn't have the correct margin-bottom value.";
        if (this.correctStyle("#link_contact", "marginBottom", "23.25px")) return wrong(errorMsg);
        return correct()

    }), this.page.execute(() => {
        // test #15
        // LINKS INNER TEXT

        // LINK_HOME
        // check if link home inner-text correct
        let errorMsg = "The anchor tag with the id of 'link_home' doesn't have the correct inner-text.";
        if (this.innerTextExist("#link_home", "Home")) return wrong(errorMsg);

        // LINK_PRODUCT
        // check if link product inner-text correct
        errorMsg = "The anchor tag with the id of 'link_product' doesn't have the correct inner-text.";
        if (this.innerTextExist("#link_product", "Product")) return wrong(errorMsg);

        // LINK_CONTACT
        // check if link contact inner-text correct
        errorMsg = "The anchor tag with the id of 'link_contact' doesn't have the correct inner-text.";
        if (this.innerTextExist("#link_contact", "Contact")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #16
        // LINKS COLOR

        // LINK_HOME
        let errorMsg = "The anchor tag with the id of 'link_home' doesn't have the correct color value.";
        if (this.correctStyle("#link_home", "color", "rgb(142, 142, 142)")) return wrong(errorMsg);

        // LINK_PRODUCT
        errorMsg = "The anchor tag with the id of 'link_product' doesn't have the correct color value.";
        if (this.correctStyle("#link_product", "color", "rgb(142, 142, 142)")) return wrong(errorMsg);

        // LINK_CONTACT
        errorMsg = "The anchor tag with the id of 'link_contact' doesn't have the correct color value.";
        if (this.correctStyle("#link_contact", "color", "rgb(142, 142, 142)")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #17
        // BANNER CONTENT EXIST

        // check if home div exist
        const homeDiv = document.body.querySelector("#home");
        let errorMsg = "The div tag with the id of 'home' is missing inside the main tag.";
        if (this.notExist("#home", "main", "div")) return wrong(errorMsg);

        // check if second div exist
        const secDiv = homeDiv.querySelector("div");
        errorMsg = "The second div tag is missing inside the home div tag.";
        if (!secDiv) return wrong(errorMsg);

        // check if h1 exist
        const h1 = secDiv.querySelector("h1");
        errorMsg = "The h1 tag is missing inside the second div tag.";
        if (!h1) return wrong(errorMsg);

        // check if p exist
        const paragraph = secDiv.querySelector("h1 + p");
        errorMsg = "The paragraph tag is missing after the h1 tag inside the second div tag.";
        if (!paragraph) return wrong(errorMsg);

        // check if anchor exist
        const anchor = secDiv.querySelector("p + a");
        errorMsg = "The anchor tag is missing after the paragraph tag inside the second div tag.";
        if (!anchor) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #18
        // CONTENT INNER TEXT

        // check if h1 has inner text
        const homeDiv = document.querySelector("#home");
        const secDiv = homeDiv.querySelector("div");
        let errorMsg = "The h1 tag doesn't have an inner-text.";
        if (this.innerTextExist("h1")) return wrong(errorMsg);

        errorMsg = "The paragraph tag doesn't have an inner-text.";
        if (this.innerTextExist("p")) return wrong(errorMsg);

        const anchor = secDiv.querySelector("a");
        errorMsg = "The anchor tag doesn't have an inner-text.";
        if (this.innerTextExist(anchor)) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #19
        // HOME DIV STYLE

        // check if it has position relative
        let errorMsg = "The div tag with the id of 'home' doesn't have the correct position value.";
        if (this.correctStyle("#home", "position", "relative")) return wrong(errorMsg);

        // check if it has overflow hidden
        errorMsg = "The div tag with the id of 'home' doesn't have the correct overflow value.";
        if (this.correctStyle("#home", "overflow", "hidden")) return wrong(errorMsg);

        // check if it has padding 1rem
        errorMsg = "The div tag with the id of 'home' doesn't have the correct padding value.";
        if (this.correctStyle("#home", "padding", "16px")) return wrong(errorMsg);

        // check if it has text center
        errorMsg = "The div tag with the id of 'home' doesn't have the correct text-align value.";
        if (this.correctStyle("#home", "text-align", "center")) return wrong(errorMsg);

        // check if it has bg light
        errorMsg = "The div tag with the id of 'home' doesn't have the correct background color value.";
        if (this.correctStyle("#home", "background-color", "rgb(248, 249, 250)")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #20
        // SECOND DIV STYLE

        // check if it has margin right auto
        const homeDiv = document.querySelector("#home");
        const secDiv = homeDiv.querySelector("div");
        let errorMsg = "The second div tag doesn't have the correct margin right value.";
        if (this.correctStyle(secDiv, "margin-right", "0px")) return wrong(errorMsg);

        // check if it has margin left auto
        errorMsg = "The second div tag doesn't have the correct margin left value.";
        if (this.correctStyle(secDiv, "margin-left", "0px")) return wrong(errorMsg);

        // check if it has margin top 5
        errorMsg = "The second div tag doesn't have the correct margin top value.";
        if (this.correctStyle(secDiv, "margin-top", "48px")) return wrong(errorMsg);

        // check if it has margin bottom 5
        errorMsg = "The second div tag doesn't have the correct margin bottom value.";
        if (this.correctStyle(secDiv, "margin-bottom", "48px")) return wrong(errorMsg);

        // P STYLE

        // check if it has font size
        const paragraph = secDiv.querySelector("p");
        errorMsg = "The paragraph tag doesn't have the correct font size value.";
        if (this.correctStyle(paragraph, "font-size", "20px")) return wrong(errorMsg);

        // check if it has font weight
        errorMsg = "The paragraph tag doesn't have the correct font weight value.";
        if (this.correctStyle(paragraph, "font-weight", "300")) return wrong(errorMsg);


        return correct()

    }), this.page.execute(() => {
        // test #21
        // ANCHOR  STYLE

        // check if it has href
        const homeDiv = document.querySelector("#home");
        const secDiv = homeDiv.querySelector("div");
        const anchor = secDiv.querySelector("a");
        let errorMsg = "The anchor tag doesn't have the correct href attribute value.";
        if (this.correctAttr(anchor, "href", "#product")) return wrong(errorMsg);

        // check if it has display inline-block
        errorMsg = "The anchor tag doesn't have the correct display value.";
        if (this.correctStyle(anchor, "display", "inline-block")) return wrong(errorMsg);

        // check if it has padding
        errorMsg = "The anchor tag doesn't have the correct padding value.";
        if (this.correctStyle(anchor, "padding", "6px 12px")) return wrong(errorMsg);

        // check if it has font size
        errorMsg = "The anchor tag doesn't have the correct font size value.";
        if (this.correctStyle(anchor, "font-size", "16px")) return wrong(errorMsg);

        // check if it has font size
        errorMsg = "The anchor tag doesn't have the correct border radius value.";
        if (this.correctStyle(anchor, "border-radius", "4px")) return wrong(errorMsg);

        // check if it has text decoration
        errorMsg = "The anchor tag doesn't have the correct text decoration value.";
        if (this.correctStyle(anchor, "text-decoration", "none solid rgb(255, 255, 255)")) return wrong(errorMsg);

        // check if it has color
        errorMsg = "The anchor tag doesn't have the correct color value.";
        if (this.correctStyle(anchor, "color", "rgb(255, 255, 255)")) return wrong(errorMsg);

        // check if it has background color
        errorMsg = "The anchor tag doesn't have the correct background color value.";
        if (this.correctStyle(anchor, "background-color", "rgb(13, 110, 253)")) return wrong(errorMsg);

        // check if it has border color
        errorMsg = "The anchor tag doesn't have the correct border color value.";
        if (this.correctStyle(anchor, "border-color", "rgb(13, 110, 253)")) return wrong(errorMsg);


        return correct()

    }), this.page.execute(() => {
        // test #22
        // PRODUCT EXIST

        // check if product div  exist
        const productDiv = document.body.querySelector("#product");
        let errorMsg = "The div tag with the id of 'product' is missing inside the main tag.";
        if (this.notExist("#product", "main", "div")) return wrong(errorMsg);

        // COLS EXIST

        // check if col1 div exist
        errorMsg = "The first column div tag the id of 'col-1' is missing inside the product div tag.";
        if (this.notExist("#col-1", productDiv, "div")) return wrong(errorMsg);

        // check if col2 div exist
        errorMsg = "The second column div tag the id of 'col-2' is missing inside the product div tag.";
        if (this.notExist("#col-2", productDiv, "div")) return wrong(errorMsg);

        // CONTAINERS EXIST
        const colDiv1 = productDiv.querySelector("#col-1");

        // check if container1 div exist
        errorMsg = "The first container div tag is missing inside the col-1 div tag.";
        if (this.notExist("div", colDiv1, "div")) return wrong(errorMsg);

        // check if container2 div exist
        errorMsg = "The second container div tag is missing inside the col-1 div tag.";
        if (this.notExist("div + div", colDiv1, "div")) return wrong(errorMsg);

        const colDiv2 = productDiv.querySelector("#col-2");

        // check if container1 div exist
        errorMsg = "The first container div tag is missing inside the col-2 div tag.";
        if (this.notExist("div", colDiv2, "div")) return wrong(errorMsg);

        // check if container2 div exist
        errorMsg = "The second container div tag is missing inside the col-2 div tag.";
        if (this.notExist("div + div", colDiv2, "div")) return wrong(errorMsg);

        const containerDiv1 = colDiv1.querySelector("div");

        // check if h2  exist
        errorMsg = "The h2 tag  is missing inside the first container div tag for col-1 div.";
        if (this.notExist("h2", containerDiv1, "h2")) return wrong(errorMsg);

        // check if p  exist
        errorMsg = "The paragraph tag  is missing inside the first container div tag for col-1 div.";
        if (this.notExist("h2 + p", containerDiv1, "p")) return wrong(errorMsg);

        const containerDiv2 = colDiv1.querySelector("div + div");

        // check if img  exist
        errorMsg = "The image tag  is missing inside the second container div tag for col-1 div.";
        if (this.notExist("img", containerDiv2, "img")) return wrong(errorMsg);

        const containerDiv3 = colDiv1.querySelector("div");

        // check if h2  exist
        errorMsg = "The h2 tag  is missing inside the first container div tag for col-2 div.";
        if (this.notExist("h2", containerDiv3, "h2")) return wrong(errorMsg);

        // check if p  exist
        errorMsg = "The paragraph tag  is missing inside the first container div tag for col-2 div.";
        if (this.notExist("h2 + p", containerDiv3, "p")) return wrong(errorMsg);

        const containerDiv4 = colDiv1.querySelector("div + div");

        // check if img  exist
        errorMsg = "The image tag  is missing inside the second container div tag for col-2 div.";
        if (this.notExist("img", containerDiv4, "img")) return wrong(errorMsg);

        return correct()
    }), this.page.execute(() => {
        // test #23
        // PRODUCT  STYLE

        // check if it has display flex
        let errorMsg = "The product div tag doesn't have the correct display value.";
        if (this.correctStyle("#product", "display", "flex")) return wrong(errorMsg);

        // check if it has flex-wrap
        errorMsg = "The product div tag doesn't have the correct flex-wrap value.";
        if (this.correctStyle("#product", "flex-wrap", "wrap")) return wrong(errorMsg);

        // check if it has w100
        errorMsg = "The product div tag doesn't have the correct width value.";
        if (this.correctStyle("#product", "width", "800px")) return wrong(errorMsg);

        // check if it has margin top
        errorMsg = "The product div tag doesn't have the correct margin top value.";
        if (this.correctStyle("#product", "margin-top", "16px")) return wrong(errorMsg);

        // check if it has margin bottom
        errorMsg = "The product div tag doesn't have the correct margin bottom value.";
        if (this.correctStyle("#product", "margin-bottom", "16px")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #24
        // COL-1  STYLE

        // check if it has bg color
        let errorMsg = "The col-1 div tag doesn't have the correct background-color value.";
        if (this.correctStyle("#col-1", "background-color", "rgb(0, 0, 0)")) return wrong(errorMsg);

        // check if it has flex
        errorMsg = "The col-1 div tag doesn't have the correct flex value.";
        if (this.correctStyle("#col-1", "flex", "1 1 0%")) return wrong(errorMsg);

        // check if it has margin right
        errorMsg = "The col-1 div tag doesn't have the correct margin right value.";
        if (this.correctStyle("#col-1", "margin-right", "16px")) return wrong(errorMsg);

        // check if it has padding top
        errorMsg = "The col-1 div tag doesn't have the correct padding top value.";
        if (this.correctStyle("#col-1", "padding-top", "48px")) return wrong(errorMsg);

        // check if it has padding right
        errorMsg = "The col-1 div tag doesn't have the correct padding right value.";
        if (this.correctStyle("#col-1", "padding-right", "48px")) return wrong(errorMsg);

        // check if it has padding left
        errorMsg = "The col-1 div tag doesn't have the correct padding left value.";
        if (this.correctStyle("#col-1", "padding-left", "48px")) return wrong(errorMsg);

        // check if it has text align
        errorMsg = "The col-1 div tag doesn't have the correct text align value.";
        if (this.correctStyle("#col-1", "text-align", "center")) return wrong(errorMsg);

        // check if it has text white
        errorMsg = "The col-1 div tag doesn't have the correct color value.";
        if (this.correctStyle("#col-1", "color", "rgb(255, 255, 255)")) return wrong(errorMsg);

        // check if it has text align
        errorMsg = "The col-1 div tag doesn't have the correct overflow value.";
        if (this.correctStyle("#col-1", "overflow", "hidden")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #25
        // COL-2  STYLE

        // check if it has bg color
        let errorMsg = "The col-2 div tag doesn't have the correct background-color value.";
        if (this.correctStyle("#col-2", "background-color", "rgb(248, 249, 250)")) return wrong(errorMsg);

        // check if it has flex
        errorMsg = "The col-2 div tag doesn't have the correct flex value.";
        if (this.correctStyle("#col-2", "flex", "1 1 0%")) return wrong(errorMsg);

        // check if it has padding top
        errorMsg = "The col-2 div tag doesn't have the correct padding top value.";
        if (this.correctStyle("#col-2", "padding-top", "48px")) return wrong(errorMsg);

        // check if it has padding right
        errorMsg = "The col-2 div tag doesn't have the correct padding right value.";
        if (this.correctStyle("#col-2", "padding-right", "48px")) return wrong(errorMsg);

        // check if it has padding left
        errorMsg = "The col-2 div tag doesn't have the correct padding left value.";
        if (this.correctStyle("#col-2", "padding-left", "48px")) return wrong(errorMsg);

        // check if it has text align
        errorMsg = "The col-2 div tag doesn't have the correct text align value.";
        if (this.correctStyle("#col-2", "text-align", "center")) return wrong(errorMsg);

        // check if it has text white
        errorMsg = "The col-2 div tag doesn't have the correct color value.";
        if (this.correctStyle("#col-2", "color", "rgb(0, 0, 0)")) return wrong(errorMsg);

        // check if it has text align
        errorMsg = "The col-2 div tag doesn't have the correct overflow value.";
        if (this.correctStyle("#col-2", "overflow", "hidden")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #26
        // COL-1
        // CONTAINER-1  STYLE

        const col1Div = document.body.querySelector("#col-1");
        const containerDiv1 = col1Div.querySelector("div");

        // check if it has padding
        let errorMsg = "The first container div in col-1 div tag doesn't have the correct padding value.";
        if (this.correctStyle(containerDiv1, "padding", "16px")) return wrong(errorMsg);

        // check if it has margin top
        errorMsg = "The first container div in col-1 div tag doesn't have the correct margin top value.";
        if (this.correctStyle(containerDiv1, "margin-top", "16px")) return wrong(errorMsg);

        // check if it has margin bottom
        errorMsg = "The first container div in col-1 div tag doesn't have the correct margin bottom value.";
        if (this.correctStyle(containerDiv1, "margin-bottom", "16px")) return wrong(errorMsg);

        // CONTAINER-2 STYLE

        const containerDiv2 = col1Div.querySelector("div + div");

        // check if it has bg color
        errorMsg = "The second container div in col-1 div tag doesn't have the correct background color value.";
        if (this.correctStyle(containerDiv2, "background-color", "rgb(248, 249, 250)")) return wrong(errorMsg);

        // check if it has margin right
        errorMsg = "The second container div in col-1 div tag doesn't have the correct margin right value.";
        if (this.correctStyle(containerDiv2, "margin-right", "29.6016px")) return wrong(errorMsg);

        // check if it has margin left
        errorMsg = "The second container div in col-1 div tag doesn't have the correct margin left value.";
        if (this.correctStyle(containerDiv2, "margin-left", "29.6016px")) return wrong(errorMsg);

        // check if it has width
        errorMsg = "The second container div in col-1 div tag doesn't have the correct width value.";
        if (this.correctStyle(containerDiv2, "width", "236.797px")) return wrong(errorMsg);

        // check if it has height
        errorMsg = "The second container div in col-1 div tag doesn't have the correct height value.";
        if (this.correctStyle(containerDiv2, "height", "400px")) return wrong(errorMsg);

        // check if it has border radius
        errorMsg = "The second container div in col-1 div tag doesn't have the correct border radius value.";
        if (this.correctStyle(containerDiv2, "border-radius", "21px 21px 0px 0px")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #27
        // COL-2
        // CONTAINER-1  STYLE

        const col2Div = document.body.querySelector("#col-2");
        const containerDiv1 = col2Div.querySelector("div");

        // check if it has padding
        let errorMsg = "The first container div in col-2 div tag doesn't have the correct padding value.";
        if (this.correctStyle(containerDiv1, "padding", "16px")) return wrong(errorMsg);

        // check if it has margin top
        errorMsg = "The first container div in col-2 div tag doesn't have the correct margin top value.";
        if (this.correctStyle(containerDiv1, "margin-top", "16px")) return wrong(errorMsg);

        // check if it has margin bottom
        errorMsg = "The first container div in col-2 div tag doesn't have the correct margin bottom value.";
        if (this.correctStyle(containerDiv1, "margin-bottom", "16px")) return wrong(errorMsg);

        // CONTAINER-2 STYLE

        const containerDiv2 = col2Div.querySelector("div + div");

        // check if it has bg color
        errorMsg = "The second container div in col-2 div tag doesn't have the correct background color value.";
        if (this.correctStyle(containerDiv2, "background-color", "rgb(0, 0, 0)")) return wrong(errorMsg);

        // check if it has margin right
        errorMsg = "The second container div in col-2 div tag doesn't have the correct margin right value.";
        if (this.correctStyle(containerDiv2, "margin-right", "29.6016px")) return wrong(errorMsg);

        // check if it has margin left
        errorMsg = "The second container div in col-2 div tag doesn't have the correct margin left value.";
        if (this.correctStyle(containerDiv2, "margin-left", "29.6016px")) return wrong(errorMsg);

        // check if it has width
        errorMsg = "The second container div in col-2 div tag doesn't have the correct width value.";
        if (this.correctStyle(containerDiv2, "width", "236.797px")) return wrong(errorMsg);

        // check if it has height
        errorMsg = "The second container div in col-2 div tag doesn't have the correct height value.";
        if (this.correctStyle(containerDiv2, "height", "400px")) return wrong(errorMsg);

        // check if it has border radius
        errorMsg = "The second container div in col-2 div tag doesn't have the correct border radius value.";
        if (this.correctStyle(containerDiv2, "border-radius", "21px 21px 0px 0px")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #28
        // COL1
        // H2

        const col1Div = document.body.querySelector("#col-1");
        const containerDiv1 = col1Div.querySelector("div");

        // check if it has inner text
        const h2 = containerDiv1.querySelector("h2");
        let errorMsg = "The h2 tag inside first container div in col-1 div doesn't have an inner text.";
        if (this.innerTextExist(h2)) return wrong(errorMsg);

        // P

        // check if it has inner text
        const paragraph = containerDiv1.querySelector("p");
        errorMsg = "The paragraph tag inside first container div in col-1 div doesn't have an inner text.";
        if (this.innerTextExist(paragraph)) return wrong(errorMsg);

        // check if it has font-size
        errorMsg = "The paragraph tag inside first container div in col-1 div doesn't have the correct font size value.";
        if (this.correctStyle(paragraph, "font-size", "20px")) return wrong(errorMsg);

        // check if it has font weight
        errorMsg = "The paragraph tag inside first container div in col-1 div doesn't have the correct font weight value.";
        if (this.correctStyle(paragraph, "font-weight", "300")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #29
        // COL2
        // H2

        const col2Div = document.body.querySelector("#col-2");
        const containerDiv1 = col2Div.querySelector("div");

        // check if it has inner text
        const h2 = containerDiv1.querySelector("h2");
        let errorMsg = "The h2 tag inside first container div in col-2 div doesn't have an inner text.";
        if (this.innerTextExist(h2)) return wrong(errorMsg);

        // P

        // check if it has inner text
        const paragraph = containerDiv1.querySelector("p");
        errorMsg = "The paragraph tag inside first container div in col-2 div doesn't have an inner text.";
        if (this.innerTextExist(paragraph)) return wrong(errorMsg);

        // check if it has font-size
        errorMsg = "The paragraph tag inside first container div in col-2 div doesn't have the correct font size value.";
        if (this.correctStyle(paragraph, "font-size", "20px")) return wrong(errorMsg);

        // check if it has font weight
        errorMsg = "The paragraph tag inside first container div in col-2 div doesn't have the correct font weight value.";
        if (this.correctStyle(paragraph, "font-weight", "300")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test 30
        // IMG1

        const col1Div = document.body.querySelector("#col-1");
        const containerDiv2 = col1Div.querySelector("div + div");

        // check if it has src
        const img = containerDiv2.querySelector("img");
        let errorMsg = "The img tag inside second container div in col-1 div doesn't have an src attribute.";
        if (this.correctAttr(img, "src", "")) return wrong(errorMsg);

        // check if it has title
        errorMsg = "The img tag inside second container div in col-1 div doesn't have a title attribute.";
        if (this.correctAttr(img, "title", "")) return wrong(errorMsg);

        // check if it has alt
        errorMsg = "The img tag inside second container div in col-1 div doesn't have an alt attribute.";
        if (this.correctAttr(img, "alt", "")) return wrong(errorMsg);

        // check if it has width
        errorMsg = "The img tag inside second container div in col-1 div doesn't have the correct width value.";
        if (this.correctStyle(containerDiv2, "width", "236.797px")) return wrong(errorMsg);

        // check if it has height
        errorMsg = "The img tag inside second container div in col-1 div doesn't have the correct height value.";
        if (this.correctStyle(containerDiv2, "height", "400px")) return wrong(errorMsg);

        // check if it has border radius
        errorMsg = "The img tag inside second container div in col-1 div doesn't have the correct border radius value.";
        if (this.correctStyle(containerDiv2, "border-radius", "21px 21px 0px 0px")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test 31
        // IMG2

        const col2Div = document.body.querySelector("#col-2");
        const containerDiv2 = col2Div.querySelector("div + div");

        // check if it has src
        const img = containerDiv2.querySelector("img");
        let errorMsg = "The img tag inside second container div in col-2 div doesn't have an src attribute value.";
        if (this.correctAttr(img, "src", "")) return wrong(errorMsg);

        // check if it has title
        errorMsg = "The img tag inside second container div in col-2 div doesn't have a title attribute value.";
        if (this.correctAttr(img, "title", "")) return wrong(errorMsg);

        // check if it has alt
        errorMsg = "The img tag inside second container div in col-2 div doesn't have an alt attribute value.";
        if (this.correctAttr(img, "alt", "")) return wrong(errorMsg);

        // check if it has width
        errorMsg = "The img tag inside second container div in col-2 div doesn't have the correct width value.";
        if (this.correctStyle(containerDiv2, "width", "236.797px")) return wrong(errorMsg);

        // check if it has height
        errorMsg = "The img tag inside second container div in col-2 div doesn't have the correct height value.";
        if (this.correctStyle(containerDiv2, "height", "400px")) return wrong(errorMsg);

        // check if it has border radius
        errorMsg = "The img tag inside second container div in col-2 div doesn't have the correct border radius value.";
        if (this.correctStyle(containerDiv2, "border-radius", "21px 21px 0px 0px")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #32
        // CONTACT EXIST

        // check if contact div  exist
        const contactDiv = document.body.querySelector("#contact");
        let errorMsg = "The div tag with the id of 'contact' is missing inside the footer tag.";
        if (this.notExist("#contact", "footer", "div")) return wrong(errorMsg);

        // COL EXIST

        // check if col div exist
        errorMsg = "The column div with the id of 'contact-col1' tag is missing inside the contact div tag.";
        if (this.notExist("#contact-col1", contactDiv, "div")) return wrong(errorMsg);

        // ANCHOR EXIST

        const colDiv = contactDiv.querySelector("#contact-col1")

        // check if anchor exist
        errorMsg = "The anchor tag with the id of 'footer_link_logo' is missing inside the column div tag.";
        if (this.notExist("#footer_link_logo", colDiv, "a")) return wrong(errorMsg);

        // check if img exist
        const linkLogo = document.body.querySelector("#footer_link_logo");
        errorMsg = "The image tag is missing inside the link tag with the id of 'footer_link_logo'.";
        if (this.notExist("img", linkLogo)) return wrong(errorMsg);

        // CONTAINER DIV

        // check if div exist
        errorMsg = "The div tag wrapping the rest of the links is missing inside the column div tag.";
        if (this.notExist("a + div", colDiv, "a")) return wrong(errorMsg);

        // ANCHORS EXIST

        // check if anchor exist
        const wrapperDiv = colDiv.querySelector("a + div");
        errorMsg = "The anchor tag with the id of 'footer_link_home' is missing inside the wrapper div tag.";
        if (this.notExist("#footer_link_home", wrapperDiv, "a")) return wrong(errorMsg);

        // check if anchor exist
        errorMsg = "The anchor tag with the id of 'footer_link_product' is missing inside the wrapper div tag.";
        if (this.notExist("#footer_link_product", wrapperDiv, "a")) return wrong(errorMsg);

        // check if anchor exist
        errorMsg = "The anchor tag with the id of 'footer_link_contact' is missing inside the wrapper div tag.";
        if (this.notExist("#footer_link_contact", wrapperDiv, "a")) return wrong(errorMsg);

        // PARAGRAPH EXIST

        // check if p exist
        errorMsg = "The paragraph tag is missing inside the column div tag.";
        if (this.notExist("div + p", colDiv, "p")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #33
        // FOOTER STYLE

        // check if footer has max-width style
        let errorMsg = "The footer tag doesn't have the correct max-width value.";
        if (this.correctStyle("footer", "maxWidth", "100%")) return wrong(errorMsg)

        // check if footer has padding right style
        errorMsg = "The footer tag doesn't have the correct padding right value.";
        if (this.correctStyle("footer", "paddingRight", "16px")) return wrong(errorMsg)

        // check if footer has padding left style
        errorMsg = "The footer tag doesn't have the correct padding left value.";
        if (this.correctStyle("footer", "paddingLeft", "16px")) return wrong(errorMsg)

        // check if footer has padding right style
        errorMsg = "The footer tag doesn't have the correct padding top value.";
        if (this.correctStyle("footer", "paddingTop", "48px")) return wrong(errorMsg)

        // check if footer has padding left style
        errorMsg = "The footer tag doesn't have the correct padding bottom value.";
        if (this.correctStyle("footer", "paddingBottom", "48px")) return wrong(errorMsg)

        // check if footer has margin right style
        errorMsg = "The footer tag doesn't have the correct margin right value.";
        if (this.correctStyle("footer", "marginRight", "0px")) return wrong(errorMsg)

        // check if footer has margin left style
        errorMsg = "The footer tag doesn't have the correct margin left value.";
        if (this.correctStyle("footer", "marginLeft", "0px")) return wrong(errorMsg)

        return correct()

    }), this.page.execute(() => {
        // test #34
        // CONTACT FLEX

        // check if contact has flex style
        let errorMsg = "The contact div tag doesn't have the correct display value.";
        if (this.correctStyle("#contact", "display", "flex")) return wrong(errorMsg)

        // check if contact has flex wrap style
        errorMsg = "The contact div tag doesn't have the correct flex-wrap value.";
        if (this.correctStyle("#contact", "flexWrap", "wrap")) return wrong(errorMsg)

        // check if contact has justify-content style
        errorMsg = "The contact div tag doesn't have the correct justify-content value.";
        if (this.correctStyle("#contact", "justifyContent", "space-between")) return wrong(errorMsg)

        return correct()

    }), this.page.execute(() => {
        // test #35
        // COL STYLE

        // check if column has max-width style
        let errorMsg = "The contact col1 div tag doesn't have the correct max-width value.";
        if (this.correctStyle("#contact-col1", "maxWidth", "100%")) return wrong(errorMsg)

        // check if contact col1 has padding right style
        errorMsg = "The contact col1 div tag doesn't have the correct padding right value.";
        if (this.correctStyle("#contact-col1", "paddingRight", "16px")) return wrong(errorMsg)

        // check if contact col1 div has padding left style
        errorMsg = "The contact col1 div tag doesn't have the correct padding left value.";
        if (this.correctStyle("#contact-col1", "paddingLeft", "16px")) return wrong(errorMsg)

        // check if contact col1 has margin right style
        errorMsg = "The contact col1 div tag doesn't have the correct margin right value.";
        if (this.correctStyle("#contact-col1", "marginRight", "70.5547px")) return wrong(errorMsg)

        // check if contact col1 div has margin left style
        errorMsg = "The contact col1 div tag doesn't have the correct margin left value.";
        if (this.correctStyle("#contact-col1", "marginLeft", "70.5547px")) return wrong(errorMsg)

        return correct()

    }), this.page.execute(() => {
        // test #36
        // COL FLEX

        // check if contact col1 has flex style
        let errorMsg = "The contact col1 div tag doesn't have the correct display value.";
        if (this.correctStyle("#contact-col1", "display", "flex")) return wrong(errorMsg)

        // check if contact col1 has flex wrap style
        errorMsg = "The contact col1 div tag doesn't have the correct flex-wrap value.";
        if (this.correctStyle("#contact-col1", "flexWrap", "wrap")) return wrong(errorMsg)

        // check if contact col1 has flex-direction style
        errorMsg = "The contact col1 div tag doesn't have the correct flex-direction value.";
        if (this.correctStyle("#contact-col1", "flex-direction", "column")) return wrong(errorMsg)

        return correct()

    }), this.page.execute(() => {
        // test #37
        // FOOTER LINKS HREF

        // LINK_LOGO
        // check if link logo href correct
        let errorMsg = "The anchor tag with the id of 'footer_link_logo' is missing the correct href attribute.";
        if (this.correctAttr("#footer_link_logo", "href", "#home")) return wrong(errorMsg);

        // LINK_HOME
        // check if link home href correct
        errorMsg = "The anchor tag with the id of 'footer_link_home' is missing the correct href attribute.";
        if (this.correctAttr("#footer_link_home", "href", "#home")) return wrong(errorMsg);

        // LINK_PRODUCT
        // check if footer_link product href correct
        errorMsg = "The anchor tag with the id of 'footer_link_product' is missing the correct href attribute.";
        if (this.correctAttr("#footer_link_product", "href", "#product")) return wrong(errorMsg);

        // LINK_CONTACT
        // check if footer_link contact href correct
        errorMsg = "The anchor tag with the id of 'footer_link_contact' is missing the correct href attribute.";
        if (this.correctAttr("#footer_link_contact", "href", "#contact")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #38
        // LINK IMG

        // check if img has correct src
        let errorMsg = "The image tag in '#footer_link_logo' doesn't have an src attribute value.";
        if (this.correctAttr("#footer_link_logo > img", "src", "")) return wrong(errorMsg);

        // check if #footer_link_logo > img has correct width
        errorMsg = "The image tag in '#footer_link_logo' doesn't have the correct width attribute value.";
        if (this.correctAttr("#footer_link_logo > img", "width", "64")) return wrong(errorMsg);

        // check if #footer_link_logo > img has correct height
        errorMsg = "The image tag in '#footer_link_logo' doesn't have the correct height attribute value.";
        if (this.correctAttr("#footer_link_logo > img", "height", "64")) return wrong(errorMsg);

        // check if #footer_link_logo > img has correct title
        errorMsg = "The image tag in '#footer_link_logo' doesn't have a title attribute value.";
        if (this.correctAttr("#footer_link_logo > img", "title", "")) return wrong(errorMsg);

        // check if img has correct alt
        errorMsg = "The image tag in '#footer_link_logo' doesn't have an alt attribute value.";
        if (this.correctAttr("img", "alt", "")) return wrong(errorMsg);


        return correct()

    }), this.page.execute(() => {
        // test #39
        // LINK LOGO MY-AUTO

        // LINK_LOGO
        // check if link logo margin-top correct
        let errorMsg = "The anchor tag with the id of 'footer_link_logo' doesn't have the correct margin-top value.";
        if (this.correctStyle("#footer_link_logo", "marginTop", "10px")) return wrong(errorMsg);

        // check if link logo margin-bottom correct
        errorMsg = "The anchor tag with the id of 'footer_link_logo' doesn't have the correct margin-bottom value.";
        if (this.correctStyle("#footer_link_logo", "marginBottom", "10px")) return wrong(errorMsg);

        errorMsg = "The anchor tag with the id of 'footer_link_logo' doesn't have the correct text-color value.";
        if (this.correctStyle("#footer_link_logo", "color", "rgb(108, 117, 125)")) return wrong(errorMsg);

        errorMsg = "The anchor tag with the id of 'footer_link_logo' doesn't have the correct text-decoration value.";
        if (this.correctStyle("#footer_link_logo", "text-decoration", "none solid rgb(108, 117, 125)")) return wrong(errorMsg);

        // WRAPPER DIV STYLE

        const wrapperDiv = document.body.querySelector("#contact-col1 > a + div")

        errorMsg = "The div tag wrapping the rest of the links doesn't have the correct margin-top value.";
        if (this.correctStyle(wrapperDiv, "marginTop", "10px")) return wrong(errorMsg);

        errorMsg = "The div tag wrapping the rest of the links doesn't have the correct margin-bottom value.";
        if (this.correctStyle(wrapperDiv, "marginBottom", "10px")) return wrong(errorMsg);

        // PARAGRAPH STYLE
        const paragraph = document.body.querySelector("#contact > div > div + p");
        errorMsg = "The paragraph tag after the footer links doesn't have the correct text color value.";
        if (this.correctStyle(paragraph, "color", "rgb(108, 117, 125)")) return wrong(errorMsg);

        errorMsg = "The paragraph tag after the footer links doesn't have the correct inner text value.";
        if (this.innerTextExist(paragraph, "2022")) return wrong(errorMsg);

        return  correct()
    }), this.page.execute(() => {
        // test #40
        // LINKS STYLE

        // check if link home margin-right correct
        let errorMsg = "The anchor tag with the id of 'footer_link_home' doesn't have the correct margin-right value.";
        if (this.correctStyle("#footer_link_home", "margin-right", "16px")) return wrong(errorMsg);

        errorMsg = "The anchor tag with the id of 'footer_link_home' doesn't have the correct text-color value.";
        if (this.correctStyle("#footer_link_home", "color", "rgb(108, 117, 125)")) return wrong(errorMsg);

        errorMsg = "The anchor tag with the id of 'footer_link_home' doesn't have the correct text-decoration value.";
        if (this.correctStyle("#footer_link_home", "text-decoration", "none solid rgb(108, 117, 125)")) return wrong(errorMsg);

        // check if link product margin-right correct
        errorMsg = "The anchor tag with the id of 'footer_link_product' doesn't have the correct margin-right value.";
        if (this.correctStyle("#footer_link_product", "margin-right", "16px")) return wrong(errorMsg);

        errorMsg = "The anchor tag with the id of 'footer_link_product' doesn't have the correct text-color value.";
        if (this.correctStyle("#footer_link_product", "color", "rgb(108, 117, 125)")) return wrong(errorMsg);

        errorMsg = "The anchor tag with the id of 'footer_link_product' doesn't have the correct text-decoration value.";
        if (this.correctStyle("#footer_link_product", "text-decoration", "none solid rgb(108, 117, 125)")) return wrong(errorMsg);

        errorMsg = "The anchor tag with the id of 'footer_link_contact' doesn't have the correct text-color value.";
        if (this.correctStyle("#footer_link_contact", "color", "rgb(108, 117, 125)")) return wrong(errorMsg);

        errorMsg = "The anchor tag with the id of 'footer_link_contact' doesn't have the correct text-decoration value.";
        if (this.correctStyle("#footer_link_contact", "text-decoration", "none solid rgb(108, 117, 125)")) return wrong(errorMsg);

        return  correct()
    }), this.page.execute(() => {
        // test #41
        // COLUMN EXIST

        const contactDiv = document.body.querySelector("#contact");

        // COL EXIST

        // check if col div exist
        let errorMsg = "The new column div tag with the of 'contact-col2' is missing inside the contact div tag.";
        if (this.notExist("#contact-col2", contactDiv, "div")) return wrong(errorMsg);

        // FORM EXIST

        // check if form exist
        errorMsg = "The form tag is missing inside the new column div tag.";
        if (this.notExist("form", "div")) return wrong(errorMsg);

        // check if h5 exist
        errorMsg = "The h5 tag is missing inside the form tag.";
        if (this.notExist("h5", "form")) return wrong(errorMsg);

        // CONTAINER DIV

        // check if div exist
        errorMsg = "The div tag wrapping the email input is missing inside the form tag.";
        if (this.notExist("h5 + div", "form")) return wrong(errorMsg);

        // check if div has margin bottom
        errorMsg = "The div tag wrapping the email input doesn't have the correct margin bottom value.";
        if (this.correctStyle("h5 + div", "margin-bottom", "16px")) return wrong(errorMsg);

        // check if label exist
        const wrapperDiv = contactDiv.querySelector("h5 + div");
        errorMsg = "The label tag for email input is missing inside the wrapper div tag.";
        if (this.notExist("label", wrapperDiv)) return wrong(errorMsg);

        // check if input exist
        errorMsg = "The input tag for email is missing inside the wrapper div tag.";
        if (this.notExist("label + input", wrapperDiv)) return wrong(errorMsg);

        // CONTAINER DIV

        const form = contactDiv.querySelector("form");

        // check if div exist
        errorMsg = "The div tag wrapping the checkbox is missing inside the form tag.";
        if (this.notExist("div + div", form)) return wrong(errorMsg);

        // check if div has margin bottom
        errorMsg = "The div tag wrapping the checkbox doesn't have the correct margin bottom value.";
        if (this.correctStyle("div + div", "margin-bottom", "16px")) return wrong(errorMsg);

        // check if label exist
        const wrapperDiv2 = form.querySelector("div + div");

        errorMsg = "The label tag for checkbox is missing inside the wrapper div tag.";
        if (this.notExist("label", wrapperDiv2)) return wrong(errorMsg);

        // check if input exist
        errorMsg = "The checkbox is missing inside the label tag.";
        if (this.notExist("label > input", "label")) return wrong(errorMsg);

        // check if button exist
        errorMsg = "The button tag is missing inside the form tag.";
        if (this.notExist("button", "form")) return wrong(errorMsg);

        return correct()

    }), this.page.execute(() => {
        // test #42
        // COLUMN STYLE

        const col = document.body.querySelector("#contact-col2");

        // check if new column div has max-width style
        let errorMsg = "The contact col2 div tag doesn't have the correct max-width value.";
        if (this.correctStyle(col, "maxWidth", "100%")) return wrong(errorMsg)

        // check if contact col2 div has padding right style
        errorMsg = "The contact col2 div tag doesn't have the correct padding right value.";
        if (this.correctStyle(col, "paddingRight", "16px")) return wrong(errorMsg)

        // check if contact col2 div has padding left style
        errorMsg = "The contact col2 div tag doesn't have the correct padding left value.";
        if (this.correctStyle(col, "paddingLeft", "16px")) return wrong(errorMsg)

        // check if contact col2 div has margin right style
        errorMsg = "The contact col2 div tag doesn't have the correct margin right value.";
        if (this.correctStyle(col, "marginRight", "70.5547px")) return wrong(errorMsg)

        // check if contact col2 div has margin left style
        errorMsg = "The contact col2 div tag doesn't have the correct margin left value.";
        if (this.correctStyle(col, "marginLeft", "70.5547px")) return wrong(errorMsg)

        return correct()

    }), this.page.execute(() => {
        // test #43
        // h5 STYLE

        const col = document.body.querySelector("#contact-col2");
        const h5 = col.querySelector("h5");

        // check if h5 has max-width style
        let errorMsg = "The h5 tag doesn't have the correct font-weight value.";
        if (this.correctStyle(h5, "font-weight", "500")) return wrong(errorMsg)

        // check if h5 has padding right style
        errorMsg = "The h5 tag doesn't have the correct line-height value.";
        if (this.correctStyle(h5, "line-height", "24px")) return wrong(errorMsg)

        // check if h5 has padding left style
        errorMsg = "The h5 tag doesn't have the correct font-size value.";
        if (this.correctStyle(h5, "font-size", "20px")) return wrong(errorMsg)

        // check if h5 has margin right style
        errorMsg = "The h5 tag doesn't have the correct margin top value.";
        if (this.correctStyle(h5, "margin-top", "0px")) return wrong(errorMsg)

        // check if h5 has margin left style
        errorMsg = "The h5 tag doesn't have the correct margin bottom value.";
        if (this.correctStyle(h5, "margin-bottom", "8px")) return wrong(errorMsg)

        // check if h5 has color style
        errorMsg = "The h5 tag doesn't have the correct text color value.";
        if (this.correctStyle(h5, "color", "rgb(248, 249, 250)")) return wrong(errorMsg)

        // check if h5 has inner text
        errorMsg = "The h5 tag doesn't have an inner text value.";
        if (this.innerTextExist(h5)) return wrong(errorMsg)

        return correct()

    }), this.page.execute(() => {
        // test #44
        // label STYLE

        const col = document.body.querySelector("#contact-col2");
        const wrapper = col.querySelector("h5 + div");
        const label = wrapper.querySelector("label");

        // check if label has max-width style
        let errorMsg = "The email label tag doesn't have the correct display value.";
        if (this.correctStyle(label, "display", "block")) return wrong(errorMsg)

        // check if h5 has margin bottom style
        errorMsg = "The email label tag doesn't have the correct margin bottom value.";
        if (this.correctStyle(label, "margin-bottom", "8px")) return wrong(errorMsg)

        // check if label has color style
        errorMsg = "The email label tag doesn't have the correct text color value.";
        if (this.correctStyle(label, "color", "rgb(248, 249, 250)")) return wrong(errorMsg)

        // check if label has inner text
        errorMsg = "The email label tag doesn't have the correct inner text value.";
        if (this.innerTextExist(label, "Email")) return wrong(errorMsg)

        // check if label has for attr
        errorMsg = "The email label tag doesn't have the correct for attribute value.";
        if (this.correctAttr(label, "for", "email")) return wrong(errorMsg)

        return correct()

    }) , this.page.execute(() => {
        // test #45
        // input attr

        const input = document.body.querySelector("#email");

        // check if input has max-width style
        let errorMsg = "The email input tag doesn't have the correct width value.";
        if (this.correctStyle(input, "width", "227.906px")) return wrong(errorMsg)

        // check if h5 has margin bottom style
        errorMsg = "The email input tag doesn't have the correct padding value.";
        if (this.correctStyle(input, "padding", "6px 12px")) return wrong(errorMsg)

        // check if input has color style
        errorMsg = "The email input tag doesn't have the correct font size value.";
        if (this.correctStyle(input, "font-size", "16px")) return wrong(errorMsg)

        // check if input has line-height style
        errorMsg = "The email input tag doesn't have the correct line height value.";
        if (this.correctStyle(input, "line-height", "24px")) return wrong(errorMsg)

        // check if input has color style
        errorMsg = "The email input tag doesn't have the correct text-color value.";
        if (this.correctStyle(input, "color", "rgb(33, 37, 41)")) return wrong(errorMsg)

        // check if input has border style
        errorMsg = "The email input tag doesn't have the correct border value.";
        if (this.correctStyle(input, "border", "1px solid rgb(206, 212, 218)")) return wrong(errorMsg)

        // check if input has border-radius style
        errorMsg = "The email input tag doesn't have the correct border value.";
        if (this.correctStyle(input, "border-radius", "4px")) return wrong(errorMsg)

        // check if input has required attr
        errorMsg = "The email input tag doesn't have the correct required attribute value.";
        if (!input["required"] || input["required"].toString() !== "true") return wrong(errorMsg)

        // check if input has type attr
        errorMsg = "The email input tag doesn't have the correct type attribute value.";
        if (this.correctAttr(input, "type", "email")) return wrong(errorMsg)

        // check if input has placeholder attr
        errorMsg = "The email input tag doesn't have the correct placeholder attribute value.";
        if (this.correctAttr(input, "placeholder", "you@example.com")) return wrong(errorMsg)

        return correct()

    }), this.page.execute(() => {
        // test #46
        // label STYLE

        const col = document.body.querySelector("#contact-col2");
        const wrapper = col.querySelector("div + div");
        const label = wrapper.querySelector("label");

        // check if label has color style
        let errorMsg = "The checkbox label tag doesn't have the correct text color value.";
        if (this.correctStyle(label, "color", "rgb(248, 249, 250)")) return wrong(errorMsg)

        // check if label has inner text
        errorMsg = "The checkbox label tag doesn't have an inner text value.";
        if (this.innerTextExist(label)) return wrong(errorMsg);

        return correct()

    })  , this.page.execute(() => {
        // test #47
        // input attr

        const col = document.body.querySelector("#contact-col2");
        const wrapper = col.querySelector("div + div");
        const input = wrapper.querySelector("input");

        // check if input has required attr
        let errorMsg = "The checkbox input tag doesn't have the correct required attribute value.";
        if (!input["required"] || input["required"].toString() !== "true") return wrong(errorMsg)

        // check if input has type attr
        errorMsg = "The checkbox input tag doesn't have the correct type attribute value.";
        if (this.correctAttr(input, "type", "checkbox")) return wrong(errorMsg)

        return correct()

    }), this.page.execute(() => {
        // test #48
        // button

        const col = document.body.querySelector("#contact-col2");
        const button = col.querySelector("button");

        // check if button has max-width style
        let errorMsg = "The button tag doesn't have the correct width value.";
        if (this.correctStyle(button, "width", "227.906px")) return wrong(errorMsg)

        // check if button inner text
        errorMsg = "The button tag doesn't have an inner text value.";
        if (this.innerTextExist(button)) return wrong(errorMsg);

        // check if button has type attr
        errorMsg = "The button tag doesn't have the correct type attribute value.";
        if (this.correctAttr(button, "type", "submit")) return wrong(errorMsg)

        // check if it has display inline-block
        errorMsg = "The button tag doesn't have the correct display value.";
        if (this.correctStyle(button, "display", "inline-block")) return wrong(errorMsg);

        // check if it has padding
        errorMsg = "The button tag doesn't have the correct padding value.";
        if (this.correctStyle(button, "padding", "6px 12px")) return wrong(errorMsg);

        // check if it has font size
        errorMsg = "The button tag doesn't have the correct font size value.";
        if (this.correctStyle(button, "font-size", "16px")) return wrong(errorMsg);

        // check if it has font size
        errorMsg = "The button tag doesn't have the correct border radius value.";
        if (this.correctStyle(button, "border-radius", "4px")) return wrong(errorMsg);

        // check if it has text decoration
        errorMsg = "The button tag doesn't have the correct text decoration value.";
        if (this.correctStyle(button, "text-decoration", "none solid rgb(255, 255, 255)")) return wrong(errorMsg);

        // check if it has color
        errorMsg = "The button tag doesn't have the correct color value.";
        if (this.correctStyle(button, "color", "rgb(255, 255, 255)")) return wrong(errorMsg);

        // check if it has background color
        errorMsg = "The button tag doesn't have the correct background color value.";
        if (this.correctStyle(button, "background-color", "rgb(108, 117, 125)")) return wrong(errorMsg);

        // check if it has border color
        errorMsg = "The button tag doesn't have the correct border color value.";
        if (this.correctStyle(button, "border-color", "rgb(108, 117, 125)")) return wrong(errorMsg);

        return correct()

    })]


}

it("Test stage", async () => {
    await new Test().runTests()
}).timeout(30000);
