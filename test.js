'use strict'

const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Selenium-WebDriver Test', () => {
    const driver = new Builder().forBrowser('chrome').build();

    it('Buscar la palabra mongoose esp32 y hacer clic en el tercer resultado no patrocinado', async () => {
        await driver.get('https://www.google.com');
        await driver.sleep(2000);
        // palabra a buscar: riot os esp32
        await driver.findElement(By.name('q')).sendKeys('riot os esp32', Key.ENTER);
        // almaceno en datos los elemento que contienen URL de los resultados de la búsqueda
        let datos = await driver.findElements(By.className("yuRUbf"));
        // si la cantidad de datos es mayor o igual a 3
        if (datos.length >= 3) {
            // realizo click en el tercer resultado
            await datos[2].click();
            await driver.sleep(2000);
            // obtengo el URL que hasta la prueba debe ser https://github.com/gschorcht/RIOT-Xtensa-ESP
            let url = await driver.getCurrentUrl();
            // comparo
            expect(url).to.equal('https://github.com/gschorcht/RIOT-Xtensa-ESP');
        }
    });

    after(async () => driver.quit());
});

