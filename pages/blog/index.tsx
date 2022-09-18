import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Template } from "../../components/Template";

const POSTS = [
  {
    title: "Testing Out Watchtowers with a Simulated Breach",
    preview:
      "On the Lightning network, there’s potential for a malicious (or mistaken) channel counter-party to close your channel with old state. To combat this, you need to stay vigilant (read: online) at all times, watching to punish someone who tries at a moment’s notice.",
    image: "https://miro.medium.com/max/1400/1*yhNePf0JLQgRHT97plVa_w.png",
    url: "https://medium.com/@wbobeirne/testing-out-watchtowers-with-a-simulated-breach-f1ad22c01112",
  },
  {
    title: "Introducing: Joule Allowances",
    preview:
      "Configurable automatic payments for a seamless experience —  Since I first started working on Joule, I’ve always had the goal of enabling seamless micropayments to happen in the background so that you can enjoy content on the web without content creators having to resort to back channel methods to get paid.",
    image: "https://miro.medium.com/fit/c/224/224/1*UH7MRXwHXjcYAbVSUTzDkw.png",
    url: "https://medium.com/@wbobeirne/introducing-joule-allowances-2b08bec75e3a",
  },
  {
    title: "Making a Lightning Web App: Part 4",
    preview:
      "Integrating WebLN for payments and message signatures —  Hey, this is part 4 of a 5 part series on building a Lightning app. If you’re just interested in learning more about WebLN, it’s easy to follow along! But if you want to start from the beginning, you can check out part 1 here.",
    image: "https://miro.medium.com/max/1400/1*Rxfdx16NROjBERBma1hPpQ.png",
    url: "https://medium.com/@wbobeirne/making-a-lightning-web-app-part-4-c0997f4353b8",
  },
  {
    title: "Making a Lightning Web App: Part 3",
    preview:
      "Making a Lightning Fast UI with WebSockets —  Hey, this is part 3 of a 5 part series on building a Lightning app. If you haven’t read parts 1 & 2, you might want to start from the beginning.",
    image: "https://miro.medium.com/max/1400/1*MYTvO9UKZmdHQ9Q25F6kpA.png",
    url: "https://medium.com/@wbobeirne/making-a-lightning-web-app-part-3-58d8c7351175",
  },
  {
    title: "Making a Lightning Web App: Part 2",
    preview:
      "Setting up a frontend and taking our very first payment —  Hey, this is part 2 of a 5 part series on building a Lightning app. If you haven’t read part 1, you might want to check it out.",
    image: "https://miro.medium.com/max/1400/1*k8BR94S6lgaxWf10LZr-Zg.png",
    url: "https://medium.com/@wbobeirne/making-a-lightning-web-app-part-2-414f5d23c2d7",
  },
  {
    title: "Making a Lightning Web App: Part 1",
    preview:
      "A multi-part guide to creating your first kick-ass Lightning App —  If you’ve been following Bitcoin, you’ve probably heard of the Lightning network: a layer 2 solution to the on-chain scaling problems that Bitcoin faces that allows for near-instantaneous payments with extremely low fees.",
    image: "https://miro.medium.com/max/1400/1*KXsi2w9uAmW7EHIXDRfc8g.png",
    url: "https://medium.com/@wbobeirne/making-a-lightning-web-app-part-1-4a13c82f3f78",
  },
  {
    title:
      "Get ETH & ERC20 token balances for multiple addresses in a single call",
    preview:
      "TL;DR a slick contract and NPM package for efficient and fast balance checks. Scroll to the bottom to try it out and find the package.",
    image: "https://miro.medium.com/max/1400/1*GBbIrK2T4wjrWvyHtu0RMg.png",
    url: "https://medium.com/@wbobeirne/get-all-eth-token-balances-for-multiple-addresses-in-a-single-node-call-4d0bcd1e5625",
  },
  {
    title: "Mutually Exclusive React PropTypes with TypeScript",
    preview:
      "Sometimes when making a React component, you define prop types that allow users to pass one of N types of props. For instance, we might have some form of input component that could either be a standard <input/> or a larger <textarea/>.",
    image: "https://miro.medium.com/max/1400/1*UM6NkHVNzMssEYUbjoVzBQ.jpeg",
    url: "https://medium.com/@wbobeirne/mutually-exclusive-react-proptypes-with-typescript-97cfd2ebc6a0",
  },
];

const Blog: NextPage = () => {
  return (
    <Template>
      <Head>
        <title>Blog | William O’Beirne</title>
        <meta name="description" content="Don’t forget to fill me out dummy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {POSTS.map((post) => (
          <Link key={post.url} href={post.url}>
            <a target="_blank" rel="noopener noreferrer">
              <img src={post.image} />
              <h3>{post.title}</h3>
              <p>{post.preview}</p>
              <div>Read more →</div>
            </a>
          </Link>
        ))}
      </div>
    </Template>
  );
};

export default Blog;
