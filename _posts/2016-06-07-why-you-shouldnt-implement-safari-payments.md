---
layout:   post
title:    "Why you shouldn't implement Safari Apple Pay"
subtitle: "or any of Safari's other proprietary APIs"
date:     2016-06-07 01:31:14 -0500
---

Just a little while ago, Apple announced the [ApplePay JS API]. The observant tech follower probably also noticed that Google announced something pretty similar at their I/O conference this year. While this may just seem like Safari and Chrome duking it out with each other, adding their own proprietary "killer features" to beat out other browsers, this isn't the case.

Both native browser payment APIs are promise-based ways of letting the user purchase something without having to deal with janky credit card forms, or worrying about malicious code sending their credentials to attackers. And the code that powers them also isn't.