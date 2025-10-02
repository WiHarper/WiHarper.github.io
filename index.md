---
title: "Wilson Harper"
---


# Hey!
It's great to see you. Get in touch!

![Alt text](assets/picture.jpg){:width="25%"}


<!-- put this where you want the email to appear -->
<div id="email" data-user="hey" data-domain="wilsonharper.net"></div>

<noscript>wilsonharper [at] wilsonharper [dot] net</noscript>

<script>
document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('email');
  if (!el) return;
  var user = el.dataset.user || '';
  var domain = el.dataset.domain || '';
  var address = user + '@' + domain;

  // clickable mailto link
  var a = document.createElement('a');
  a.href = 'mailto:' + address;
  a.textContent = address;
  el.appendChild(a);
});
</script>
<br>
[LinkedIn](https://linkedin.com/in/wilson-harper)

[Resume](resume.md)

[Portfolio](portfolio.md])

[Instagram](https://www.instagram.com/wils.harp/)

[HN](https://news.ycombinator.com/user?id=WilsonHarper)
