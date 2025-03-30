let page;

beforeEach(async () => {
    page = await browser.newPage();
});

afterEach(() => {
    page.close();
});

describe("Github page tests github.com/team", () => {
    beforeEach(async () => {
        await page.goto("https://github.com/team", { timeout: 10000 });
    });

    test("The h1 header content'", async () => {
        const firstLink = await page.$("header div div a");
        await firstLink.click();
        await page.waitForSelector("h1", { timeout: 10000 });
        const title2 = await page.title();
        expect(title2).toEqual(
            "GitHub · Build and ship software on a single, collaborative platform · GitHub",
        );
    }, 40000);

    test("The first link attribute", async () => {
        const actual = await page.$eval("a", (link) =>
            link.getAttribute("href"),
        );
        expect(actual).toEqual("#start-of-content");
    }, 25000);

    test("The page contains Sign in button", async () => {
        const btnSelector = ".btn-large-mktg.btn-mktg.btn-muted-mktg";
        await page.waitForSelector(btnSelector, {
            visible: true,
        });
        const actual = await page.$eval(
            btnSelector,
            (link) => link.textContent,
        );
        expect(actual).toContain("Sign up for free");
    }, 30000);
});

describe("Github page tests github.com", () => {
    beforeEach(async () => {
        await page.goto("https://github.com/", { timeout: 10000 });
    });

    test("Title Main page", async () => {
        const expectedTitle =
            "GitHub · Build and ship software on a single, collaborative platform · GitHub";

        await page.waitForSelector("h1", { timeout: 10000 });
        const title = await page.title();
        expect(title).toEqual(expectedTitle);
    }, 25000);

    test("Title copilot", async () => {
        const expectedTitle =
            "GitHub Copilot · Your AI pair programmer · GitHub";

        const btnCopilot = await page.$('a[href="/features/copilot"]');
        await btnCopilot.click();
        await page.waitForSelector("h1", { timeout: 10000 });
        const title = await page.title();
        expect(title).toEqual(expectedTitle);
    }, 40000);

    test("Title Sign Up", async () => {
        const expectedTitle = "Sign up to GitHub · GitHub";

        const btnSignUp = await page.$(
            'button[data-analytics-event*="sign_up"]',
        );
        await btnSignUp.click();
        await page.waitForSelector("h1", { timeout: 10000 });
        const title = await page.title();
        expect(title).toEqual(expectedTitle);
    }, 40000);
});
