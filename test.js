"use strict";

const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require("chai");

async function main() {

describe("Selenium-WebDriver Test", () => {
	const driver = new Builder().forBrowser("chrome").build();

	it("Buscar la palabra mongoose esp32 y hacer clic en el tercer resultado no patrocinado", async () => {
		await driver.get("https://www.google.com");
		// espero
		await driver.sleep(2000);
		// palabra a buscar: riot os esp32
		await driver
			.findElement(By.name("q"))
			.sendKeys("mongoose esp32", Key.ENTER);
		// almaceno en datos los elementos que contienen URL de los resultados de la búsqueda (yuRUbf)
		let datos = await driver.findElements(By.className("yuRUbf"));
		// almaceno parte de los títulos que muestra google en los resultados
        let titulos = await driver.findElements(By.className("LC20lb DKV0Md"));
		// variable del titulo del sitio
        let tituloSitio = "";
        let tituloURL = "-";
		// si la cantidad de datos es mayor o igual a 3
		if (datos.length >= 3) {
            tituloURL = await titulos[2].getText();
            // tomo parte del título obtenido (no siempre es correcto)
            tituloURL = tituloURL.slice(0, 40);
			// realizo click en el tercer resultado
			await datos[2].click();
			// espero
			await driver.sleep(2000);
			// obtengo el título al que se accedió
			tituloSitio = await driver.getTitle();
            // normalizo título al que se accedió
            tituloSitio = await tituloSitio.slice(0, 40);
		}
		// comparo los títulos
        console.log("Sitio: " + tituloSitio);
        console.log("URL: " + tituloURL);
        expect(tituloSitio).to.equal(tituloURL);
	});
 
    after(async () => driver.quit());
});
}

main()