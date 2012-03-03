---
layout: post
title: "Syntax Highlighting Test"
---

Testing syntax highlighting. Sample from TwitchViewer... However, I need more text or else I break some shit. Breaking shit is bad. Filler text inc:

Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text 
Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text Filler Text 

<pre><code>require_once 'Zend.php';
require_once 'Zend/Uri/Exception.php';
require_once 'Zend/Uri/Http.php';
require_once 'Zend/Uri/Mailto.php';

abstract class Zend_Uri
{

  /**
   * Return a string representation of this URI.
   *
   * @see     getUri()
   * @return  string
   */
  public function __toString()
  {
      return $this->getUri();
  }

  static public function factory($uri = 'http')
  {
      $uri = explode(':', $uri, 2);
      $scheme = strtolower($uri[0]);
      $schemeSpecific = isset($uri[1]) ? $uri[1] : '';

      // Security check: $scheme is used to load a class file,
      // so only alphanumerics are allowed.
      if (!ctype_alnum($scheme)) {
          throw new Zend_Uri_Exception('Illegal scheme');
      }
  }
}
</code></pre>