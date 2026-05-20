---
name: "Awesome Books"
slug: "awesome-books"
category: "tracking"
logo: "/images/awesome-books-removebg.avif"
website: "https://awesomebooks.com"
metaTitle: "DataWiz - Success Stories - Awesome Books"
metaDescription: "How DataWiz helped Awesome Books improve tracking accuracy, attribution, and marketing data resilience."
caseStudyFile: ""
featuredKpis:
  - title: "Data Accuracy"
    number: 98
    afterNumber: "%"
  - title: "Accuracy Improvement"
    number: 20
    afterNumber: "%"
  - title: "Attribution Improvement"
    number: 15
    afterNumber: "%"
projectStats:
  - title: "Experience"
    number: 6
    afterNumber: "y"
  - title: "Clients"
    number: 150
    afterNumber: "+"
  - title: "Projects"
    number: 300
    afterNumber: "+"
  - title: "AVG Revenue Increase"
    number: 20
    beforeNumber: "+"
    afterNumber: "%"
intro: "AwesomeBooks is a global online bookstore offering millions of new and used books at affordable prices. With a mission to make books accessible to everyone, they combine sustainable practices with a wide selection that serves readers worldwide."
challenges:
  - title: "Low Data Accuracy"
    description: "Negatively impacts ad performance."
  - title: "Missing User Data"
    description: "Leaves gaps in attribution, reducing accuracy and weakening campaign performance."
  - title: "Incomplete Platform Tracking"
    description: "Missing data from multiple platforms hindered ad performance and limited campaign optimization."
objectives:
  - title: "High Data Accuracy"
    description: "Reliable tracking improves ad performance and enables confident decision-making."
  - title: "Improved Attribution"
    description: "Clearer attribution shows the true value of each channel and boosts campaign performance."
  - title: "Complete Platform Tracking"
    description: "Implemented tracking across all platforms to capture full performance data, enabling efficient ad optimization and better decision-making."
initialSetup:
  - title: "Tracking Configuration"
    description: "Tracking was split between GTM and hardcoded scripts, leading to conflicts, data duplication, and gaps, while dataLayers failed to capture all required data."
  - title: "Tracking Method"
    description: "The client used client-side tracking, which is prone to being blocked by ad blockers, iOS restrictions, and other tracking prevention systems, resulting in worse accuracy and attribution."
solutions:
  - title: "Tracking Configuration"
    description: "All tracking was centralized using Google Tag Manager (GTM) to manage GA4, Google Ads, Meta, TikTok, Pinterest, Reddit, and Microsoft Ads tracking in one place. In collaboration with the development team, I helped implement e-commerce dataLayers, ensuring a robust and well-documented event tracking setup."
  - title: "Tracking Method"
    description: "A custom server-side tracking setup was implemented using Stape. This approach enhances data accuracy, improves attribution, provides more control over data, allows for data enrichment, and even slightly improves site speed."
results:
  - title: "Data Accuracy"
    visual: "table"
    table:
      columns:
        - "PLATFORM"
        - "BASELINE"
        - "INDUSTRY AVERAGE"
        - "PROJECT TARGET"
        - "FINAL OUTCOME"
        - "UPLIFT"
      rows:
        - cells:
            - "GA4"
            - value: "61.3%"
              tone: "red"
            - "70-80%"
            - "90%"
            - value: "98.7%"
              tone: "green"
            - "37.4% more data"
        - cells:
            - "Google Ads"
            - value: "61.3%"
              tone: "red"
            - "70-80%"
            - "90%"
            - value: "99.2%"
              tone: "green"
            - "37.9% more data"
        - cells:
            - "Meta Ads"
            - value: "63.5%"
              tone: "red"
            - "70-80%"
            - "90%"
            - value: "99.1%"
              tone: "green"
            - "35.6% more data"
        - cells:
            - "TikTok Ads"
            - value: "62.9%"
              tone: "red"
            - "70-80%"
            - "90%"
            - value: "97.6%"
              tone: "green"
            - "34.7% more data"
        - cells:
            - "Microsoft Ads"
            - value: "60%"
              tone: "red"
            - "70-80%"
            - "90%"
            - value: "97.4%"
              tone: "green"
            - "37.4% more data"
        - cells:
            - "Pinterest Ads"
            - value: "No Tracking"
              tone: "red"
            - "70-80%"
            - "90%"
            - value: "97.9%"
              tone: "green"
            - "97.9% more data"
        - cells:
            - "Reddit Ads"
            - value: "No Tracking"
              tone: "red"
            - "70-80%"
            - "90%"
            - value: "97.2%"
              tone: "green"
            - "97.2% more data"
      footer:
        label: "AVERAGE UPLIFT"
        value: "54% more data"
        labelColSpan: 3
        valueColSpan: 3
    items:
      - title: "Understanding the Metric"
        description: "Data accuracy measures the percentage of actual purchases that are successfully recorded in each platform. The data accuracy should be as close to 100% as possible, but we should also avoid inflated data, which can skew results and lead to misleading conclusions."
      - title: "Business Impact"
        description: "Ad platforms can optimize targeting, bidding, and delivery more effectively when they receive more reliable conversion data, while analytics teams get a fuller picture for marketing and website optimization."
  - title: "Marketing Attribution"
    visual: "table"
    reverse: true
    table:
      columns:
        - "PLATFORM"
        - "HEALTH"
        - "BASELINE"
        - "FINAL OUTCOME"
        - "UPLIFT"
      rows:
        - cells:
            - "GA4"
            - "Direct"
            - value: "12%"
              tone: "red"
            - value: "6%"
              tone: "green"
            - "6% more events attributed"
        - cells:
            - "Google Ads"
            - "User Data"
            - value: "No Data"
              tone: "red"
            - value: "100%"
              tone: "green"
            - "more events attributed"
        - cells:
            - "Meta Ads"
            - "User Data"
            - value: "No Data"
              tone: "red"
            - value: "100%"
              tone: "green"
            - "more events attributed"
        - cells:
            - "TikTok Ads"
            - "User Data"
            - value: "No Data"
              tone: "red"
            - value: "100%"
              tone: "green"
            - "more events attributed"
        - cells:
            - "Microsoft Ads"
            - "User Data"
            - value: "No Data"
              tone: "red"
            - value: "100%"
              tone: "green"
            - "more events attributed"
    items:
      - title: "Understanding the Metric"
        description: "Marketing attribution represents key health metrics that show how effectively marketing platforms assign credit for conversions across different channels."
      - title: "Business Impact"
        description: "Accurate attribution helps platforms allocate credit to the right touchpoints, improving campaign targeting, bidding, budget allocation, and future marketing decisions."
  - title: "Overcoming Tracking Restrictions"
    visual: "chart"
    note: "Note: We bypassed these restrictions with server side tracking."
    chart:
      labels:
        - "Normal Users"
        - "Use Tracking Prevention"
      values:
        - 68
        - 32
      colors:
        - "#3b82f6"
        - "#ef4444"
      offsets:
        - 0
        - 50
      cutout: "55%"
    items:
      - title: "Understanding the Metric"
        description: "This metric represents the percentage of users who employ ad blockers, browser restrictions, iOS tracking prevention, or other similar technologies that limit or prevent tracking."
      - title: "Business Impact"
        description: "Server-side tracking bypasses current tracking restrictions, improving tracking accuracy and attribution while creating a more resilient setup as tracking prevention systems evolve."
testimonial:
  quote: "Could not recommend Igor and DataWiz more highly. Quick to reply to any issue, really good technical understanding of topics, and feels like they are part of your team. Carry on the great work guys."
  name: "Mubin A."
  title: "Director"
---

Awesome Books tracking case study content is generated from this Markdown file.
