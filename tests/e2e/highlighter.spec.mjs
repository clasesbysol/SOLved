import { test, expect } from "@playwright/test";
test.skip(true,"El resaltador de DOM no aplica al resumen real aislado en iframe; conserva cobertura unitaria separada.");

async function openPhysics(page) {
  await page.goto("/");
  await openPhysicsFromDashboard(page);
}

async function openPhysicsFromDashboard(page) {
  await page.getByRole("button", { name: "Abrir materia" }).first().click();
  await expect(page.locator("#studyTitle")).toHaveText("Física I");
  await page.locator("#studyUnit").selectOption("resumen-integral");
  await expect(page.locator("#studyBody .highlightable").first()).toBeVisible();
}

async function selectWithin(page, start, end, firstIndex = 0, lastIndex = firstIndex) {
  await page.evaluate(({ start, end, firstIndex, lastIndex }) => {
    const blocks = document.querySelectorAll("#studyBody .highlightable");
    const first = blocks[firstIndex];
    const last = blocks[lastIndex];
    const firstText = first.firstChild;
    const lastText = last.lastChild;
    const range = document.createRange();
    range.setStart(firstText, start);
    range.setEnd(lastText, Math.min(end, lastText.nodeValue.length));
    const selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    first.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerType: "mouse" }));
  }, { start, end, firstIndex, lastIndex });
  await expect(page.locator("#selectionHelp")).toContainText("Selección lista:");
}

async function collapseOnToolbar(page, touch = false) {
  await page.locator("#highlightBtn").dispatchEvent("pointerdown", { pointerType: touch ? "touch" : "mouse", isPrimary: true });
  if (touch) await page.locator("#highlightBtn").dispatchEvent("touchstart", { touches: [] });
  await page.evaluate(() => {
    getSelection().removeAllRanges();
    document.dispatchEvent(new Event("selectionchange"));
  });
  await expect(page.locator("#selectionHelp")).toContainText("Selección lista:");
}

async function persistentData(page) {
  return page.evaluate(async () => ({
    subjects: await window.LBT_DB.getAll("subjects"),
    events: await window.LBT_DB.getAll("events"),
    correlations: window.LBT_DATA.SUBJECTS.map(({ id, courseReqCursadas, courseReqFinals, finalReqFinals, allCursadasRequired }) =>
      ({ id, courseReqCursadas, courseReqFinals, finalReqFinals, allCursadasRequired }))
  }));
}

test("@desktop resalta, persiste al recargar y cambiar de pestaña, y permite quitar", async ({ page }) => {
  await openPhysics(page);
  const baseline = await persistentData(page);

  await selectWithin(page, 6, 29);
  await collapseOnToolbar(page);
  await page.locator("#highlightBtn").click();
  await expect(page.locator("mark.study-highlight")).toHaveCount(1);

  await page.reload();
  await openPhysicsFromDashboard(page);
  await expect(page.locator("mark.study-highlight")).toHaveCount(1);
  await page.getByRole("button", { name: "Glosario" }).click();
  await page.getByRole("button", { name: "Resumen" }).click();
  await expect(page.locator("mark.study-highlight")).toHaveCount(1);

  await page.locator("mark.study-highlight").click();
  await expect(page.locator("#highlightLabel")).toHaveText("Quitar resaltado");
  await page.locator("#highlightBtn").click();
  await expect(page.locator("mark.study-highlight")).toHaveCount(0);

  await selectWithin(page, 8, 24, 0, 1);
  await page.locator("#highlightBtn").click();
  await expect(page.locator("mark.study-highlight")).toHaveCount(2);

  expect(await persistentData(page)).toEqual(baseline);
});

test("@mobile conserva la selección con viewport móvil y eventos pointer/touch", async ({ page }) => {
  await openPhysics(page);
  await selectWithin(page, 5, 28);
  await page.locator("#studyBody .highlightable").first().dispatchEvent("touchend", { changedTouches: [] });
  await collapseOnToolbar(page, true);
  await page.locator("#highlightBtn").click();
  await expect(page.locator("mark.study-highlight")).toHaveCount(1);
  await page.reload();
  await openPhysicsFromDashboard(page);
  await expect(page.locator("mark.study-highlight")).toHaveCount(1);
});
