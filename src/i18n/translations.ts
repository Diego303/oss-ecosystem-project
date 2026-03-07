export type Lang = 'es' | 'en';

interface PrincipleItem {
  number: string;
  title: string;
  description: string;
}

interface Translations {
  nav: { cta: string };
  hero: {
    tag: string;
    titleStart: string;
    titleAccent: string;
    subtitle: string;
    cta: string;
  };
  journey: {
    intake: { phase: string; tag: string; description: string };
    architect: { phase: string; tag: string; description: string };
    vigil: { phase: string; tag: string; description: string };
  };
  intake: {
    phase: string;
    subtitle: string;
    p1: string;
    p2: string;
    features: string[];
    docBtn: string;
    codeTitle: string;
    code: { comment: string; output1: string; output2: string };
  };
  architect: {
    phase: string;
    subtitle: string;
    p1: string;
    features: string[];
    docBtn: string;
    codeTitle: string;
    code: { arg: string; output1: string; output2: string };
  };
  vigil: {
    phase: string;
    subtitle: string;
    p1: string;
    features: string[];
    docBtn: string;
    codeTitle: string;
    code: { output1: string; error1: string; error2: string; ok: string };
  };
  pipeline: {
    tag: string;
    title: string;
    subtitle: string;
    codeTitle: string;
    code: { arg: string };
  };
  principles: {
    tag: string;
    title: string;
    items: PrincipleItem[];
  };
  cta: {
    title: string;
    subtitle: string;
    btn: string;
  };
  footer: { text: string };
}

const translations: Record<Lang, Translations> = {
  es: {
    nav: { cta: 'Empezar' },
    hero: {
      tag: 'Open Source \u00B7 CLI-First \u00B7 Backend-Agnostico',
      titleStart: 'De requisitos caoticos a codigo ',
      titleAccent: 'verificado',
      subtitle:
        'Tres herramientas CLI. Un pipeline que cubre toda la cadena \u2014 desde la idea hasta codigo seguro en produccion.',
      cta: 'Explorar herramientas',
    },
    journey: {
      intake: {
        phase: 'Fase 01',
        tag: 'Captura y normaliza',
        description:
          'De Jira, PDFs, Slack o una frase \u2014 a una spec YAML ejecutable para cualquier agente.',
      },
      architect: {
        phase: 'Fase 02',
        tag: 'Implementa con control',
        description:
          'Agentes de IA con guardrails deterministas, budget limits, y audit trail. Backend-agnostico.',
      },
      vigil: {
        phase: 'Fase 03',
        tag: 'Verifica y protege',
        description:
          'Detecta vulnerabilidades exclusivas de codigo IA: alucinaciones, slopsquatting, over-permissions.',
      },
    },
    intake: {
      phase: '\u25FB Fase 01 \u2014 Preparacion',
      subtitle: 'De requisitos caoticos a spec ejecutable',
      p1: 'Captura de Jira, PDFs, Confluence, Slack, o lenguaje natural. Normaliza, deduplica, detecta conflictos, genera spec YAML.',
      p2: 'No genera codigo. Es infraestructura de preparacion.',
      features: [
        'Multi-source: Jira, PDFs, Slack, imagenes',
        'Deduplicacion y deteccion de conflictos',
        'Output YAML universal',
        'Trazabilidad completa',
      ],
      docBtn: 'Ir a documentacion',
      codeTitle: 'Terminal \u2014 intake collect',
      code: {
        comment: '# Captura desde multiples fuentes',
        output1: '  \u25FB 14 requisitos \u00B7 2 conflictos',
        output2: '  \u25FB Spec \u2192 .intake/spec.yaml',
      },
    },
    architect: {
      phase: '\u25B3 Fase 02 \u2014 Implementacion',
      subtitle: 'Control determinista para agentes de codigo',
      p1: 'Guardrails que el LLM no puede saltarse. Backend-agnostico. Cambia de modelo sin cambiar tus pipelines.',
      features: [
        'Ralph Loop: iteracion con verificacion',
        'Archivos protegidos, budget limits',
        '100+ proveedores, zero lock-in',
        'OWASP nativa, OpenTelemetry',
      ],
      docBtn: 'Ir a documentacion',
      codeTitle: 'Figura 03 \u2014 architect loop',
      code: {
        arg: 'Modulo de pagos',
        output1: '  \u25B3 Loop 3/10',
        output2: '  \u2713 18/18 passed \u00B7 $0.089',
      },
    },
    vigil: {
      phase: '\u25C7 Fase 03 \u2014 Verificacion',
      subtitle: 'Security scanner para codigo IA',
      p1: 'Detecta dependencias alucinadas, slopsquatting, over-permissions, tests vacios. Determinista, sin LLMs.',
      features: [
        'Dependencias fantasma en registries',
        'Typosquatting y slopsquatting',
        'Tests: asserts vacios, coverage falso',
        'Quality gate para CI/CD',
      ],
      docBtn: 'Ir a documentacion',
      codeTitle: 'Terminal \u2014 vigil scan',
      code: {
        output1: '  \u25C7 47 archivos...',
        error1: '  \u2717 DEP-001 flask-helper (alucinada)',
        error2: '  \u2717 SEC-003 CORS disabled',
        ok: '  \u2713 45/47 limpios',
      },
    },
    pipeline: {
      tag: '// Pipeline completo',
      title: 'Tres comandos. Cero supervision.',
      subtitle: 'De ticket a PR verificado. Headless, auditable.',
      codeTitle: 'pipeline.sh',
      code: { arg: 'Implementa spec.yaml' },
    },
    principles: {
      tag: '// Principios',
      title: 'Construido sobre convicciones',
      items: [
        { number: '01', title: 'CLI-first', description: 'Si no cabe en un script, no sirve para CI/CD.' },
        { number: '02', title: 'Determinismo', description: 'El LLM no puede saltarse tests ni quality gates.' },
        { number: '03', title: 'Zero lock-in', description: 'Cambia de modelo sin tocar tu pipeline.' },
        { number: '04', title: 'Open source', description: 'Codigo auditable que gobierna tu codigo.' },
        { number: '05', title: 'Headless-first', description: 'Funciona a las 3am sin supervision.' },
        { number: '06', title: 'Complementa', description: 'Cubrimos gaps que otros no ven.' },
      ],
    },
    cta: {
      title: 'Tu pipeline de IA, bajo control',
      subtitle: 'Instala y ejecuta tu primer pipeline con garantias.',
      btn: 'Documentacion',
    },
    footer: { text: '\u00A9 2026 OSS Ecosystem. Creado con claude code' },
  },

  en: {
    nav: { cta: 'Get Started' },
    hero: {
      tag: 'Open Source \u00B7 CLI-First \u00B7 Backend-Agnostic',
      titleStart: 'From chaotic requirements to ',
      titleAccent: 'verified code',
      subtitle:
        'Three CLI tools. One pipeline covering the entire chain \u2014 from idea to secure code in production.',
      cta: 'Explore tools',
    },
    journey: {
      intake: {
        phase: 'Phase 01',
        tag: 'Capture and normalize',
        description:
          'From Jira, PDFs, Slack or a sentence \u2014 to an executable YAML spec for any agent.',
      },
      architect: {
        phase: 'Phase 02',
        tag: 'Implement with control',
        description:
          'AI agents with deterministic guardrails, budget limits, and audit trail. Backend-agnostic.',
      },
      vigil: {
        phase: 'Phase 03',
        tag: 'Verify and protect',
        description:
          'Detects AI-code vulnerabilities: hallucinations, slopsquatting, over-permissions.',
      },
    },
    intake: {
      phase: '\u25FB Phase 01 \u2014 Preparation',
      subtitle: 'From chaotic requirements to executable spec',
      p1: 'Capture from Jira, PDFs, Confluence, Slack, or natural language. Normalize, deduplicate, detect conflicts, generate YAML spec.',
      p2: 'Does not generate code. It is preparation infrastructure.',
      features: [
        'Multi-source: Jira, PDFs, Slack, images',
        'Deduplication and conflict detection',
        'Universal YAML output',
        'Full traceability',
      ],
      docBtn: 'Go to documentation',
      codeTitle: 'Terminal \u2014 intake collect',
      code: {
        comment: '# Capture from multiple sources',
        output1: '  \u25FB 14 requirements \u00B7 2 conflicts',
        output2: '  \u25FB Spec \u2192 .intake/spec.yaml',
      },
    },
    architect: {
      phase: '\u25B3 Phase 02 \u2014 Implementation',
      subtitle: 'Deterministic control for code agents',
      p1: 'Guardrails the LLM cannot bypass. Backend-agnostic. Switch models without changing your pipelines.',
      features: [
        'Ralph Loop: iteration with verification',
        'Protected files, budget limits',
        '100+ providers, zero lock-in',
        'Native OWASP, OpenTelemetry',
      ],
      docBtn: 'Go to documentation',
      codeTitle: 'Figure 03 \u2014 architect loop',
      code: {
        arg: 'Payments module',
        output1: '  \u25B3 Loop 3/10',
        output2: '  \u2713 18/18 passed \u00B7 $0.089',
      },
    },
    vigil: {
      phase: '\u25C7 Phase 03 \u2014 Verification',
      subtitle: 'Security scanner for AI code',
      p1: 'Detects hallucinated dependencies, slopsquatting, over-permissions, empty tests. Deterministic, no LLMs.',
      features: [
        'Ghost dependencies in registries',
        'Typosquatting and slopsquatting',
        'Tests: empty asserts, fake coverage',
        'Quality gate for CI/CD',
      ],
      docBtn: 'Go to documentation',
      codeTitle: 'Terminal \u2014 vigil scan',
      code: {
        output1: '  \u25C7 47 files...',
        error1: '  \u2717 DEP-001 flask-helper (hallucinated)',
        error2: '  \u2717 SEC-003 CORS disabled',
        ok: '  \u2713 45/47 clean',
      },
    },
    pipeline: {
      tag: '// Full Pipeline',
      title: 'Three commands. Zero supervision.',
      subtitle: 'From ticket to verified PR. Headless, auditable.',
      codeTitle: 'pipeline.sh',
      code: { arg: 'Implement spec.yaml' },
    },
    principles: {
      tag: '// Principles',
      title: 'Built on convictions',
      items: [
        { number: '01', title: 'CLI-first', description: "If it doesn't fit in a script, it doesn't work for CI/CD." },
        { number: '02', title: 'Determinism', description: 'The LLM cannot skip tests or quality gates.' },
        { number: '03', title: 'Zero lock-in', description: 'Switch models without touching your pipeline.' },
        { number: '04', title: 'Open source', description: 'Auditable code that governs your code.' },
        { number: '05', title: 'Headless-first', description: 'Works at 3am without supervision.' },
        { number: '06', title: 'Complements', description: "We cover gaps others don't see." },
      ],
    },
    cta: {
      title: 'Your AI pipeline, under control',
      subtitle: 'Install and run your first pipeline with guarantees.',
      btn: 'Documentation',
    },
    footer: { text: '\u00A9 2026 OSS Ecosystem. Built with claude code' },
  },
};

export function getTranslations(lang: Lang) {
  return translations[lang];
}
