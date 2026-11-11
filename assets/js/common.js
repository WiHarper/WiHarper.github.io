$(document).ready(function () {
  // add toggle functionality to abstract, award and bibtex buttons
  $("a.abstract").click(function () {
    $(this).parent().parent().find(".abstract.hidden").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.award").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden.open").toggleClass("open");
  });
  $("a.bibtex").click(function () {
    $(this).parent().parent().find(".abstract.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".award.hidden.open").toggleClass("open");
    $(this).parent().parent().find(".bibtex.hidden").toggleClass("open");
  });
  $("a").removeClass("waves-effect waves-light");

  // bootstrap-toc
  if ($("#toc-sidebar").length) {
    // remove related publications years from the TOC
    $(".publications h2").each(function () {
      $(this).attr("data-toc-skip", "");
    });
    var navSelector = "#toc-sidebar";
    var $myNav = $(navSelector);
    Toc.init($myNav);
    $("body").scrollspy({
      target: navSelector,
      offset: 100,
    });

    // phones hide the sidebar, so offer the same links as a collapsed list under the page title
    var postHeader = document.querySelector(".post .post-header");
    var tocLinks = $myNav.find("a");
    // (skipped on the resume, which is short enough not to need it)
    var isResume = document.querySelector(".cv") !== null;
    if (postHeader && tocLinks.length && !isResume) {
      var details = document.createElement("details");
      details.className = "toc-mobile";
      var summary = document.createElement("summary");
      summary.textContent = "On this page";
      details.appendChild(summary);
      var list = document.createElement("ul");
      tocLinks.each(function () {
        var item = document.createElement("li");
        // nested (sub-heading) links sit one level deeper in the sidebar
        if ($(this).parents("ul").length > 1) item.className = "toc-mobile-sub";
        var link = document.createElement("a");
        link.href = this.getAttribute("href");
        link.textContent = this.textContent;
        link.addEventListener("click", function () {
          details.open = false;
        });
        item.appendChild(link);
        list.appendChild(item);
      });
      details.appendChild(list);
      postHeader.insertAdjacentElement("afterend", details);
    }
  }

  // add css to jupyter notebooks
  const cssLink = document.createElement("link");
  cssLink.href = "../css/jupyter.css";
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";

  let jupyterTheme = determineComputedTheme();

  $(".jupyter-notebook-iframe-container iframe").each(function () {
    $(this).contents().find("head").append(cssLink);

    if (jupyterTheme == "dark") {
      $(this).bind("load", function () {
        $(this).contents().find("body").attr({
          "data-jp-theme-light": "false",
          "data-jp-theme-name": "JupyterLab Dark",
        });
      });
    }
  });

  // trigger popovers
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
  });
});
