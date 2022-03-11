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
        private const string BenchPress = "file:///C:/C%23/Frontend%20med%20Jakob%20Kallin/Uppgift-4-projekt/BenchPress.html";
        private const string Deadlift = "file:///C:/C%23/Frontend%20med%20Jakob%20Kallin/Uppgift-4-projekt/Deadlift.html";
        private const string Squat = "file:///C:/C%23/Frontend%20med%20Jakob%20Kallin/Uppgift-4-projekt/Squat.html";
        private const string index = "file:///C:/C%23/Frontend%20med%20Jakob%20Kallin/Uppgift-4-projekt/index.html";

        private EdgeDriver browserBench;
        private EdgeDriver browserDeadlift;
        private EdgeDriver browserSquat;
        private EdgeDriver browserindex;

        // This is run before each test.
        [TestInitialize]
        public void EdgeDriverInitialize()
        {
            browserBench = new EdgeDriver(edgeDriverDirectory);
            browserBench.Url = BenchPress;

            browserDeadlift = new EdgeDriver(edgeDriverDirectory);
            browserDeadlift.Url = Deadlift;

            browserSquat = new EdgeDriver(edgeDriverDirectory);
            browserSquat.Url = Squat;

            browserindex = new EdgeDriver(edgeDriverDirectory);
            browserindex.Url = index;
        }
        [TestMethod]
        public void TestSquatPage()
        {
            // Find the search input at the top of the page.
            var btn = browserBench.FindElementsByCssSelector("button");
            var input = browserBench.FindElementsByCssSelector("input");
            var weight = browserBench.FindElementsByCssSelector("td");

            input[0].Clear();
            input[0].SendKeys("120");
            btn[1].Click();

            input[1].Clear();
            input[1].SendKeys("6");
            input[2].Clear();
            input[2].SendKeys("6");
            btn[2].Click();

            Assert.AreEqual("125", weight[1].Text);
            Assert.AreEqual("125", weight[2].Text);
            btn[0].Click();
        }

        [TestMethod]
        public void TestDeadliftPage()
        {
            // Find the search input at the top of the page.
            var btn = browserDeadlift.FindElementsByCssSelector("button");
            var input = browserDeadlift.FindElementsByCssSelector("input");
            var weight = browserDeadlift.FindElementsByCssSelector("td");

            input[0].Clear();
            input[0].SendKeys("120");
            btn[1].Click();

            input[1].Clear();
            input[1].SendKeys("6");
            input[2].Clear();
            input[2].SendKeys("6");
            btn[2].Click();

            Assert.AreEqual("125", weight[1].Text);
            Assert.AreEqual("125", weight[2].Text);
            btn[0].Click();
        }

        [TestMethod]
        public void TestBenchPage()
        {
            // Find the search input at the top of the page.
            var btn = browserBench.FindElementsByCssSelector("button");
            var input = browserBench.FindElementsByCssSelector("input");
            var weight = browserBench.FindElementsByCssSelector("td");

            input[0].Clear();
            input[0].SendKeys("90");
            btn[1].Click();

            input[1].Clear();
            input[1].SendKeys("6");
            btn[2].Click();

            Assert.AreEqual("95", weight[1].Text);
            btn[0].Click();
        }
       

        
        [TestCleanup]
        public void EdgeDriverCleanup()
        {
            browserBench.Quit();
        }
    }
}
