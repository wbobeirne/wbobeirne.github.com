---
layout: post
title: "Ludum Dare: Day 2 - Sliding to Home Plate"
---

Well it's been a few days since I finished the Ludum Dare, but I still haven't written my post-mortem. While I loved the competition to death, by the time I screeched through the finish line, I was absolutly done with it. But let's rewind a bit to where we left off on day 1 and a half.

So, when I woke up after my well deserved nap of about 4 hours, I started hitting the to-do list pretty hard. I had my little objects flying around, but they didn't really do anything to the player, so I started right away on collision detection. XNA makes this amazingly easy, and I found a guide on how to do per-pixel collision detection somewhere on the internet, so I was able to get that done in about an hour. Something was missing with my planes though. They just didn't have enough "oomph" to them. They looked and seemed like cardboard cutouts of planes. They needed animations and sounds.

Now, I've never been a great pixel artist, but I was able to some quarter-way decent graphics for the game. The part I was really worried about was sound. Now in my first post, I mentioned I'd be using a program called Sfxr to make sound effects. Down the road, it ended up being a godsend, but I couldn't get a biplane sound out of it. At least, nothing that sounded real enough. I was getting to a point where I was tempted to look on the internet for one, but that's against the LD rules. Everything's gotta come from you. But that's when it hit me. I have an oscillating fan in my room. A little bit of MacGyvering later and...

<img src="http://i.imgur.com/YJPAI.jpg" class="center"/>

I had a pretty believable sounding stunt plane! I honestly didn't think it was going to work, but as you can hear in the game, it did. After that, I added a 4 frame animation for the propellor so that the plane didn't just magically look like it was flying, and my plane was looking just fine. The penguin was also taken care of, he received a proper jetpack with a 4 frame animation and soundeffect to go with it, as you'll see below.

After playtesting this barebones version I had going, I had two problems. The game was either too slow and too easy, or it was just the right speed but too hard. Making the game slow gave you time to dodge planes, but left you sitting there like a bump on a log. Speeding it up made it much more fun and frantic, but planes would just shoot out from random places making it too hard to dodge. Sounds help you know the when of the plane, but I still needed some help for the where. My too-lazy-to-enter but still a good idea man, Travis, suggested I place something along the side to let the player know where the plane was at on the Y axis. A few minutes later, and we had this:

<img src="http://i.imgur.com/jNWAY.png" class="center"/>

I was pretty happy with it, it allowed the game to be much faster without being too hard.

After those features had been taken care of, I was nearing the end of Saturday. I only had about 20 hours left in the competition, so I was sure to wake up early on Saturday.

Except not really.

I did some considerable oversleeping, and woke at around noon. I've never been known for my amazing ability to wake up easily and on time, so this wasn't a huge surprise to me. This left me with a whopping 10 hours left to wrap this baby up, so I shot to my desk and started to get a move on.

My game needed progression, and ultimately, an end. Well, my good penguin friend was only going up, so I started working on transitions from the atmosphere, to the stratosphere, and finally to space. I took the easy road with the stratosphere and just made the same sky, but orange. This saved me a lot of work having to draw all new backgrounds. Space was not quite so simple, I needed stars and planets and all that good stuff. Drawing the new backgrounds and transitions, and coding the transitions took about 2 hours, but I think the results were worth it.

<img src="http://i.imgur.com/CzFtb.png" class="center"/>

As you move through a transition, you'll get faster so that it doesn't take forever to get where you're going. But surprisingly enough, I held off on where you were going until the very end.

The next thing I noticed was a problem was that by the time you got up to space, you had usually taken a few hits, if not died by then. I needed some item drops to restore health. This was a really easy implementation thanks to largely copying the code I used for the airplanes, and only took me about a half hour to implement. That's not to say I didn't run in to a few bugs while doing it...

<img src="http://i.imgur.com/GQrAP.png" class="center"/>

It's raining fish, hallelujah, it's raining fish!

My eldest brother James had just shown up at the house around this time, and I've got to tell you, nothing helps more on a project like this than family. Not just James though, I've got to give a big hand to my whole family for really being behind me on this. I don't know too many parents that could actually respect their kid for screwing up his sleep schedule and screwing around all weekend to make a game. Love you guys. Pardon my sappiness.

Anyway, by this point, I realized I had biplanes flying in space. I really had to add new enemies, which gave me an opportunity to add a difficulty curve to the game. Each transition would also give you a new enemy, enemies if I had had more time. Drawing and implementing those took another hour or so (I'm really slow with the art!) But it was easily one of the most worthwhile things I added. Variety is the biggest problem I've been seeing in Ludum Dare games, with no offense intended to fellow game makers. It's just that in 48 hours, you don't have much time to add content to the game when you're busy just getting basic features to work. I added a Jet that can come from either below or above, and a UFO that oscillates.

<img src="http://i.imgur.com/QdqSg.png" class="center"/>

Still, with about 6 hours until submission time, (I had planned to turn in an hour early though, in case I ran in to a game destroying bug,) I hadn't made an ending. But who cares about actual content? I still wanted to work on silly aesthetics. My title screen was in desperate need of a facelift. It was just a placeholder image to start, something that might possibly resemble a penguin? Perhaps if you squinted. But I needed something to draw players in, a face for my game. When I had first envisioned this game, a strong picture stuck in my mind. A penguin with an aviator's hat. As I said before, I'm not a great pixel artist, so I started with a bit of photoshop. I went out and looked for images of a penguin, and images of aviator hats. With a little bit of photoshop, I had my muse.

<img src="http://i.imgur.com/Q75oy.png" class="center"/>

So yeah, I'm basically a paint-by-numbers aficionado, but cut me some slack. I was crunched for time!

That little masterpiece cost me about 45 minutes or an hour, and by this time, my stomach was about to get together with my intestines and start a mutiny, so I had to appease it. After eating, I was really coming down to the wire on time, and my game still didn't have an ending. As much as I wanted my good penguin to traverse the solar system, I didn't have time to draw all the planets, (This one's for you, Pluto,) so I settled for the moon. It was surprisingly easy to implement. At about 170km or so, you just start creeping the moon in to the top of the screen, then at about half way, I fade to white and show my game win screen. This was another one of those things that didn't take long to implement, but I was really glad I did. Many LD entries lacked a decent end game screen beyond a block of text that says 'gj, play agian?' And again, I'm not knocking on them. I understand the time constraints. But still, seeing our hero with a delicious salmon in his mouth on the moon just felt [i]right[/i].

<img src="http://i.imgur.com/lS0Ng.png" class="center"/>

I stood back from my creation, put my hands on my hips and said, "Yeah. That looks alright, I guess." I actually had juuust enough time to put in a graphic for the penguins helmet, as you can see in the picture above on the left. Before I stuck a fork in it, I had brothers James and Patrick give it a playtest. Thumbs up were had all around, and I was really psyched. I completed the Ludum Dare.

I zipped that sucker up and threw it on the site. I had about an hour to spare, as I'd hoped, but no game breaking bugs popped up, (Though there were a few issues I'd caught, but such is the Ludum Dare.)

I had a really great time and I think I learned a lot about myself as a developer. The whiteboard will definitely be a major component in future projects. I'll be writing a post-mortem sooner or later about how my project was received, things I wish I had done differently, and other such topics. 

Ludum Dare #22 can't come soon enough.

EDIT: Wow, this is why I shouldn't write this stuff so late at night. I entirely forgot to link to my finished game! It requires XNA 4.0 and .Net 4.0 installed to play the game, but those files are included in the download. They won't put any crap on your computer, they're just little dll's that sit tucked away for my game to call on. [Check it out here!](http://www.ludumdare.com/compo/ludum-dare-21/?action=preview&uid=5193)