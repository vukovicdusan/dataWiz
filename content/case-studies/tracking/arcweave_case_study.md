---
client: "Arcweave"
slug: "arcweave"
categories:
  - "Tracking"
  - "Custom Site"
website: "https://arcweave.com"
logo_file: "/images/case-studies/arcweave_logo.webp"
top_metrics:
  data_accuracy: "98.2%"
  accuracy_improvement: "+35.2%"
  attribution_improvement: "+25.4%"
project_overview:
  meet_the_client: "Arcweave (arcweave.com) is an all‐in‐one game design and narrative tool for creators of interactive experiences. It helps teams design, iterate, and integrate storylines, characters, dialogues, and branching narratives in a single platform. With features like real‐time collaboration, prototyping of designs, flexible export options (JSON, Web API), and plugins for engines like Unity, Unreal, and Godot, Arcweave streamlines the workflow for building immersive stories and games."
  challenges:
    - title: "Low Data Accuracy"
      description: "⚠️ Leads to weaker ad performance and misguided decisions."
    - title: "Poor Attribution"
      description: "⚠️ Misrepresents channel performance, leading to poor budget allocation."
  objectives:
    - title: "High Data Accuracy"
      description: "🚀 Reliable tracking improves ad performance and enables confident decision-making."
    - title: "Improved Attribution"
      description: "🚀 Clearer attribution shows the true value of each channel and boosts campaign performance."
  initial_setup:
    - title: "Tracking Configuration"
      description: "The client’s tracking was initially set up using Google Tag Manager (GTM) and custom dataLayers, but the implementation was incomplete and lacked sufficient detail, resulting in unreliable and inconsistent data collection."
    - title: "Tracking Method"
      description: "The client relied on client-side tracking, which is vulnerable to being blocked by ad blockers, iOS privacy restrictions, and other tracking prevention mechanisms. This results in lower data accuracy and weaker attribution across marketing platforms."
  solutions:
    - title: "Tracking Configuration"
      description: "The existing GTM setup was retained, but the implementation was rebuilt and standardized. DataLayers were expanded and enriched, and the GTM configuration was refined to ensure reliable, consistent, and centralized tracking across all platforms."
    - title: "Tracking Method"
      description: "A custom server-side tracking setup was implemented using Stape. This approach enhances data accuracy, improves attribution, provides more control over data, allows for data enrichment, and even slightly improves site speed."
project_results:
  understanding_metrics:
    - description: "Data Accuracy: Measures the percentage of actual purchases that are successfully recorded in each platform. The data accuracy should be as close to 100% as possible, but we should also avoid inflated data."
    - description: "Accuracy Improvement: Shows the percentage increase in data accuracy after the project, averaged across all marketing platforms."
    - description: "Shows the percentage increase in properly attributed events after the project. It reflects how many more events are now correctly assigned to marketing channels instead of being classified as unattributed (e.g., Direct or Not Set)."
    - description: "Overcoming Tracking Restrictions: Represents the percentage of users who use a tracking prevention system. While not all of these users necessarily block tracking right now, it reflects the potential for data loss."
  data_accuracy:
    project_outcomes:
      - platform: "GA4"
        baseline: "63%"
        baseline_tone: "red"
        project_target: "90%"
        final_outcome: "98.2%"
        final_outcome_tone: "green"
        uplift: "+35.2% events"
        uplift_tone: "green"
    industry_average_note: "The industry average is between 60% and 70%."
    consent_note: ""
    business_impact:
      - title: "Ad Performance"
        description: "With more conversion data, ad platforms can optimize targeting, bidding, and delivery more effectively, maximizing return on ad spend and reducing wasted budget."
      - title: "Data Analysis"
        description: "More data ensures we get the full picture, so we don’t miss important insights and can more effectively analyze and optimize marketing and website performance."
  attribution_improvement:
    project_outcomes:
      - platform: "GA4"
        health: "Direct"
        baseline: "55.3%"
        baseline_tone: "red"
        project_target: "<35%"
        final_outcome: "29.9%"
        final_outcome_tone: "green"
        uplift: "+25.4% attributed events"
        uplift_tone: "green"
    consent_note: ""
    business_impact:
      - title: "Ad Performance"
        description: "Accurate attribution allows ad platforms to allocate credit to the right touchpoints, improving campaign targeting, bidding, and budget allocation. This leads to better return on ad spend and more effective use of marketing resources."
      - title: "Data Analysis"
        description: "When attribution is accurate, businesses can make informed decisions based on reliable data, optimizing future campaigns and improving overall marketing strategy."
  overcoming_tracking_restrictions:
    use_tracking_prevention: "68%"
    use_tracking_prevention_tone: "red"
    other_tone: "blue"
    note: "We bypassed these restrictions with server side tracking."
    business_impact:
      - title: "Tracking Accuracy:"
        description: "Server-side tracking bypasses current tracking restrictions, ensuring high data accuracy and attribution."
      - title: "Future Resilience:"
        description: "As tracking prevention systems evolve, server-side tracking provides a future-proof solution."
    additional_improvements:
      intro: "Beyond measurable gains in tracking accuracy, attribution, tracking prevention mitigation, and site speed, the project delivered several structural and strategic improvements that significantly strengthened the overall tracking foundation."
      items:
        - title: "New Events:"
          description: "Added previously untracked events to capture key user interactions across the customer journey, enabling more granular segmentation and remarketing."
        - title: "New Parameters:"
          description: "Introduced additional parameters to enrich events with more context, supporting advanced remarketing and deeper analysis."
        - title: "Clean Setup:"
          description: "Simplified and standardized the tracking setup by removing legacy issues, reducing complexity, and ensuring clear ownership and long-term scalability."
        - title: "Integrations:"
          description: "Aligned analytics and advertising platforms to ensure consistent event logic, reliable data flow, and platform readiness."
        - title: "Data Enrichment:"
          description: "Enhanced events with additional first-party and contextual data to improve attribution, audience building, and performance optimization."
client_experience:
  review_text: "Great service and excellent knowledge of the domain, would definitely pick again."
  client_name: "Manos K."
  client_position: "CEO & Founder"
---

The Red Dog Company tracking case study content is generated from this Markdown file.
