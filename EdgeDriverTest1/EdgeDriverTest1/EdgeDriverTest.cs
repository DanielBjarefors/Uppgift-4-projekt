using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Edge;
using OpenQA.Selenium.Support.UI;

//Lägg till en anteckning och bekräfta att den visas på sidan.
//Lägg till en anteckning och bekräfta att sidan visar "1 item left". Kryssa sedan i anteckningen och bekräfta att sidan visar "0 items left".
//Lägg till 3 anteckningar, kryssa i en av dem och bekräfta att sidan visar "2 items left".

namespace SeleniumExample
{
    [TestClass]
    public class EdgeDriverTest
    {
        private const string edgeDriverDirectory = @"C:\C#\Frontend med Jakob Kallin\edgedriver_win64 (1)";
        private const string benchPress = "file:///C:/C%23/Frontend%20med%20Jakob%20Kallin/Uppgift-4-projekt/benchPress.html";
        private const string deadlift = "file:///C:/C%23/Frontend%20med%20Jakob%20Kallin/Uppgift-4-projekt/deadlift.html";
        private const string squat = "file:///C:/C%23/Frontend%20med%20Jakob%20Kallin/Uppgift-4-projekt/squat.html";
        private const string index = "file:///C:/C%23/Frontend%20med%20Jakob%20Kallin/Uppgift-4-projekt/index.html";

        private EdgeDriver browser;


        // This is run before each test.
        [TestInitialize]
        public void EdgeDriverInitialize()
        {
            browser = new EdgeDriver(edgeDriverDirectory);
            browser.Url = index;
        }
       
        
        [TestMethod]
        public void TestBenchAndIndexPage()
        {
            browser.Navigate().GoToUrl(benchPress);

            // Find the search input at the top of the page.
            var btn = browser.FindElementsByCssSelector("button");
            var input = browser.FindElementsByCssSelector("input");
            var weight = browser.FindElementsByCssSelector("td");


            input[0].Clear();
            input[0].SendKeys("90");
            btn[1].Click();

            input[1].Clear();
            input[1].SendKeys("6");
            btn[2].Click();

            Assert.AreEqual("95", weight[1].Text);
            
            browser.Navigate().GoToUrl(index);
            var total = browser.FindElementsByCssSelector("th");
            Assert.IsTrue(total[4].Text == "455");
        }
        [TestMethod]
        public void TestDeadliftPage()
        {
            browser.Navigate().GoToUrl(deadlift);

            // Find the search input at the top of the page.
            var btn = browser.FindElementsByCssSelector("button");
            var input = browser.FindElementsByCssSelector("input");
            var weight = browser.FindElementsByCssSelector("td");

            input[0].Clear();
            input[0].SendKeys("120");
            btn[1].Click();

            input[1].Clear();
            input[1].SendKeys("6");
            btn[2].Click();

            Assert.AreEqual("125", weight[1].Text);
            //btn[0].Click();
        }
        [TestMethod]
        public void TestSquatPage()
        {
            browser.Navigate().GoToUrl(squat);
            // Find the search input at the top of the page.
            var btn = browser.FindElementsByCssSelector("button");
            var input = browser.FindElementsByCssSelector("input");
            var weight = browser.FindElementsByCssSelector("td");

            input[0].Clear();
            input[0].SendKeys("120");
            btn[1].Click();

            input[1].Clear();
            input[1].SendKeys("6");
            input[2].Clear();
            input[2].SendKeys("6");
            btn[2].Click();

            Assert.AreEqual("125", weight[1].Text);
            Assert.AreEqual("125", weight[4].Text);
            //btn[0].Click();
        }

        [TestCleanup]
        public void EdgeDriverCleanup()
        {
            browser.Quit();
        }
    }
}
