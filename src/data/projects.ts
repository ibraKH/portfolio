export const projects = [
  {
    slug: "roya",
    number: "01",
    title: "Roya",
    category: "Multimodal AI · Computer vision",
    tagline: "Detection, OCR, maps and a language model, wired into one app.",
    summary:
      "A platform that runs object detection, text recognition, geospatial analysis and a language model over the same images, end to end.",
    role: "End-to-end platform engineering",
    stack: "Python / FastAPI / YOLO / OpenCV / React",
    fact: "~1,000 images",
    factLabel: "Run through the pipeline. A measure of scale, not accuracy.",
    problem:
      "One photo holds several kinds of information at once: the objects in it, any text in the scene, and the place it sits in the world. Most tools only read one of those. Roya was my attempt to read them together, inside a single piece of software.",
    ownership:
      "I built the platform on both sides: the Python inference backend and the React interface. Most of that work was wiring YOLO, OCR, geospatial analysis and an LLM into one flow that a person could actually use.",
    approach:
      "No single model was the hard part. The hard part was getting them to behave like one application instead of a pile of separate experiments. FastAPI sits in front as the service layer, and OpenCV and PyTorch do the visual processing underneath.",
    design: [
      "Visual input",
      "Detection + OCR",
      "Geospatial context",
      "LLM interpretation",
      "React application",
    ],
    evidence:
      "The pipeline has handled roughly 1,000 images, and the frontend and backend code are both public. Treat that number as a sense of scale. It says how much the workflow processed, not how accurate or fast it was.",
    limitations:
      "It’s a prototype. The camera feeds are simulated and the profiling data is mock, so this isn’t a system running in the field. The lesson I kept from it: hold what the camera actually saw apart from what the language model says about it. An LLM’s summary is an interpretation, and it shouldn’t be dressed up as evidence.",
    source: "https://github.com/ibraKH/neural-vision-LLM-threat-Intelligence",
    sourceLabel: "Explore the repository",
    caption: "How the pieces connect · illustration, not model output",
  },
  {
    slug: "clip",
    number: "02",
    title: "Learning with less",
    category: "CLIP · Few-shot vision-language learning",
    tagline: "How far can a handful of labelled images take CLIP?",
    summary:
      "Few-shot image classification on CLIP, using Tip-Adapter++, CoOp / CoCoOp and parameter-efficient fine-tuning.",
    role: "ML experimentation",
    stack: "Python / PyTorch / CLIP / PEFT",
    fact: "Few-shot",
    factLabel: "Adapting a large model from a handful of labelled examples.",
    problem:
      "CLIP already knows a lot about images and language before it sees a single example from your task. The question here is what you can do with it when you only have a few labelled images to adapt it with.",
    ownership:
      "I wrote the experiments in PyTorch: the CLIP setup, each adaptation method, and the classification runs that tie them together.",
    approach:
      "Each method comes at the problem from a different side. Tip-Adapter++ builds a cache from the few examples you have. CoOp and CoCoOp learn the text prompt instead of relying on a hand-written one. PEFT trains a small set of parameters and leaves the rest of CLIP frozen.",
    design: [
      "Image + text inputs",
      "Pretrained CLIP",
      "Few-shot adaptation",
      "Classification evaluation",
    ],
    evidence:
      "The code is public: configs, experiment scripts, source and tests. I’m not quoting accuracy numbers on this page, because the finished results report isn’t in the repository.",
    limitations:
      "Running several methods doesn’t tell you which one is best. A fair comparison needs the dataset, splits, seeds and evaluation protocol sitting right next to the numbers, so I’m not ranking the methods here.",
    source: "https://github.com/ibraKH/CLIP_proj",
    sourceLabel: "Explore the experiments",
    caption: "Experiment design · illustration, no measured values",
  },
  {
    slug: "techlauncher",
    number: "03",
    title: "Built for collaboration",
    category: "ANU TechLauncher · Scientific software",
    tagline:
      "Letting researchers edit the same model without stepping on each other.",
    summary:
      "I led an eight-person team building a collaborative scientific platform for TERN and CSIRO, as part of ANU’s TechLauncher capstone.",
    role: "Lead Software Engineer · capstone engagement",
    stack: "TypeScript / PostgreSQL / PostGIS / Socket.IO / Docker",
    fact: "8-person team",
    factLabel: "Architecture to delivery, Jul 2025–Jun 2026.",
    problem:
      "Ecosystem models are built by groups of scientists, not one person at a desk. They need to work on the same model at the same time, control who can change what, talk through decisions in place, and keep versions worth returning to. This platform was built for exactly that.",
    ownership:
      "I led the eight-person engineering team. I started the backend, owned it the whole way through, and was the sole owner of CI. For clarity: this was an ANU capstone with TERN and CSIRO as partners, not a job at either organisation.",
    approach:
      "The backend is TypeScript on PostgreSQL and PostGIS. Sign-in uses JWT with email verification, and permissions are set per model, so every model has its own roles. On top of that, a Socket.IO layer handles the live side: who’s online, node locks that expire on their own, threaded comments and milestone snapshots.",
    design: [
      "Shared model editor",
      "Authenticated API + Socket.IO",
      "Per-model permissions",
      "PostgreSQL / PostGIS",
      "CI + tests + Docker",
    ],
    stats: [
      { value: 23, label: "Database tables" },
      { value: 14, label: "Migrations" },
      { value: 32, label: "Jest test files" },
    ],
    evidence:
      "By the numbers: 23 database tables, 14 migrations and a Jest suite of 32 test files. I reviewed and merged 26 of the 31 production pull requests, and a contribution audit credits me as primary author of 12 of the 14 functional areas. Those figures describe scope and ownership, not how many people use it.",
    limitations:
      "The backend code is public. The ownership figures come from the contribution audit, not something you can read off the repository. I’m not claiming users or uptime. The design call I’d defend is the split between locks and snapshots: expiring locks stop two people editing the same node at once, and snapshots mark the moments worth coming back to.",
    source: "https://github.com/ibraKH/tern_backend",
    sourceLabel: "Explore the backend",
    caption: "Collaboration sketch · based on the real features",
  },
  {
    slug: "nanogpt",
    number: "04",
    title: "Inside the language model",
    category: "Transformer language modeling · NanoGPT",
    tagline: "Three small GPTs, trained the same way, measured the same way.",
    summary:
      "Training three 29.9M-parameter GPT models with matched hyperparameters, a leakage-free BPE pipeline and token-weighted evaluation.",
    role: "Model training + evaluation",
    stack: "Python / PyTorch / GPT-2 / BPE",
    fact: "3 × 29.9M",
    factLabel: "Three models, 29.9M parameters each.",
    problem:
      "Comparing language models is easy to get wrong. If the tokenizer has already seen the test text, or the evaluation averages the wrong way, the scores stop meaning much, however good the training run was.",
    ownership:
      "I trained three GPT models of 29.9 million parameters each under matched hyperparameters, and built the tokenisation and evaluation pipeline around them.",
    approach:
      "I built a byte-pair encoding pipeline that never sees the evaluation data, then wrote a custom perplexity metric weighted by token count. Matching the hyperparameters keeps the runs comparable. Weighting by tokens means every token counts the same, however the batches happen to split.",
    design: [
      "Data preparation",
      "Leakage-free BPE",
      "Three matched GPT runs",
      "Token-weighted perplexity",
    ],
    evidence:
      "What exists: three trained models and the pipeline that prepares their data and scores them. I’m not publishing perplexity figures or a ranking on this page.",
    limitations:
      "Model size and run count describe the setup, not the quality, and the code, data and training curves for this one aren’t public. The lesson that stuck: make the comparison trustworthy first, then look at the score.",
    caption: "Experiment setup · illustration, not a training curve",
  },
];
