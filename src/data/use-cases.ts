export type Tool = 'intake' | 'architect' | 'vigil' | 'licit';
export type LicitPriority = 'critical' | 'high' | 'medium' | 'low';
export type Category = 'regulated' | 'devops';

export interface UseCasePhase {
  tool: Tool;
  title: string;
  description: string;
  code: string;
}

export interface UseCaseLang {
  title: string;
  shortDescription: string;
  context: string;
  phases: UseCasePhase[];
  whyLicit?: string;
  cicd?: { title: string; code: string };
}

export interface UseCase {
  id: string;
  number: number;
  category: Category;
  sector: { es: string; en: string };
  tools: { intake: number; architect: number; vigil: number; licit: number };
  licitPriority: LicitPriority;
  diagramFile?: string;
  es: UseCaseLang;
  en: UseCaseLang;
}

export const useCases: UseCase[] = [
  {
    id: 'fintech-payment-gateway',
    number: 1,
    category: 'regulated',
    sector: { es: 'FINTECH', en: 'FINTECH' },
    tools: { intake: 3, architect: 3, vigil: 3, licit: 3 },
    licitPriority: 'critical',
    diagramFile: 'diagram-02-fintech-payment-gateway.html',
    es: {
      title: 'FinTech — Gateway de Pagos PSD2/PCI-DSS',
      shortDescription: 'Entidad financiera europea implementa un gateway de pagos cumpliendo PSD2 y PCI-DSS nivel 1.',
      context: 'Una entidad financiera europea implementa un gateway de pagos que cumple PSD2 (Strong Customer Authentication) y PCI-DSS nivel 1. Requisitos llegan de cuatro departamentos: regulatorio (PDF legal), producto (Jira), seguridad (Confluence), y arquitectura (Google Docs). Al operar en la UE, el EU AI Act exige documentar el uso de IA en el desarrollo.',
      phases: [
        { tool: 'intake', title: 'Normalizacion de requisitos regulatorios', description: 'Captura desde Jira, Confluence, PDFs legales y Google Docs. Detecta 47 requisitos funcionales deduplicados de 83, 12 no funcionales, 6 conflictos entre fuentes.', code: `intake init "Payment Gateway PSD2" \\
  --source jira://PAYMENTS/sprint-42 \\
  --source confluence://arch/payment-rfc \\
  --source docs/psd2-regulation-v3.pdf \\
  --source gdocs://1a2b3c4d/meeting-notes-payments \\
  --mode enterprise` },
        { tool: 'architect', title: 'Implementacion con guardrails financieros', description: 'Pipeline con archivos protegidos, quality gates de vigil y licit, y reglas de codigo que bloquean verify=False por PCI-DSS.', code: `architect pipeline pipelines/payment-feature.yaml \\
  --var task="SCA Authentication Service" \\
  --var spec_dir="specs/payment-gateway/"` },
        { tool: 'vigil', title: 'Verificacion de seguridad financiera', description: 'Verifica dependencias crypto, JWT lifetime, algoritmos de cifrado y asserts reales en tests de pago.', code: `vigil scan src/services/payment/ --format sarif --output vigil-payment.sarif` },
        { tool: 'licit', title: 'Compliance regulatorio y provenance', description: 'Inicializa tracking de provenance, genera FRIA, Annex IV, y evalua compliance EU AI Act y OWASP Agentic.', code: `licit init
licit trace --since "2024-01-01"
licit fria
licit annex-iv
licit report --format markdown
licit verify --min-score 75` },
      ],
      whyLicit: 'En fintech europeo, el EU AI Act exige documentar el uso de IA en sistemas de alto riesgo. Un gateway de pagos que usa agentes de IA para generar codigo necesita: provenance tracking, FRIA, Annex IV, y evaluacion OWASP. Sin licit, este compliance requeriria semanas de trabajo manual por auditoria.',
      cicd: { title: '.github/workflows/payment-pipeline.yml', code: `name: Payment Gateway CI/CD
on:
  pull_request:
    paths: ['src/services/payment/**']
jobs:
  spec-compliance:
    steps:
      - run: intake verify specs/payment-gateway/ --project-dir . --format junit
  security-scan:
    steps:
      - run: vigil scan src/services/payment/ --format sarif --output vigil.sarif
  regulatory-compliance:
    needs: [security-scan]
    steps:
      - run: |
          licit trace
          licit connect vigil --sarif vigil.sarif
          licit verify --min-score 75` },
    },
    en: {
      title: 'FinTech — PSD2/PCI-DSS Payment Gateway',
      shortDescription: 'European financial entity implements a payment gateway compliant with PSD2 and PCI-DSS level 1.',
      context: 'A European financial entity implements a payment gateway compliant with PSD2 (Strong Customer Authentication) and PCI-DSS level 1. Requirements come from four departments: regulatory (legal PDFs), product (Jira), security (Confluence), and architecture (Google Docs). Operating in the EU, the EU AI Act requires documenting AI usage in development.',
      phases: [
        { tool: 'intake', title: 'Regulatory requirements normalization', description: 'Captures from Jira, Confluence, legal PDFs and Google Docs. Detects 47 functional requirements deduplicated from 83, 12 non-functional, 6 conflicts between sources.', code: `intake init "Payment Gateway PSD2" \\
  --source jira://PAYMENTS/sprint-42 \\
  --source confluence://arch/payment-rfc \\
  --source docs/psd2-regulation-v3.pdf \\
  --source gdocs://1a2b3c4d/meeting-notes-payments \\
  --mode enterprise` },
        { tool: 'architect', title: 'Implementation with financial guardrails', description: 'Pipeline with protected files, vigil and licit quality gates, and code rules blocking verify=False for PCI-DSS.', code: `architect pipeline pipelines/payment-feature.yaml \\
  --var task="SCA Authentication Service" \\
  --var spec_dir="specs/payment-gateway/"` },
        { tool: 'vigil', title: 'Financial security verification', description: 'Verifies crypto dependencies, JWT lifetime, encryption algorithms, and real asserts in payment tests.', code: `vigil scan src/services/payment/ --format sarif --output vigil-payment.sarif` },
        { tool: 'licit', title: 'Regulatory compliance and provenance', description: 'Initializes provenance tracking, generates FRIA, Annex IV, and evaluates EU AI Act and OWASP Agentic compliance.', code: `licit init
licit trace --since "2024-01-01"
licit fria
licit annex-iv
licit report --format markdown
licit verify --min-score 75` },
      ],
      whyLicit: 'In European fintech, the EU AI Act requires documenting AI usage in high-risk systems. A payment gateway using AI agents to generate code needs: provenance tracking, FRIA, Annex IV, and OWASP evaluation. Without licit, this compliance would require weeks of manual work per audit.',
      cicd: { title: '.github/workflows/payment-pipeline.yml', code: `name: Payment Gateway CI/CD
on:
  pull_request:
    paths: ['src/services/payment/**']
jobs:
  spec-compliance:
    steps:
      - run: intake verify specs/payment-gateway/ --project-dir . --format junit
  security-scan:
    steps:
      - run: vigil scan src/services/payment/ --format sarif --output vigil.sarif
  regulatory-compliance:
    needs: [security-scan]
    steps:
      - run: |
          licit trace
          licit connect vigil --sarif vigil.sarif
          licit verify --min-score 75` },
    },
  },
  {
    id: 'ecommerce-microservices',
    number: 2,
    category: 'regulated',
    sector: { es: 'E-COMMERCE', en: 'E-COMMERCE' },
    tools: { intake: 3, architect: 3, vigil: 2, licit: 2 },
    licitPriority: 'high',
    diagramFile: 'diagram-03-ecommerce-microservices.html',
    es: {
      title: 'E-commerce — Migracion de Monolito a Microservicios',
      shortDescription: 'Marketplace con monolito Django de 200K lineas extrae servicios progresivamente con 60% de codigo generado por IA.',
      context: 'Un marketplace con un monolito Django de 200K lineas extrae servicios progresivamente. El 60% del codigo nuevo lo generan agentes de IA. El equipo necesita rastrear que microservicios fueron generados por IA para compliance y responsabilidad.',
      phases: [
        { tool: 'intake', title: 'Spec por bounded context', description: 'Genera especificaciones separadas por bounded context desde Jira y codigo fuente existente.', code: `intake init "Extract Users Service" \\
  --source jira://SHOP/label:users-extraction \\
  --source src/monolith/apps/users/ \\
  --format architect` },
        { tool: 'architect', title: 'Implementacion en paralelo', description: 'Extrae multiples servicios simultaneamente con agentes trabajando en paralelo.', code: `architect parallel \\
  --task "Extrae Users Service segun spec/" \\
  --task "Extrae Catalog Service segun spec/" \\
  --task "Implementa API Gateway con Traefik"` },
        { tool: 'vigil', title: 'Verificacion por servicio', description: 'Escanea cada servicio independientemente y genera reportes SARIF consolidados.', code: `for svc in services/*/; do
  vigil scan "$svc" --format sarif --output "reports/vigil-$(basename $svc).sarif"
done` },
        { tool: 'licit', title: 'Provenance tracking de la migracion', description: 'Rastrea que microservicios fueron generados por IA y genera changelog de configuraciones de agentes.', code: `licit trace --since "2024-06-01"
licit changelog
licit report --format html --output reports/migration-compliance.html
licit verify --min-score 70` },
      ],
      whyLicit: 'Durante una migracion masiva donde agentes de IA generan el 60% del codigo nuevo, licit rastrea exactamente que servicios tienen codigo AI-generated, que modelos se usaron, y si los guardrails fueron modificados durante el proceso.',
    },
    en: {
      title: 'E-commerce — Monolith to Microservices Migration',
      shortDescription: 'Marketplace with a 200K-line Django monolith progressively extracts services with 60% AI-generated code.',
      context: 'A marketplace with a 200K-line Django monolith progressively extracts services. 60% of new code is generated by AI agents. The team needs to track which microservices were AI-generated for compliance and accountability.',
      phases: [
        { tool: 'intake', title: 'Spec per bounded context', description: 'Generates separate specs per bounded context from Jira and existing source code.', code: `intake init "Extract Users Service" \\
  --source jira://SHOP/label:users-extraction \\
  --source src/monolith/apps/users/ \\
  --format architect` },
        { tool: 'architect', title: 'Parallel implementation', description: 'Extracts multiple services simultaneously with agents working in parallel.', code: `architect parallel \\
  --task "Extract Users Service per spec/" \\
  --task "Extract Catalog Service per spec/" \\
  --task "Implement API Gateway with Traefik"` },
        { tool: 'vigil', title: 'Per-service verification', description: 'Scans each service independently and generates consolidated SARIF reports.', code: `for svc in services/*/; do
  vigil scan "$svc" --format sarif --output "reports/vigil-$(basename $svc).sarif"
done` },
        { tool: 'licit', title: 'Migration provenance tracking', description: 'Tracks which microservices were AI-generated and generates agent configuration changelog.', code: `licit trace --since "2024-06-01"
licit changelog
licit report --format html --output reports/migration-compliance.html
licit verify --min-score 70` },
      ],
      whyLicit: 'During a massive migration where AI agents generate 60% of new code, licit tracks exactly which services have AI-generated code, which models were used, and whether guardrails were modified during the process.',
    },
  },
  {
    id: 'healthtech-hipaa',
    number: 3,
    category: 'regulated',
    sector: { es: 'HEALTHTECH', en: 'HEALTHTECH' },
    tools: { intake: 3, architect: 3, vigil: 3, licit: 3 },
    licitPriority: 'critical',
    diagramFile: 'diagram-04-healthtech-hipaa.html',
    es: {
      title: 'HealthTech — API Clinica HIPAA-Compliant',
      shortDescription: 'API de historiales clinicos electronicos que cumple HIPAA y EU AI Act como sistema de alto riesgo.',
      context: 'API de historiales clinicos electronicos (EHR) que debe cumplir HIPAA. Requisitos de equipo medico (PDFs clinicos), legal (HIPAA doc), integradores (OpenAPI parcial), y UX (wireframes Figma). El EU AI Act tambien aplica si se comercializa en la UE como sistema de alto riesgo.',
      phases: [
        { tool: 'intake', title: 'Requisitos clinicos y legales', description: 'Procesa requisitos clinicos, legales, OpenAPI parcial y wireframes de Figma.', code: `intake init "EHR API Platform" \\
  --source docs/hipaa-compliance-requirements.pdf \\
  --source docs/clinical-workflows.pdf \\
  --source api/openapi-partial.yaml \\
  --source designs/patient-flow.png \\
  --mode enterprise` },
        { tool: 'architect', title: 'Implementacion con guardrails HIPAA', description: 'Implementa recursos FHIR con guardrails estrictos para datos de salud.', code: `architect pipeline pipelines/fhir-resource.yaml \\
  --var resource="Patient" \\
  --var spec_dir="specs/ehr-api/"` },
        { tool: 'vigil', title: 'PHI y seguridad medica', description: 'Verifica connection strings, algoritmos crypto, logging de PHI y autenticacion en endpoints.', code: `vigil scan src/ --format sarif --output vigil-ehr.sarif` },
        { tool: 'licit', title: 'Compliance para software medico con IA', description: 'FRIA para sistema de alto riesgo medico, Annex IV, evaluacion OWASP Agentic para acceso a datos de pacientes.', code: `licit init && licit trace
licit fria
licit annex-iv
licit connect vigil --sarif vigil-ehr.sarif
licit report --format markdown
licit verify --min-score 80 --framework eu-ai-act` },
      ],
      whyLicit: 'Software medico es sistema de alto riesgo bajo el EU AI Act. licit genera la FRIA documentando el impacto en el derecho a la salud. El provenance tracking identifica que endpoints que manejan PHI fueron generados por IA, critico para auditorias HIPAA.',
    },
    en: {
      title: 'HealthTech — HIPAA-Compliant Clinical API',
      shortDescription: 'Electronic health records API compliant with HIPAA and EU AI Act as a high-risk system.',
      context: 'Electronic health records (EHR) API that must comply with HIPAA. Requirements from medical staff (clinical PDFs), legal (HIPAA doc), integrators (partial OpenAPI), and UX (Figma wireframes). The EU AI Act also applies if marketed in the EU as a high-risk system.',
      phases: [
        { tool: 'intake', title: 'Clinical and legal requirements', description: 'Processes clinical, legal requirements, partial OpenAPI, and Figma wireframes.', code: `intake init "EHR API Platform" \\
  --source docs/hipaa-compliance-requirements.pdf \\
  --source docs/clinical-workflows.pdf \\
  --source api/openapi-partial.yaml \\
  --source designs/patient-flow.png \\
  --mode enterprise` },
        { tool: 'architect', title: 'Implementation with HIPAA guardrails', description: 'Implements FHIR resources with strict guardrails for health data.', code: `architect pipeline pipelines/fhir-resource.yaml \\
  --var resource="Patient" \\
  --var spec_dir="specs/ehr-api/"` },
        { tool: 'vigil', title: 'PHI and medical security', description: 'Verifies connection strings, crypto algorithms, PHI logging, and endpoint authentication.', code: `vigil scan src/ --format sarif --output vigil-ehr.sarif` },
        { tool: 'licit', title: 'Compliance for AI-powered medical software', description: 'FRIA for high-risk medical system, Annex IV, OWASP Agentic evaluation for patient data access.', code: `licit init && licit trace
licit fria
licit annex-iv
licit connect vigil --sarif vigil-ehr.sarif
licit report --format markdown
licit verify --min-score 80 --framework eu-ai-act` },
      ],
      whyLicit: 'Medical software is a high-risk system under the EU AI Act. licit generates the FRIA documenting the impact on the right to health. Provenance tracking identifies which PHI-handling endpoints were AI-generated, critical for HIPAA audits.',
    },
  },
  {
    id: 'saas-multitenant',
    number: 4,
    category: 'regulated',
    sector: { es: 'SAAS', en: 'SAAS' },
    tools: { intake: 3, architect: 3, vigil: 3, licit: 3 },
    licitPriority: 'high',
    diagramFile: 'diagram-05-saas-multitenant.html',
    es: {
      title: 'SaaS B2B — Plataforma Multi-Tenant con CI/CD',
      shortDescription: 'Plataforma SaaS multi-tenant con pipeline CI/CD automatizado end-to-end usando las 4 herramientas.',
      context: 'Plataforma SaaS B2B multi-tenant con Next.js, FastAPI, PostgreSQL multi-schema, y Celery. Los clientes enterprise europeos exigen evidencia de AI governance antes de firmar contratos.',
      phases: [
        { tool: 'intake', title: 'Normalizacion del sprint', description: 'Normaliza tickets de Linear y RFCs de Notion en specs ejecutables.', code: `intake init "Sprint 42 — Advanced Reporting" \\
  --source linear://team-platform/sprint-42 \\
  --source notion://arch/reporting-rfc \\
  --format architect` },
        { tool: 'architect', title: 'Implementacion automatizada', description: 'Loop con quality gates de tests, vigil y licit integrados.', code: `architect loop "Implementa segun spec" \\
  --check "pytest tests/ -q" \\
  --check "vigil scan src/ --severity high" \\
  --check "licit verify --min-score 70" \\
  --max-iterations 25` },
        { tool: 'licit', title: 'Compliance para clientes EU', description: 'Genera documentacion de AI governance que el equipo de ventas necesita para RFPs.', code: `licit trace
licit changelog
licit report --format json --output compliance/sprint-42.json
licit annex-iv
licit gaps --format markdown > compliance/gaps-sprint-42.md` },
      ],
      whyLicit: 'Los clientes enterprise europeos exigen evidencia de AI governance antes de firmar contratos. licit genera automaticamente la documentacion que el equipo de ventas necesita: que % del codigo es AI-generated, que marcos regulatorios se cumplen.',
    },
    en: {
      title: 'SaaS B2B — Multi-Tenant Platform with CI/CD',
      shortDescription: 'Multi-tenant SaaS platform with automated end-to-end CI/CD pipeline using all 4 tools.',
      context: 'B2B multi-tenant SaaS platform with Next.js, FastAPI, PostgreSQL multi-schema, and Celery. European enterprise clients require AI governance evidence before signing contracts.',
      phases: [
        { tool: 'intake', title: 'Sprint normalization', description: 'Normalizes Linear tickets and Notion RFCs into executable specs.', code: `intake init "Sprint 42 — Advanced Reporting" \\
  --source linear://team-platform/sprint-42 \\
  --source notion://arch/reporting-rfc \\
  --format architect` },
        { tool: 'architect', title: 'Automated implementation', description: 'Loop with integrated test, vigil, and licit quality gates.', code: `architect loop "Implement per spec" \\
  --check "pytest tests/ -q" \\
  --check "vigil scan src/ --severity high" \\
  --check "licit verify --min-score 70" \\
  --max-iterations 25` },
        { tool: 'licit', title: 'Compliance for EU clients', description: 'Generates AI governance documentation the sales team needs for RFPs.', code: `licit trace
licit changelog
licit report --format json --output compliance/sprint-42.json
licit annex-iv
licit gaps --format markdown > compliance/gaps-sprint-42.md` },
      ],
      whyLicit: 'European enterprise clients require AI governance evidence before signing contracts. licit automatically generates the documentation the sales team needs: what % of code is AI-generated, which regulatory frameworks are met.',
    },
  },
  {
    id: 'platform-engineering-iac',
    number: 5,
    category: 'regulated',
    sector: { es: 'PLATFORM', en: 'PLATFORM' },
    tools: { intake: 3, architect: 3, vigil: 2, licit: 2 },
    licitPriority: 'high',
    diagramFile: 'diagram-06-platform-engineering-iac.html',
    es: {
      title: 'Platform Engineering — IaC con Terraform y Kubernetes',
      shortDescription: 'Infraestructura como codigo con agentes especializados en Terraform, verificada y con provenance tracking.',
      context: 'Equipo de plataforma que gestiona infraestructura como codigo con Terraform y Kubernetes via ArgoCD GitOps. Los auditores SOC 2 preguntan quien autorizo cada IAM policy.',
      phases: [
        { tool: 'intake', title: 'Spec de IaC', description: 'Normaliza requisitos de infra desde Jira, Slack y RFCs.', code: `intake init "New RDS Aurora Cluster" \\
  --source jira://PLATFORM/PLAT-892 \\
  --source slack://platform-team/thread-rds \\
  --source docs/rfc-aurora-migration.md \\
  --format architect` },
        { tool: 'architect', title: 'Agentes custom para infra', description: 'Loop con agente terraform especializado y validaciones de infra.', code: `architect loop "Crea modulo Terraform para Aurora segun spec" \\
  --agent terraform \\
  --check "terraform -chdir=modules/aurora validate" \\
  --check "tflint --chdir=modules/aurora" \\
  --check "vigil scan modules/aurora/" \\
  --max-iterations 15` },
        { tool: 'vigil', title: 'Seguridad de infraestructura', description: 'Escanea modulos de infraestructura en busca de vulnerabilidades.', code: `vigil scan modules/ --format sarif --output vigil-infra.sarif` },
        { tool: 'licit', title: 'Provenance de IaC generada por IA', description: 'Documenta que modulos Terraform fueron generados por agentes para auditorias SOC 2.', code: `licit trace
licit connect vigil --sarif vigil-infra.sarif
licit report --format markdown
licit changelog` },
      ],
      whyLicit: 'En SOC 2, los auditores preguntan quien autorizo esta IAM policy. Si la genero un agente de IA, licit lo documenta con provenance tracking. El changelog de configs detecta si alguien cambio el system prompt del agente terraform.',
    },
    en: {
      title: 'Platform Engineering — IaC with Terraform and Kubernetes',
      shortDescription: 'Infrastructure as code with specialized Terraform agents, verified and with provenance tracking.',
      context: 'Platform team managing infrastructure as code with Terraform and Kubernetes via ArgoCD GitOps. SOC 2 auditors ask who authorized each IAM policy.',
      phases: [
        { tool: 'intake', title: 'IaC spec', description: 'Normalizes infra requirements from Jira, Slack, and RFCs.', code: `intake init "New RDS Aurora Cluster" \\
  --source jira://PLATFORM/PLAT-892 \\
  --source slack://platform-team/thread-rds \\
  --source docs/rfc-aurora-migration.md \\
  --format architect` },
        { tool: 'architect', title: 'Custom infra agents', description: 'Loop with specialized terraform agent and infra validations.', code: `architect loop "Create Terraform module for Aurora per spec" \\
  --agent terraform \\
  --check "terraform -chdir=modules/aurora validate" \\
  --check "tflint --chdir=modules/aurora" \\
  --check "vigil scan modules/aurora/" \\
  --max-iterations 15` },
        { tool: 'vigil', title: 'Infrastructure security', description: 'Scans infrastructure modules for vulnerabilities.', code: `vigil scan modules/ --format sarif --output vigil-infra.sarif` },
        { tool: 'licit', title: 'AI-generated IaC provenance', description: 'Documents which Terraform modules were generated by agents for SOC 2 audits.', code: `licit trace
licit connect vigil --sarif vigil-infra.sarif
licit report --format markdown
licit changelog` },
      ],
      whyLicit: 'In SOC 2, auditors ask who authorized this IAM policy. If an AI agent generated it, licit documents it with provenance tracking. The config changelog detects if someone changed the terraform agent system prompt.',
    },
  },
  {
    id: 'mlops-pipeline',
    number: 6,
    category: 'regulated',
    sector: { es: 'MLOPS', en: 'MLOPS' },
    tools: { intake: 3, architect: 3, vigil: 2, licit: 3 },
    licitPriority: 'critical',
    diagramFile: 'diagram-07-mlops-pipeline.html',
    es: {
      title: 'Data Engineering / MLOps — Pipeline de ML en Produccion',
      shortDescription: 'Pipeline de ML con modelo de deteccion de fraude, sistema de alto riesgo bajo el EU AI Act.',
      context: 'Pipeline de ML para deteccion de fraude con Feature Store (Feast), Training Pipeline (Airflow), Model Registry (MLflow) y Serving (FastAPI). El EU AI Act aplica directamente a modelos de IA en produccion.',
      phases: [
        { tool: 'intake', title: 'De notebooks a specs', description: 'Convierte notebooks de investigacion y RFCs de MLOps en especificaciones ejecutables.', code: `intake init "Fraud Detection Model to Production" \\
  --source notebooks/fraud_detection_v3.ipynb \\
  --source docs/mlops-infrastructure-rfc.md \\
  --source gdocs://ml-team/fraud-model-kpis \\
  --mode enterprise` },
        { tool: 'architect', title: 'Implementar stack MLOps', description: 'Pipeline automatizado para llevar el modelo a produccion.', code: `architect pipeline pipelines/ml-to-production.yaml \\
  --var model="fraud_detection"` },
        { tool: 'licit', title: 'EU AI Act para ML', description: 'FRIA obligatorio para modelo de deteccion de fraude. Annex IV con arquitectura del modelo, datos de entrenamiento y metricas.', code: `licit init && licit trace
licit fria
licit annex-iv
licit report --format html
licit verify --min-score 80` },
      ],
      whyLicit: 'Un modelo de deteccion de fraude es un sistema de IA de alto riesgo bajo el EU AI Act. licit evalua los 11 articulos relevantes, genera la FRIA que documenta el impacto en derechos financieros, y produce el Annex IV obligatorio.',
    },
    en: {
      title: 'Data Engineering / MLOps — ML Pipeline in Production',
      shortDescription: 'ML pipeline with fraud detection model, a high-risk system under the EU AI Act.',
      context: 'ML pipeline for fraud detection with Feature Store (Feast), Training Pipeline (Airflow), Model Registry (MLflow), and Serving (FastAPI). The EU AI Act directly applies to AI models in production.',
      phases: [
        { tool: 'intake', title: 'From notebooks to specs', description: 'Converts research notebooks and MLOps RFCs into executable specifications.', code: `intake init "Fraud Detection Model to Production" \\
  --source notebooks/fraud_detection_v3.ipynb \\
  --source docs/mlops-infrastructure-rfc.md \\
  --source gdocs://ml-team/fraud-model-kpis \\
  --mode enterprise` },
        { tool: 'architect', title: 'Implement MLOps stack', description: 'Automated pipeline to bring the model to production.', code: `architect pipeline pipelines/ml-to-production.yaml \\
  --var model="fraud_detection"` },
        { tool: 'licit', title: 'EU AI Act for ML', description: 'Mandatory FRIA for fraud detection model. Annex IV with model architecture, training data, and metrics.', code: `licit init && licit trace
licit fria
licit annex-iv
licit report --format html
licit verify --min-score 80` },
      ],
      whyLicit: 'A fraud detection model is a high-risk AI system under the EU AI Act. licit evaluates the 11 relevant articles, generates the FRIA documenting the impact on financial rights, and produces the mandatory Annex IV.',
    },
  },
  {
    id: 'cybersecurity-soar',
    number: 7,
    category: 'regulated',
    sector: { es: 'CIBERSEGURIDAD', en: 'CYBERSECURITY' },
    tools: { intake: 3, architect: 2, vigil: 3, licit: 3 },
    licitPriority: 'critical',
    diagramFile: 'diagram-08-cybersecurity-soar.html',
    es: {
      title: 'Ciberseguridad — SOAR y Respuesta a Incidentes',
      shortDescription: 'Plataforma SOAR con agentes de IA para automatizar playbooks de respuesta a incidentes de seguridad.',
      context: 'Plataforma SOAR con ingestion de alertas via Kafka, motor de playbooks, orquestador de respuesta, y integraciones con Crowdstrike/PAN/Jira. Un SOAR que usa agentes de IA es doblemente sensible.',
      phases: [
        { tool: 'intake', title: 'Playbooks narrativos a specs', description: 'Convierte playbooks de Confluence y politicas de respuesta a incidentes en specs ejecutables.', code: `intake init "SOAR Phishing Playbook" \\
  --source confluence://soc/playbook-phishing-v4 \\
  --source docs/incident-response-policy.docx \\
  --mode enterprise` },
        { tool: 'architect', title: 'Implementacion con guardrails estrictos', description: 'Loop con tests de playbook y verificacion de seguridad AUTH/SEC.', code: `architect loop "Implementa playbook de phishing segun spec" \\
  --check "pytest tests/playbooks/test_phishing.py -q" \\
  --check "vigil scan src/playbooks/ --category AUTH,SEC" \\
  --max-iterations 20` },
        { tool: 'licit', title: 'OWASP Agentic para SOAR', description: 'Evalua los 10 riesgos OWASP Agentic especialmente relevantes: prompt injection, tool misuse, data exfiltration, cascading failures.', code: `licit init && licit trace
licit connect vigil --sarif vigil-soar.sarif
licit report --format markdown
licit gaps` },
      ],
      whyLicit: 'Un SOAR que usa agentes de IA es doblemente sensible: maneja las credenciales mas criticas de la organizacion Y usa agentes autonomos que ejecutan respuestas. licit evalua el OWASP Agentic Top 10 que cubre exactamente estos riesgos.',
    },
    en: {
      title: 'Cybersecurity — SOAR and Incident Response',
      shortDescription: 'SOAR platform with AI agents to automate security incident response playbooks.',
      context: 'SOAR platform with alert ingestion via Kafka, playbook engine, response orchestrator, and integrations with Crowdstrike/PAN/Jira. A SOAR using AI agents is doubly sensitive.',
      phases: [
        { tool: 'intake', title: 'Narrative playbooks to specs', description: 'Converts Confluence playbooks and incident response policies into executable specs.', code: `intake init "SOAR Phishing Playbook" \\
  --source confluence://soc/playbook-phishing-v4 \\
  --source docs/incident-response-policy.docx \\
  --mode enterprise` },
        { tool: 'architect', title: 'Implementation with strict guardrails', description: 'Loop with playbook tests and AUTH/SEC security verification.', code: `architect loop "Implement phishing playbook per spec" \\
  --check "pytest tests/playbooks/test_phishing.py -q" \\
  --check "vigil scan src/playbooks/ --category AUTH,SEC" \\
  --max-iterations 20` },
        { tool: 'licit', title: 'OWASP Agentic for SOAR', description: 'Evaluates the 10 OWASP Agentic risks especially relevant: prompt injection, tool misuse, data exfiltration, cascading failures.', code: `licit init && licit trace
licit connect vigil --sarif vigil-soar.sarif
licit report --format markdown
licit gaps` },
      ],
      whyLicit: 'A SOAR using AI agents is doubly sensitive: it handles the most critical credentials in the organization AND uses autonomous agents that execute responses. licit evaluates the OWASP Agentic Top 10 covering exactly these risks.',
    },
  },
  {
    id: 'iot-fleet-management',
    number: 8,
    category: 'regulated',
    sector: { es: 'IOT', en: 'IOT' },
    tools: { intake: 3, architect: 2, vigil: 2, licit: 2 },
    licitPriority: 'high',
    es: {
      title: 'IoT / Edge Computing — Gestion de Flota de Dispositivos',
      shortDescription: 'Pipeline de telemetria IoT con gateway MQTT, consumer Kafka y API de gestion de dispositivos.',
      context: 'Sistema IoT con gateway MQTT, consumer Kafka a TimescaleDB, y API de gestion de dispositivos. Los datos de localizacion de vehiculos requieren cumplimiento regulatorio en la UE.',
      phases: [
        { tool: 'intake', title: 'Requisitos firmware + cloud', description: 'Normaliza requisitos de firmware, cloud y regulacion de telemetria.', code: `intake init "Fleet Telemetry Pipeline" \\
  --source jira://IOT/epic-fleet-v2 \\
  --source docs/firmware-mqtt-rfc.md \\
  --source docs/telemetry-regulation-eu.pdf \\
  --format architect` },
        { tool: 'architect', title: 'Paralelo edge + cloud', description: 'Implementa gateway IoT, consumer Kafka y API de gestion en paralelo.', code: `architect parallel \\
  --task "IoT Gateway en Python (MQTT pub)" \\
  --task "Consumer Kafka -> TimescaleDB" \\
  --task "Device Management API"` },
        { tool: 'licit', title: 'Compliance IoT en la UE', description: 'FRIA para tracking de vehiculos con datos de localizacion.', code: `licit init && licit trace
licit fria
licit annex-iv
licit report --format html
licit verify --min-score 70` },
      ],
    },
    en: {
      title: 'IoT / Edge Computing — Fleet Device Management',
      shortDescription: 'IoT telemetry pipeline with MQTT gateway, Kafka consumer, and device management API.',
      context: 'IoT system with MQTT gateway, Kafka to TimescaleDB consumer, and device management API. Vehicle location data requires regulatory compliance in the EU.',
      phases: [
        { tool: 'intake', title: 'Firmware + cloud requirements', description: 'Normalizes firmware, cloud, and telemetry regulation requirements.', code: `intake init "Fleet Telemetry Pipeline" \\
  --source jira://IOT/epic-fleet-v2 \\
  --source docs/firmware-mqtt-rfc.md \\
  --source docs/telemetry-regulation-eu.pdf \\
  --format architect` },
        { tool: 'architect', title: 'Parallel edge + cloud', description: 'Implements IoT gateway, Kafka consumer, and management API in parallel.', code: `architect parallel \\
  --task "IoT Gateway in Python (MQTT pub)" \\
  --task "Consumer Kafka -> TimescaleDB" \\
  --task "Device Management API"` },
        { tool: 'licit', title: 'IoT compliance in the EU', description: 'FRIA for vehicle tracking with location data.', code: `licit init && licit trace
licit fria
licit annex-iv
licit report --format html
licit verify --min-score 70` },
      ],
    },
  },
  {
    id: 'admin-publica-ens',
    number: 9,
    category: 'regulated',
    sector: { es: 'GOV', en: 'GOV' },
    tools: { intake: 3, architect: 3, vigil: 3, licit: 3 },
    licitPriority: 'critical',
    diagramFile: 'diagram-09-admin-publica-ens.html',
    es: {
      title: 'Administracion Publica — Portal Ciudadano con ENS',
      shortDescription: 'Portal ciudadano con autenticacion Cl@ve, ENS categoria media, EU AI Act y Ley 15/2024 de IA en Espana.',
      context: 'Portal ciudadano con React, Spring API, autenticacion Cl@ve, servicios comunes (Registro, Notificaciones, Sede-e, Firma-e) y PostgreSQL cifrado. La administracion publica espanola esta doblemente regulada: ENS + EU AI Act + Ley 15/2024.',
      phases: [
        { tool: 'intake', title: 'Pliego tecnico 120+ paginas', description: 'Procesa pliego tecnico, requisitos funcionales de Confluence y normativa ENS.', code: `intake init "Portal Ciudadano v2" \\
  --source docs/pliego-tecnico-portal.pdf \\
  --source confluence://ayto/requisitos-funcionales \\
  --source docs/ens-categoria-media.pdf \\
  --mode enterprise` },
        { tool: 'architect', title: 'Spring Boot + React', description: 'Implementa modulos del portal ciudadano con pipeline configurado.', code: `architect pipeline pipelines/portal-ciudadano.yaml \\
  --var module="tramites-electronicos"` },
        { tool: 'vigil', title: 'Compliance ENS', description: 'Verifica cumplimiento de seguridad ENS categoria media.', code: `vigil scan src/ --format sarif --output vigil-portal.sarif` },
        { tool: 'licit', title: 'Compliance sector publico', description: 'FRIA para portal ciudadano con impacto en derechos de acceso a servicios publicos, no discriminacion y proteccion de datos.', code: `licit init && licit trace
licit fria
licit annex-iv
licit connect vigil --sarif vigil-portal.sarif
licit report --format html --output compliance/portal-compliance.html
licit verify --min-score 85` },
      ],
      whyLicit: 'La administracion publica espanola esta doblemente regulada: ENS + EU AI Act + Ley 15/2024 de IA en Espana. Un portal ciudadano que usa IA en su desarrollo es un sistema de alto riesgo que afecta derechos fundamentales.',
    },
    en: {
      title: 'Public Administration — Citizen Portal with ENS',
      shortDescription: 'Citizen portal with Cl@ve authentication, ENS medium category, EU AI Act, and Spanish AI Law 15/2024.',
      context: 'Citizen portal with React, Spring API, Cl@ve authentication, common services (Registry, Notifications, e-Office, e-Signature), and encrypted PostgreSQL. Spanish public administration is doubly regulated: ENS + EU AI Act + AI Law 15/2024.',
      phases: [
        { tool: 'intake', title: '120+ page technical specifications', description: 'Processes technical specs, Confluence functional requirements, and ENS regulations.', code: `intake init "Citizen Portal v2" \\
  --source docs/pliego-tecnico-portal.pdf \\
  --source confluence://ayto/requisitos-funcionales \\
  --source docs/ens-categoria-media.pdf \\
  --mode enterprise` },
        { tool: 'architect', title: 'Spring Boot + React', description: 'Implements citizen portal modules with configured pipeline.', code: `architect pipeline pipelines/portal-ciudadano.yaml \\
  --var module="tramites-electronicos"` },
        { tool: 'vigil', title: 'ENS compliance', description: 'Verifies ENS medium category security compliance.', code: `vigil scan src/ --format sarif --output vigil-portal.sarif` },
        { tool: 'licit', title: 'Public sector compliance', description: 'FRIA for citizen portal with impact on rights to public service access, non-discrimination, and data protection.', code: `licit init && licit trace
licit fria
licit annex-iv
licit connect vigil --sarif vigil-portal.sarif
licit report --format html --output compliance/portal-compliance.html
licit verify --min-score 85` },
      ],
      whyLicit: 'Spanish public administration is doubly regulated: ENS + EU AI Act + AI Law 15/2024. A citizen portal using AI in its development is a high-risk system affecting fundamental rights.',
    },
  },
  {
    id: 'code-review-pr',
    number: 10,
    category: 'devops',
    sector: { es: 'CODE REVIEW', en: 'CODE REVIEW' },
    tools: { intake: 2, architect: 3, vigil: 3, licit: 2 },
    licitPriority: 'medium',
    diagramFile: 'diagram-10-code-review-pr.html',
    es: {
      title: 'Code Review Automatizado en Cada PR',
      shortDescription: 'Pipeline de review automatizado con seguridad, spec compliance, provenance y auto-fix en cada pull request.',
      context: 'Pipeline de CI/CD que ejecuta review automatizado en cada PR: vigil para seguridad, intake para spec compliance, architect para review de logica, y licit para provenance del PR.',
      phases: [
        { tool: 'vigil', title: 'Seguridad AI-code', description: 'Escanea el codigo del PR en busca de vulnerabilidades especificas de codigo generado por IA.', code: `vigil scan src/ --format sarif --output vigil.sarif` },
        { tool: 'intake', title: 'Spec compliance', description: 'Verifica que los cambios cumplen con las especificaciones.', code: `intake verify specs/ --project-dir . --format junit` },
        { tool: 'licit', title: 'Provenance del PR', description: 'Anade comentario al PR con % de codigo AI en los cambios y estado de compliance.', code: `licit trace --since "$(git log --format=%aI -1 origin/main)"
licit connect vigil --sarif vigil.sarif
licit status --format markdown >> pr-comment.md` },
        { tool: 'architect', title: 'Review de logica', description: 'Revisa el PR enfocandose en la logica y sugiere mejoras.', code: `architect run "Revisa este PR" \\
  --agent review \\
  --context-git-diff origin/main \\
  --report github --budget 0.20` },
      ],
    },
    en: {
      title: 'Automated Code Review on Every PR',
      shortDescription: 'Automated review pipeline with security, spec compliance, provenance, and auto-fix on every pull request.',
      context: 'CI/CD pipeline that runs automated review on every PR: vigil for security, intake for spec compliance, architect for logic review, and licit for PR provenance.',
      phases: [
        { tool: 'vigil', title: 'AI-code security', description: 'Scans PR code for vulnerabilities specific to AI-generated code.', code: `vigil scan src/ --format sarif --output vigil.sarif` },
        { tool: 'intake', title: 'Spec compliance', description: 'Verifies changes comply with specifications.', code: `intake verify specs/ --project-dir . --format junit` },
        { tool: 'licit', title: 'PR provenance', description: 'Adds a comment to the PR with % of AI code in changes and compliance status.', code: `licit trace --since "$(git log --format=%aI -1 origin/main)"
licit connect vigil --sarif vigil.sarif
licit status --format markdown >> pr-comment.md` },
        { tool: 'architect', title: 'Logic review', description: 'Reviews the PR focusing on logic and suggests improvements.', code: `architect run "Review this PR" \\
  --agent review \\
  --context-git-diff origin/main \\
  --report github --budget 0.20` },
      ],
    },
  },
  {
    id: 'testing-qa',
    number: 11,
    category: 'devops',
    sector: { es: 'TESTING', en: 'TESTING' },
    tools: { intake: 2, architect: 3, vigil: 3, licit: 1 },
    licitPriority: 'medium',
    diagramFile: 'diagram-11-testing-qa.html',
    es: {
      title: 'Testing y QA — De Cero Cobertura a 80%',
      shortDescription: 'Generacion automatizada de tests con deteccion de test theater y provenance de tests AI-generated.',
      context: 'Proyecto con baja cobertura de tests donde architect genera tests, vigil detecta test theater (tests vacios, asserts falsos), y licit rastrea que tests fueron generados por IA.',
      phases: [
        { tool: 'architect', title: 'Generacion de tests', description: 'Pipeline writer-reviewer para generar tests con verificacion cruzada.', code: `architect pipeline pipelines/test-generation.yaml \\
  --var target_module="src/services/payment/"` },
        { tool: 'vigil', title: 'Deteccion de test theater', description: 'Detecta tests vacios, asserts sin logica real y coverage inflado.', code: `vigil tests --quality tests/ --format json` },
        { tool: 'licit', title: 'Provenance de tests', description: 'Rastrea que tests fueron generados por IA para auditorias.', code: `licit trace
licit report --format json --output qa-compliance.json` },
      ],
    },
    en: {
      title: 'Testing and QA — From Zero Coverage to 80%',
      shortDescription: 'Automated test generation with test theater detection and AI-generated test provenance.',
      context: 'Project with low test coverage where architect generates tests, vigil detects test theater (empty tests, fake asserts), and licit tracks which tests were AI-generated.',
      phases: [
        { tool: 'architect', title: 'Test generation', description: 'Writer-reviewer pipeline for generating tests with cross-verification.', code: `architect pipeline pipelines/test-generation.yaml \\
  --var target_module="src/services/payment/"` },
        { tool: 'vigil', title: 'Test theater detection', description: 'Detects empty tests, asserts without real logic, and inflated coverage.', code: `vigil tests --quality tests/ --format json` },
        { tool: 'licit', title: 'Test provenance', description: 'Tracks which tests were AI-generated for audits.', code: `licit trace
licit report --format json --output qa-compliance.json` },
      ],
    },
  },
  {
    id: 'documentacion-continua',
    number: 12,
    category: 'devops',
    sector: { es: 'DOCS', en: 'DOCS' },
    tools: { intake: 2, architect: 3, vigil: 0, licit: 2 },
    licitPriority: 'medium',
    es: {
      title: 'Documentacion Tecnica Continua',
      shortDescription: 'Generacion y actualizacion automatizada de documentacion tecnica, ADRs y Annex IV regulatorio.',
      context: 'Mantenimiento continuo de documentacion tecnica donde architect genera y actualiza docs post-merge, genera ADRs desde specs, y licit produce documentacion regulatoria automatizada.',
      phases: [
        { tool: 'architect', title: 'Generacion de docs', description: 'Actualiza documentacion tras cada merge y genera ADRs desde specs de intake.', code: `architect run "Actualiza docs/ para reflejar cambios en src/" \\
  --agent docs --budget 0.30` },
        { tool: 'licit', title: 'Documentacion regulatoria', description: 'Changelog de configs de agentes y Annex IV como documentacion tecnica formal.', code: `licit changelog
licit annex-iv` },
      ],
    },
    en: {
      title: 'Continuous Technical Documentation',
      shortDescription: 'Automated generation and updating of technical documentation, ADRs, and regulatory Annex IV.',
      context: 'Continuous maintenance of technical documentation where architect generates and updates docs post-merge, generates ADRs from specs, and licit produces automated regulatory documentation.',
      phases: [
        { tool: 'architect', title: 'Doc generation', description: 'Updates documentation after each merge and generates ADRs from intake specs.', code: `architect run "Update docs/ to reflect changes in src/" \\
  --agent docs --budget 0.30` },
        { tool: 'licit', title: 'Regulatory documentation', description: 'Agent config changelog and Annex IV as formal technical documentation.', code: `licit changelog
licit annex-iv` },
      ],
    },
  },
  {
    id: 'refactoring-legacy',
    number: 13,
    category: 'devops',
    sector: { es: 'REFACTORING', en: 'REFACTORING' },
    tools: { intake: 2, architect: 3, vigil: 3, licit: 2 },
    licitPriority: 'high',
    diagramFile: 'diagram-12-refactoring-legacy.html',
    es: {
      title: 'Refactoring de Legacy Code a Gran Escala',
      shortDescription: 'Migracion masiva de codigo legacy con checkpoints, rollback y provenance del 87% de cambios AI-generated.',
      context: 'Refactoring a gran escala de codigo legacy con preview dry-run, checkpoints cada N iteraciones, y rollback automatico en caso de fallo.',
      phases: [
        { tool: 'architect', title: 'Ejecucion con checkpoints', description: 'Loop con pytest, vigil y mypy como checks, con checkpoints cada 3 iteraciones.', code: `architect loop "Migra src/services/auth/ a async httpx" \\
  --check "pytest tests/ -q" \\
  --check "vigil scan src/" \\
  --check "mypy src/ --strict" \\
  --max-iterations 15 \\
  --checkpoint-every 3` },
        { tool: 'licit', title: 'Documenta el cambio masivo', description: 'Provenance report del refactoring y deteccion de cambios en guardrails.', code: `licit trace
licit changelog` },
      ],
    },
    en: {
      title: 'Large-Scale Legacy Code Refactoring',
      shortDescription: 'Massive legacy code migration with checkpoints, rollback, and provenance of 87% AI-generated changes.',
      context: 'Large-scale legacy code refactoring with dry-run preview, checkpoints every N iterations, and automatic rollback on failure.',
      phases: [
        { tool: 'architect', title: 'Execution with checkpoints', description: 'Loop with pytest, vigil, and mypy as checks, with checkpoints every 3 iterations.', code: `architect loop "Migrate src/services/auth/ to async httpx" \\
  --check "pytest tests/ -q" \\
  --check "vigil scan src/" \\
  --check "mypy src/ --strict" \\
  --max-iterations 15 \\
  --checkpoint-every 3` },
        { tool: 'licit', title: 'Document the massive change', description: 'Refactoring provenance report and guardrail change detection.', code: `licit trace
licit changelog` },
      ],
    },
  },
  {
    id: 'api-first-development',
    number: 14,
    category: 'devops',
    sector: { es: 'API', en: 'API' },
    tools: { intake: 3, architect: 3, vigil: 2, licit: 1 },
    licitPriority: 'low',
    es: {
      title: 'API-First Development — OpenAPI a Produccion',
      shortDescription: 'Implementacion de endpoints desde OpenAPI spec con verificacion automatica via schemathesis.',
      context: 'Desarrollo API-first donde OpenAPI spec es la fuente de verdad. intake normaliza, architect implementa con schemathesis como check, y vigil verifica la seguridad de las rutas.',
      phases: [
        { tool: 'intake', title: 'OpenAPI como spec', description: 'Normaliza OpenAPI spec y tickets de Jira en formato architect.', code: `intake init "User Management API v2" \\
  --source api/openapi-users-v2.yaml \\
  --source jira://API/sprint-12 \\
  --format architect` },
        { tool: 'architect', title: 'Implementacion de endpoints', description: 'Loop con schemathesis y vigil como checks.', code: `architect loop "Implementa endpoints segun OpenAPI spec" \\
  --check "schemathesis run api/openapi-users-v2.yaml --base-url http://localhost:8000" \\
  --check "vigil scan src/routes/" \\
  --max-iterations 20` },
      ],
    },
    en: {
      title: 'API-First Development — OpenAPI to Production',
      shortDescription: 'Endpoint implementation from OpenAPI spec with automatic verification via schemathesis.',
      context: 'API-first development where the OpenAPI spec is the source of truth. intake normalizes, architect implements with schemathesis as check, and vigil verifies route security.',
      phases: [
        { tool: 'intake', title: 'OpenAPI as spec', description: 'Normalizes OpenAPI spec and Jira tickets into architect format.', code: `intake init "User Management API v2" \\
  --source api/openapi-users-v2.yaml \\
  --source jira://API/sprint-12 \\
  --format architect` },
        { tool: 'architect', title: 'Endpoint implementation', description: 'Loop with schemathesis and vigil as checks.', code: `architect loop "Implement endpoints per OpenAPI spec" \\
  --check "schemathesis run api/openapi-users-v2.yaml --base-url http://localhost:8000" \\
  --check "vigil scan src/routes/" \\
  --max-iterations 20` },
      ],
    },
  },
  {
    id: 'monorepo-management',
    number: 15,
    category: 'devops',
    sector: { es: 'MONOREPO', en: 'MONOREPO' },
    tools: { intake: 2, architect: 3, vigil: 3, licit: 2 },
    licitPriority: 'high',
    es: {
      title: 'Monorepo Management — Multiples Servicios Coordinados',
      shortDescription: 'Gestion de monorepo con actualizacion en cascada de librerias compartidas y compliance cross-service.',
      context: 'Monorepo con multiples servicios que comparten librerias. Las actualizaciones de una lib compartida deben propagarse y verificarse en todos los servicios dependientes.',
      phases: [
        { tool: 'architect', title: 'Actualizacion en cascada', description: 'Pipeline de actualizacion de libreria compartida con propagacion a servicios.', code: `architect pipeline pipelines/lib-update.yaml \\
  --var lib="shared-auth" --var change="Add MFA support"` },
        { tool: 'vigil', title: 'Report consolidado', description: 'Escanea cada servicio independientemente.', code: `for svc in services/*/; do
  vigil scan "$svc/src/" --format sarif --output "reports/vigil-$(basename $svc).sarif"
done` },
        { tool: 'licit', title: 'Compliance del monorepo', description: 'Gap analysis cross-service.', code: `licit trace
for svc in services/*/; do
  licit connect vigil --sarif "reports/vigil-$(basename $svc).sarif"
done
licit report --format html --output reports/monorepo-compliance.html
licit gaps` },
      ],
    },
    en: {
      title: 'Monorepo Management — Coordinated Multiple Services',
      shortDescription: 'Monorepo management with cascading shared library updates and cross-service compliance.',
      context: 'Monorepo with multiple services sharing libraries. Shared library updates must propagate and be verified across all dependent services.',
      phases: [
        { tool: 'architect', title: 'Cascading update', description: 'Shared library update pipeline with propagation to services.', code: `architect pipeline pipelines/lib-update.yaml \\
  --var lib="shared-auth" --var change="Add MFA support"` },
        { tool: 'vigil', title: 'Consolidated report', description: 'Scans each service independently.', code: `for svc in services/*/; do
  vigil scan "$svc/src/" --format sarif --output "reports/vigil-$(basename $svc).sarif"
done` },
        { tool: 'licit', title: 'Monorepo compliance', description: 'Cross-service gap analysis.', code: `licit trace
for svc in services/*/; do
  licit connect vigil --sarif "reports/vigil-$(basename $svc).sarif"
done
licit report --format html --output reports/monorepo-compliance.html
licit gaps` },
      ],
    },
  },
  {
    id: 'developer-onboarding',
    number: 16,
    category: 'devops',
    sector: { es: 'ONBOARDING', en: 'ONBOARDING' },
    tools: { intake: 2, architect: 3, vigil: 0, licit: 1 },
    licitPriority: 'low',
    es: {
      title: 'Developer Onboarding — Codebase Intelligence',
      shortDescription: 'Guia de onboarding automatizada con estado de compliance y provenance del codebase.',
      context: 'Dia 1 de un nuevo desarrollador. architect genera una guia completa del codebase y licit muestra el estado de compliance y provenance.',
      phases: [
        { tool: 'architect', title: 'Guia del codebase', description: 'Genera guia de onboarding completa del proyecto.', code: `architect run "Genera guia de onboarding completa" \\
  --agent plan --report markdown --budget 0.30 > docs/onboarding.md` },
        { tool: 'licit', title: 'Estado de compliance', description: 'Resumen de provenance, compliance y ultima auditoria.', code: `licit status` },
      ],
    },
    en: {
      title: 'Developer Onboarding — Codebase Intelligence',
      shortDescription: 'Automated onboarding guide with compliance status and codebase provenance.',
      context: 'Day 1 for a new developer. architect generates a complete codebase guide and licit shows compliance and provenance status.',
      phases: [
        { tool: 'architect', title: 'Codebase guide', description: 'Generates a complete project onboarding guide.', code: `architect run "Generate complete onboarding guide" \\
  --agent plan --report markdown --budget 0.30 > docs/onboarding.md` },
        { tool: 'licit', title: 'Compliance status', description: 'Summary of provenance, compliance, and last audit.', code: `licit status` },
      ],
    },
  },
  {
    id: 'deuda-tecnica',
    number: 17,
    category: 'devops',
    sector: { es: 'TECH DEBT', en: 'TECH DEBT' },
    tools: { intake: 2, architect: 3, vigil: 2, licit: 2 },
    licitPriority: 'medium',
    es: {
      title: 'Deuda Tecnica — Deteccion y Resolucion Sistematica',
      shortDescription: 'Analisis semanal de deuda tecnica, de seguridad y de compliance con resolucion automatizada.',
      context: 'Ciclo semanal de deteccion y resolucion de deuda tecnica, de seguridad y de compliance combinando las cuatro herramientas.',
      phases: [
        { tool: 'architect', title: 'Analisis de deuda', description: 'Analisis semanal de deuda tecnica del codebase.', code: `architect run "Analiza deuda tecnica del codebase" \\
  --agent plan --report markdown --budget 0.25 > reports/tech-debt.md` },
        { tool: 'vigil', title: 'Deuda de seguridad', description: 'Escaneo de seguridad y salud de dependencias.', code: `vigil scan src/ --format json --output reports/security-debt.json
vigil deps --verify --output reports/dependency-health.json` },
        { tool: 'licit', title: 'Deuda de compliance', description: 'Gap analysis de compliance combinando deuda tecnica, seguridad y regulatoria.', code: `licit gaps --format json --output reports/compliance-debt.json` },
      ],
    },
    en: {
      title: 'Technical Debt — Systematic Detection and Resolution',
      shortDescription: 'Weekly analysis of technical, security, and compliance debt with automated resolution.',
      context: 'Weekly cycle of detecting and resolving technical, security, and compliance debt combining all four tools.',
      phases: [
        { tool: 'architect', title: 'Debt analysis', description: 'Weekly codebase technical debt analysis.', code: `architect run "Analyze codebase technical debt" \\
  --agent plan --report markdown --budget 0.25 > reports/tech-debt.md` },
        { tool: 'vigil', title: 'Security debt', description: 'Security scan and dependency health check.', code: `vigil scan src/ --format json --output reports/security-debt.json
vigil deps --verify --output reports/dependency-health.json` },
        { tool: 'licit', title: 'Compliance debt', description: 'Compliance gap analysis combining technical, security, and regulatory debt.', code: `licit gaps --format json --output reports/compliance-debt.json` },
      ],
    },
  },
  {
    id: 'ai-agent-development',
    number: 18,
    category: 'devops',
    sector: { es: 'AI AGENTS', en: 'AI AGENTS' },
    tools: { intake: 3, architect: 3, vigil: 3, licit: 3 },
    licitPriority: 'critical',
    diagramFile: 'diagram-13-ai-agent-development.html',
    es: {
      title: 'Desarrollo de Agentes de IA Custom',
      shortDescription: 'Un agente de IA construye otro agente de IA: provenance meta, FRIA obligatoria, y OWASP Agentic completo.',
      context: 'Desarrollo de un agente de analisis de contratos legales usando architect. Cadena de provenance unica: un agente de IA construye otro agente de IA. Si el agente analiza contratos legales, es potencialmente un sistema de alto riesgo.',
      phases: [
        { tool: 'intake', title: 'Spec del agente', description: 'Especificacion del agente desde documentacion y requisitos legales.', code: `intake init "Contract Analysis Agent" \\
  --source docs/agent-spec-contracts.md \\
  --source docs/legal-requirements.pdf \\
  --mode enterprise` },
        { tool: 'architect', title: 'Implementar con eval loop', description: 'Pipeline de desarrollo del agente con evaluacion.', code: `architect pipeline pipelines/agent-development.yaml \\
  --var agent_name="contract-analyzer"` },
        { tool: 'vigil', title: 'Seguridad del agente', description: 'Escanea el codigo del agente en busca de vulnerabilidades.', code: `vigil scan src/agents/ --format sarif --output vigil-agent.sarif` },
        { tool: 'licit', title: 'Compliance de agentes IA', description: 'Provenance meta (agente construye agente), FRIA para contratos legales, OWASP Agentic completo.', code: `licit init && licit trace
licit fria
licit connect vigil --sarif vigil-agent.sarif
licit report
licit verify --min-score 80 --framework owasp-agentic` },
      ],
      whyLicit: 'Desarrollar agentes de IA con agentes de IA crea una cadena de provenance unica. licit rastrea que el agente fue implementado por architect. Un agente que analiza contratos legales es potencialmente un sistema de alto riesgo bajo el EU AI Act.',
    },
    en: {
      title: 'Custom AI Agent Development',
      shortDescription: 'An AI agent builds another AI agent: meta provenance, mandatory FRIA, and complete OWASP Agentic.',
      context: 'Development of a legal contract analysis agent using architect. Unique provenance chain: an AI agent builds another AI agent. If the agent analyzes legal contracts, it is potentially a high-risk system.',
      phases: [
        { tool: 'intake', title: 'Agent spec', description: 'Agent specification from documentation and legal requirements.', code: `intake init "Contract Analysis Agent" \\
  --source docs/agent-spec-contracts.md \\
  --source docs/legal-requirements.pdf \\
  --mode enterprise` },
        { tool: 'architect', title: 'Implement with eval loop', description: 'Agent development pipeline with evaluation.', code: `architect pipeline pipelines/agent-development.yaml \\
  --var agent_name="contract-analyzer"` },
        { tool: 'vigil', title: 'Agent security', description: 'Scans agent code for vulnerabilities.', code: `vigil scan src/agents/ --format sarif --output vigil-agent.sarif` },
        { tool: 'licit', title: 'AI agent compliance', description: 'Meta provenance (agent builds agent), FRIA for legal contracts, complete OWASP Agentic.', code: `licit init && licit trace
licit fria
licit connect vigil --sarif vigil-agent.sarif
licit report
licit verify --min-score 80 --framework owasp-agentic` },
      ],
      whyLicit: 'Developing AI agents with AI agents creates a unique provenance chain. licit tracks that the agent was implemented by architect. An agent analyzing legal contracts is potentially a high-risk system under the EU AI Act.',
    },
  },
  {
    id: 'multi-agent-mcp',
    number: 19,
    category: 'devops',
    sector: { es: 'MCP', en: 'MCP' },
    tools: { intake: 0, architect: 3, vigil: 0, licit: 3 },
    licitPriority: 'high',
    es: {
      title: 'Orquestacion Multi-Agente con MCP',
      shortDescription: 'Pipeline completo Jira a PR a Slack con MCP y rastreo de actividad multi-agente.',
      context: 'architect usa MCP para orquestar un flujo completo: lee ticket de Jira, genera codigo, crea PR en GitHub, notifica en Slack. licit rastrea toda la actividad multi-agente.',
      phases: [
        { tool: 'architect', title: 'Pipeline con MCP', description: 'Flujo Jira a codigo a PR a Slack automatizado.', code: `architect pipeline pipelines/full-feature-delivery.yaml \\
  --var jira_ticket="PROJ-1234"` },
        { tool: 'licit', title: 'Rastreo multi-agente', description: 'Provenance de actividad MCP y evaluacion OWASP para tools con permisos excesivos.', code: `licit trace
licit report --framework owasp-agentic` },
      ],
    },
    en: {
      title: 'Multi-Agent Orchestration with MCP',
      shortDescription: 'Complete Jira-to-PR-to-Slack pipeline with MCP and multi-agent activity tracking.',
      context: 'architect uses MCP to orchestrate a complete flow: reads Jira ticket, generates code, creates GitHub PR, notifies on Slack. licit tracks all multi-agent activity.',
      phases: [
        { tool: 'architect', title: 'Pipeline with MCP', description: 'Automated Jira to code to PR to Slack flow.', code: `architect pipeline pipelines/full-feature-delivery.yaml \\
  --var jira_ticket="PROJ-1234"` },
        { tool: 'licit', title: 'Multi-agent tracking', description: 'MCP activity provenance and OWASP evaluation for tools with excessive permissions.', code: `licit trace
licit report --framework owasp-agentic` },
      ],
    },
  },
  {
    id: 'open-source',
    number: 20,
    category: 'devops',
    sector: { es: 'OPEN SOURCE', en: 'OPEN SOURCE' },
    tools: { intake: 2, architect: 3, vigil: 2, licit: 2 },
    licitPriority: 'medium',
    es: {
      title: 'Open Source — Gestion de Proyecto y Contribuciones',
      shortDescription: 'Triage automatico de issues, review de PRs y provenance de contribuciones AI-generated.',
      context: 'Gestion de proyecto open source con triage automatico de issues, review de PRs de contribuidores, y tracking de provenance de contribuciones.',
      phases: [
        { tool: 'architect', title: 'Triage de issues', description: 'Clasifica issues sin label automaticamente.', code: `architect run "Clasifica las ultimas 10 issues sin label" \\
  --agent plan --budget 0.15` },
        { tool: 'vigil', title: 'Review de PRs', description: 'Escanea codigo de contribuidores.', code: `vigil scan src/ --format sarif --output vigil.sarif` },
        { tool: 'licit', title: 'Provenance de contribuciones', description: 'Rastrea % AI-generated por PR y contribuidor.', code: `licit trace
licit report --format markdown > COMPLIANCE.md` },
      ],
    },
    en: {
      title: 'Open Source — Project and Contribution Management',
      shortDescription: 'Automated issue triage, PR review, and AI-generated contribution provenance.',
      context: 'Open source project management with automated issue triage, contributor PR review, and contribution provenance tracking.',
      phases: [
        { tool: 'architect', title: 'Issue triage', description: 'Automatically classifies unlabeled issues.', code: `architect run "Classify last 10 unlabeled issues" \\
  --agent plan --budget 0.15` },
        { tool: 'vigil', title: 'PR review', description: 'Scans contributor code.', code: `vigil scan src/ --format sarif --output vigil.sarif` },
        { tool: 'licit', title: 'Contribution provenance', description: 'Tracks % AI-generated per PR and contributor.', code: `licit trace
licit report --format markdown > COMPLIANCE.md` },
      ],
    },
  },
  {
    id: 'database-migrations',
    number: 21,
    category: 'devops',
    sector: { es: 'DATABASE', en: 'DATABASE' },
    tools: { intake: 2, architect: 3, vigil: 2, licit: 1 },
    licitPriority: 'low',
    es: {
      title: 'Database Engineering — Migraciones Seguras',
      shortDescription: 'Generacion de migraciones Alembic con verificacion de upgrade/downgrade y provenance.',
      context: 'Generacion automatizada de migraciones de base de datos con verificacion de ciclo upgrade-downgrade y tracking de provenance.',
      phases: [
        { tool: 'intake', title: 'Spec de migracion', description: 'Genera spec desde Jira y esquema actual.', code: `intake init "Add Audit Trail Tables" \\
  --source jira://DB/DB-456 \\
  --source schema/current-erd.png \\
  --format architect` },
        { tool: 'architect', title: 'Generacion de migracion', description: 'Loop con verificacion de upgrade y downgrade.', code: `architect loop "Genera migracion Alembic para audit trail" \\
  --check "alembic upgrade head" \\
  --check "alembic downgrade -1 && alembic upgrade head" \\
  --check "vigil scan migrations/" \\
  --max-iterations 10` },
      ],
    },
    en: {
      title: 'Database Engineering — Safe Migrations',
      shortDescription: 'Alembic migration generation with upgrade/downgrade verification and provenance.',
      context: 'Automated database migration generation with upgrade-downgrade cycle verification and provenance tracking.',
      phases: [
        { tool: 'intake', title: 'Migration spec', description: 'Generates spec from Jira and current schema.', code: `intake init "Add Audit Trail Tables" \\
  --source jira://DB/DB-456 \\
  --source schema/current-erd.png \\
  --format architect` },
        { tool: 'architect', title: 'Migration generation', description: 'Loop with upgrade and downgrade verification.', code: `architect loop "Generate Alembic migration for audit trail" \\
  --check "alembic upgrade head" \\
  --check "alembic downgrade -1 && alembic upgrade head" \\
  --check "vigil scan migrations/" \\
  --max-iterations 10` },
      ],
    },
  },
  {
    id: 'frontend-design-system',
    number: 22,
    category: 'devops',
    sector: { es: 'FRONTEND', en: 'FRONTEND' },
    tools: { intake: 2, architect: 3, vigil: 1, licit: 1 },
    licitPriority: 'low',
    es: {
      title: 'Frontend — Design System a Componentes',
      shortDescription: 'Implementacion paralela de componentes UI desde exports de Figma y design tokens.',
      context: 'Conversion de design system de Figma a componentes React implementados en paralelo con tracking de provenance.',
      phases: [
        { tool: 'intake', title: 'Specs desde Figma', description: 'Procesa exports de Figma y design tokens.', code: `intake init "Design System v3 — Button" \\
  --source figma-export/button-specs.png \\
  --source docs/design-tokens.yaml \\
  --format architect` },
        { tool: 'architect', title: 'Implementacion paralela', description: 'Multiples componentes en paralelo.', code: `architect parallel \\
  --task "Implementa Button component" \\
  --task "Implementa Input component" \\
  --task "Implementa Modal component"` },
      ],
    },
    en: {
      title: 'Frontend — Design System to Components',
      shortDescription: 'Parallel UI component implementation from Figma exports and design tokens.',
      context: 'Conversion of Figma design system to React components implemented in parallel with provenance tracking.',
      phases: [
        { tool: 'intake', title: 'Specs from Figma', description: 'Processes Figma exports and design tokens.', code: `intake init "Design System v3 — Button" \\
  --source figma-export/button-specs.png \\
  --source docs/design-tokens.yaml \\
  --format architect` },
        { tool: 'architect', title: 'Parallel implementation', description: 'Multiple components in parallel.', code: `architect parallel \\
  --task "Implement Button component" \\
  --task "Implement Input component" \\
  --task "Implement Modal component"` },
      ],
    },
  },
  {
    id: 'devsecops-pipeline',
    number: 23,
    category: 'devops',
    sector: { es: 'DEVSECOPS', en: 'DEVSECOPS' },
    tools: { intake: 0, architect: 2, vigil: 3, licit: 3 },
    licitPriority: 'high',
    diagramFile: 'diagram-14-devsecops-pipeline.html',
    es: {
      title: 'DevSecOps — Pipeline de Seguridad Continua',
      shortDescription: 'Shift-left security con vigil, Semgrep, Snyk, compliance licit y review semanal de dependencias.',
      context: 'Pipeline DevSecOps completo con seguridad shift-left: pre-commit con vigil quick, CI con vigil full + Semgrep + Snyk, y review semanal de dependencias.',
      phases: [
        { tool: 'vigil', title: 'Seguridad AI-code', description: 'Escaneo completo de seguridad con deps y calidad de tests.', code: `vigil scan src/ --format sarif --output vigil.sarif
vigil deps --verify --format json --output deps.json
vigil tests --quality tests/ --format json --output test-quality.json` },
        { tool: 'licit', title: 'Compliance en CI', description: 'Trace, conexion con vigil y verificacion de compliance.', code: `licit trace
licit connect vigil --sarif vigil.sarif
licit report --format json --output compliance.json
licit verify --min-score 75` },
        { tool: 'architect', title: 'Security review', description: 'Review automatizado de seguridad del PR.', code: `architect run "Revisa seguridad del PR" \\
  --agent review --context-git-diff origin/main \\
  --report github --budget 0.10` },
      ],
    },
    en: {
      title: 'DevSecOps — Continuous Security Pipeline',
      shortDescription: 'Shift-left security with vigil, Semgrep, Snyk, licit compliance, and weekly dependency review.',
      context: 'Complete DevSecOps pipeline with shift-left security: pre-commit with vigil quick, CI with vigil full + Semgrep + Snyk, and weekly dependency review.',
      phases: [
        { tool: 'vigil', title: 'AI-code security', description: 'Complete security scan with deps and test quality.', code: `vigil scan src/ --format sarif --output vigil.sarif
vigil deps --verify --format json --output deps.json
vigil tests --quality tests/ --format json --output test-quality.json` },
        { tool: 'licit', title: 'CI compliance', description: 'Trace, vigil connection, and compliance verification.', code: `licit trace
licit connect vigil --sarif vigil.sarif
licit report --format json --output compliance.json
licit verify --min-score 75` },
        { tool: 'architect', title: 'Security review', description: 'Automated PR security review.', code: `architect run "Review PR security" \\
  --agent review --context-git-diff origin/main \\
  --report github --budget 0.10` },
      ],
    },
  },
  {
    id: 'benchmarking-modelos',
    number: 24,
    category: 'devops',
    sector: { es: 'BENCHMARKING', en: 'BENCHMARKING' },
    tools: { intake: 0, architect: 3, vigil: 2, licit: 2 },
    licitPriority: 'medium',
    es: {
      title: 'Evaluacion y Benchmarking de Modelos de IA',
      shortDescription: 'Ejecucion competitiva de la misma tarea con multiples modelos: comparacion de seguridad y provenance.',
      context: 'Competitive execution: misma tarea implementada por multiples modelos en paralelo. vigil evalua la seguridad de cada resultado. licit genera provenance por modelo.',
      phases: [
        { tool: 'architect', title: 'Ejecucion competitiva', description: 'Misma tarea implementada por 4 modelos en paralelo.', code: `architect parallel "Implementa /products CRUD con tests" \\
  --models gpt-4.1,claude-sonnet-4,deepseek-chat,gemini-2.5-pro` },
        { tool: 'vigil', title: 'Seguridad por modelo', description: 'Evalua seguridad de cada resultado.', code: `for w in parallel-{1,2,3,4}; do
  vigil scan .architect/worktrees/$w/src/ --format json
done` },
        { tool: 'licit', title: 'Provenance por modelo', description: 'Compara modelos por seguridad OWASP.', code: `licit trace
licit report --framework owasp-agentic` },
      ],
    },
    en: {
      title: 'AI Model Evaluation and Benchmarking',
      shortDescription: 'Competitive execution of the same task with multiple models: security and provenance comparison.',
      context: 'Competitive execution: same task implemented by multiple models in parallel. vigil evaluates each result security. licit generates provenance per model.',
      phases: [
        { tool: 'architect', title: 'Competitive execution', description: 'Same task implemented by 4 models in parallel.', code: `architect parallel "Implement /products CRUD with tests" \\
  --models gpt-4.1,claude-sonnet-4,deepseek-chat,gemini-2.5-pro` },
        { tool: 'vigil', title: 'Security per model', description: 'Evaluates security of each result.', code: `for w in parallel-{1,2,3,4}; do
  vigil scan .architect/worktrees/$w/src/ --format json
done` },
        { tool: 'licit', title: 'Provenance per model', description: 'Compares models by OWASP security.', code: `licit trace
licit report --framework owasp-agentic` },
      ],
    },
  },
  {
    id: 'incident-response',
    number: 25,
    category: 'devops',
    sector: { es: 'INCIDENT', en: 'INCIDENT' },
    tools: { intake: 2, architect: 3, vigil: 2, licit: 1 },
    licitPriority: 'medium',
    es: {
      title: 'Incident Response — De Alerta a Postmortem',
      shortDescription: 'Diagnostico automatizado, hotfix con verificacion, y generacion de postmortem con provenance.',
      context: 'Flujo completo de respuesta a incidentes: diagnostico via Sentry, implementacion del fix con checks, provenance del hotfix, y generacion de postmortem.',
      phases: [
        { tool: 'architect', title: 'Diagnostico y fix', description: 'Diagnostica el error y corrige con checks de tests y vigil.', code: `architect run "Diagnostica el error 500 en /payments" \\
  --agent plan --budget 0.15 > diagnosis.md

architect loop "Corrige el bug segun diagnosis.md" \\
  --check "pytest tests/ -q" \\
  --check "vigil scan src/services/payment/" \\
  --max-iterations 10` },
        { tool: 'licit', title: 'Provenance del hotfix', description: 'Documenta si la IA introdujo el bug o lo arreglo.', code: `licit trace` },
        { tool: 'intake', title: 'Acciones preventivas', description: 'Convierte postmortem en spec para mejoras.', code: `intake init "Post-incident improvements" \\
  --source postmortem.md \\
  --format architect` },
      ],
    },
    en: {
      title: 'Incident Response — From Alert to Postmortem',
      shortDescription: 'Automated diagnosis, hotfix with verification, and postmortem generation with provenance.',
      context: 'Complete incident response flow: diagnosis via Sentry, fix implementation with checks, hotfix provenance, and postmortem generation.',
      phases: [
        { tool: 'architect', title: 'Diagnosis and fix', description: 'Diagnoses the error and fixes with test and vigil checks.', code: `architect run "Diagnose the 500 error in /payments" \\
  --agent plan --budget 0.15 > diagnosis.md

architect loop "Fix the bug per diagnosis.md" \\
  --check "pytest tests/ -q" \\
  --check "vigil scan src/services/payment/" \\
  --max-iterations 10` },
        { tool: 'licit', title: 'Hotfix provenance', description: 'Documents whether AI introduced the bug or fixed it.', code: `licit trace` },
        { tool: 'intake', title: 'Preventive actions', description: 'Converts postmortem into spec for improvements.', code: `intake init "Post-incident improvements" \\
  --source postmortem.md \\
  --format architect` },
      ],
    },
  },
  {
    id: 'compliance-as-code',
    number: 26,
    category: 'devops',
    sector: { es: 'COMPLIANCE', en: 'COMPLIANCE' },
    tools: { intake: 1, architect: 0, vigil: 3, licit: 3 },
    licitPriority: 'critical',
    diagramFile: 'diagram-15-compliance-as-code.html',
    es: {
      title: 'Compliance as Code — SOC 2 / ISO 27001',
      shortDescription: 'licit como herramienta central de compliance: provenance, changelog, FRIA, Annex IV, y evidence bundle mensual.',
      context: 'licit es la herramienta central de compliance. Genera evidence bundles mensuales para auditorias SOC 2 e ISO 27001 combinando provenance, seguridad, y documentacion regulatoria.',
      phases: [
        { tool: 'licit', title: 'Compliance completo', description: 'Flujo completo de compliance: trace, changelog, FRIA, Annex IV, report, gaps, verify.', code: `licit init
licit trace
licit changelog
licit fria
licit annex-iv
licit connect vigil --sarif vigil.sarif
licit report --format html
licit gaps
licit verify --min-score 80` },
        { tool: 'vigil', title: 'Evidencia de seguridad', description: 'SARIF como evidencia para auditorias.', code: `vigil scan src/ --format sarif --output vigil.sarif` },
      ],
      whyLicit: 'Para auditoria SOC 2: provenance responde quien escribio este codigo, vigil SARIF documenta vulnerabilidades, changelog muestra controles de agentes, y FRIA/Annex IV cumplen requisitos legales.',
    },
    en: {
      title: 'Compliance as Code — SOC 2 / ISO 27001',
      shortDescription: 'licit as the central compliance tool: provenance, changelog, FRIA, Annex IV, and monthly evidence bundle.',
      context: 'licit is the central compliance tool. Generates monthly evidence bundles for SOC 2 and ISO 27001 audits combining provenance, security, and regulatory documentation.',
      phases: [
        { tool: 'licit', title: 'Complete compliance', description: 'Full compliance flow: trace, changelog, FRIA, Annex IV, report, gaps, verify.', code: `licit init
licit trace
licit changelog
licit fria
licit annex-iv
licit connect vigil --sarif vigil.sarif
licit report --format html
licit gaps
licit verify --min-score 80` },
        { tool: 'vigil', title: 'Security evidence', description: 'SARIF as evidence for audits.', code: `vigil scan src/ --format sarif --output vigil.sarif` },
      ],
      whyLicit: 'For SOC 2 audits: provenance answers who wrote this code, vigil SARIF documents vulnerabilities, changelog shows agent controls, and FRIA/Annex IV meet legal requirements.',
    },
  },
  {
    id: 'sdk-multi-language',
    number: 27,
    category: 'devops',
    sector: { es: 'SDK', en: 'SDK' },
    tools: { intake: 3, architect: 3, vigil: 2, licit: 1 },
    licitPriority: 'low',
    es: {
      title: 'SDK / Library Development — Multi-Lenguaje',
      shortDescription: '4 SDKs generados en paralelo desde OpenAPI: Python, TypeScript, Go y Java con provenance independiente.',
      context: 'Generacion de SDKs en 4 lenguajes desde una OpenAPI spec. Cada SDK tiene su propio escaneo de seguridad y provenance tracking independiente.',
      phases: [
        { tool: 'intake', title: 'OpenAPI como fuente', description: 'OpenAPI spec como fuente de verdad para los SDKs.', code: `intake init "SDK Generation — Payment API v3" \\
  --source api/openapi-payments-v3.yaml \\
  --format architect` },
        { tool: 'architect', title: '4 SDKs en paralelo', description: 'Genera SDKs en Python, TypeScript, Go y Java simultaneamente.', code: `architect parallel \\
  --task "SDK Python (httpx, pydantic)" \\
  --task "SDK TypeScript (fetch, zod)" \\
  --task "SDK Go (net/http)" \\
  --task "SDK Java (HttpClient, Jackson)"` },
        { tool: 'vigil', title: 'Deps por lenguaje', description: 'Escanea cada SDK independientemente.', code: `for sdk in sdks/*/; do
  vigil scan "$sdk" --format sarif --output "reports/vigil-$(basename $sdk).sarif"
done` },
      ],
    },
    en: {
      title: 'SDK / Library Development — Multi-Language',
      shortDescription: '4 SDKs generated in parallel from OpenAPI: Python, TypeScript, Go, and Java with independent provenance.',
      context: 'Generating SDKs in 4 languages from an OpenAPI spec. Each SDK has its own security scan and independent provenance tracking.',
      phases: [
        { tool: 'intake', title: 'OpenAPI as source', description: 'OpenAPI spec as source of truth for SDKs.', code: `intake init "SDK Generation — Payment API v3" \\
  --source api/openapi-payments-v3.yaml \\
  --format architect` },
        { tool: 'architect', title: '4 SDKs in parallel', description: 'Generates SDKs in Python, TypeScript, Go, and Java simultaneously.', code: `architect parallel \\
  --task "SDK Python (httpx, pydantic)" \\
  --task "SDK TypeScript (fetch, zod)" \\
  --task "SDK Go (net/http)" \\
  --task "SDK Java (HttpClient, Jackson)"` },
        { tool: 'vigil', title: 'Deps per language', description: 'Scans each SDK independently.', code: `for sdk in sdks/*/; do
  vigil scan "$sdk" --format sarif --output "reports/vigil-$(basename $sdk).sarif"
done` },
      ],
    },
  },
  {
    id: 'startup-mvp',
    number: 28,
    category: 'devops',
    sector: { es: 'STARTUP', en: 'STARTUP' },
    tools: { intake: 3, architect: 3, vigil: 2, licit: 1 },
    licitPriority: 'low',
    es: {
      title: 'Startup Early-Stage — MVP en 48h',
      shortDescription: 'De vision del fundador a MVP funcional en un fin de semana con compliance basico para inversores.',
      context: 'MVP en 48 horas: viernes intake normaliza la vision, sabado architect implementa en paralelo, domingo verificacion con vigil y licit status para la demo ante inversores.',
      phases: [
        { tool: 'intake', title: 'Vision del fundador', description: 'Normaliza Google Docs del fundador y capturas de competidores.', code: `intake init "TaskFlow MVP" \\
  --source gdocs://founder/taskflow-vision \\
  --source screenshots/competitor-*.png \\
  --mode quick` },
        { tool: 'architect', title: 'Implementacion en paralelo', description: 'Backend API y frontend React en paralelo.', code: `architect parallel \\
  --task "Backend API segun spec" \\
  --task "Frontend React segun spec"` },
        { tool: 'licit', title: 'Compliance basico', description: 'Status de compliance para mostrar a inversores.', code: `licit init && licit trace
licit connect vigil --sarif vigil.sarif
licit status
licit gaps --format markdown > COMPLIANCE-GAPS.md` },
      ],
    },
    en: {
      title: 'Early-Stage Startup — MVP in 48h',
      shortDescription: 'From founder vision to working MVP in a weekend with basic compliance for investors.',
      context: 'MVP in 48 hours: Friday intake normalizes the vision, Saturday architect implements in parallel, Sunday verification with vigil and licit status for the investor demo.',
      phases: [
        { tool: 'intake', title: 'Founder vision', description: 'Normalizes founder Google Docs and competitor screenshots.', code: `intake init "TaskFlow MVP" \\
  --source gdocs://founder/taskflow-vision \\
  --source screenshots/competitor-*.png \\
  --mode quick` },
        { tool: 'architect', title: 'Parallel implementation', description: 'Backend API and React frontend in parallel.', code: `architect parallel \\
  --task "Backend API per spec" \\
  --task "Frontend React per spec"` },
        { tool: 'licit', title: 'Basic compliance', description: 'Compliance status to show investors.', code: `licit init && licit trace
licit connect vigil --sarif vigil.sarif
licit status
licit gaps --format markdown > COMPLIANCE-GAPS.md` },
      ],
    },
  },
  {
    id: 'consultoria-multi-cliente',
    number: 29,
    category: 'devops',
    sector: { es: 'CONSULTING', en: 'CONSULTING' },
    tools: { intake: 3, architect: 3, vigil: 3, licit: 3 },
    licitPriority: 'high',
    diagramFile: 'diagram-16-consultoria-multi-cliente.html',
    es: {
      title: 'Consultoria / Agencia — Delivery Multi-Cliente',
      shortDescription: 'Pipeline reutilizable para multiples clientes con compliance docs como parte del delivery.',
      context: 'Consultoria que gestiona multiples clientes con requisitos heterogeneos (Jira+PDF, GDocs, Email+capturas). Pipeline estandarizado de delivery que incluye codigo, security report, compliance report y provenance.',
      phases: [
        { tool: 'intake', title: 'Normalizacion universal', description: 'Normaliza requisitos de cualquier fuente del cliente.', code: `intake init "ClienteA - Portal Empleados" \\
  --source jira://clienteA/PROJECT \\
  --source docs/clienteA-requisitos.pdf \\
  --format architect` },
        { tool: 'architect', title: 'Pipeline reutilizable', description: 'Pipeline de delivery parametrizado por cliente.', code: `architect pipeline pipelines/client-delivery.yaml \\
  --var client="clienteA"` },
        { tool: 'vigil', title: 'Security pre-delivery', description: 'Escaneo de seguridad antes de entregar al cliente.', code: `vigil scan projects/clienteA/ --format sarif --output delivery/vigil-clienteA.sarif` },
        { tool: 'licit', title: 'Compliance docs como delivery', description: 'Genera compliance report y Annex IV como parte del entregable.', code: `licit init && licit trace
licit connect vigil --sarif delivery/vigil-clienteA.sarif
licit report --format html --output delivery/compliance-clienteA.html
licit annex-iv` },
      ],
    },
    en: {
      title: 'Consulting / Agency — Multi-Client Delivery',
      shortDescription: 'Reusable pipeline for multiple clients with compliance docs as part of the delivery.',
      context: 'Consulting firm managing multiple clients with heterogeneous requirements (Jira+PDF, GDocs, Email+screenshots). Standardized delivery pipeline including code, security report, compliance report, and provenance.',
      phases: [
        { tool: 'intake', title: 'Universal normalization', description: 'Normalizes requirements from any client source.', code: `intake init "ClientA - Employee Portal" \\
  --source jira://clientA/PROJECT \\
  --source docs/clientA-requirements.pdf \\
  --format architect` },
        { tool: 'architect', title: 'Reusable pipeline', description: 'Client-parameterized delivery pipeline.', code: `architect pipeline pipelines/client-delivery.yaml \\
  --var client="clientA"` },
        { tool: 'vigil', title: 'Pre-delivery security', description: 'Security scan before client delivery.', code: `vigil scan projects/clientA/ --format sarif --output delivery/vigil-clientA.sarif` },
        { tool: 'licit', title: 'Compliance docs as deliverable', description: 'Generates compliance report and Annex IV as part of the deliverable.', code: `licit init && licit trace
licit connect vigil --sarif delivery/vigil-clientA.sarif
licit report --format html --output delivery/compliance-clientA.html
licit annex-iv` },
      ],
    },
  },
  {
    id: 'gaming-multiplayer',
    number: 30,
    category: 'devops',
    sector: { es: 'GAMING', en: 'GAMING' },
    tools: { intake: 3, architect: 3, vigil: 2, licit: 1 },
    licitPriority: 'low',
    es: {
      title: 'Gaming — Backend Multijugador en Tiempo Real',
      shortDescription: 'Matchmaker con ELO, leaderboards Redis, replay con event sourcing y health checks Agones.',
      context: 'Backend de juego multijugador con matchmaker ELO, region routing, leaderboard service con Redis Sorted Sets, replay service con event sourcing, y health checks para Agones lifecycle.',
      phases: [
        { tool: 'intake', title: 'Spec desde GDD', description: 'Normaliza Game Design Document y RFC de netcode.', code: `intake init "Matchmaker Service v2" \\
  --source gdocs://gdd/multiplayer-shooter \\
  --source docs/netcode-rfc-tickrate.md \\
  --format architect` },
        { tool: 'architect', title: 'Matchmaker + servicios', description: 'Loop para matchmaker y servicios paralelos.', code: `architect loop "Implementa Matchmaker con ELO y region routing" \\
  --check "go test ./services/matchmaker/... -count=1 -race" \\
  --check "vigil scan services/matchmaker/" \\
  --max-iterations 15` },
        { tool: 'licit', title: 'Provenance networking', description: 'Provenance del codigo de networking para seguridad anti-cheat.', code: `licit trace
licit connect vigil --sarif vigil-game.sarif
licit report --framework owasp-agentic` },
      ],
    },
    en: {
      title: 'Gaming — Real-Time Multiplayer Backend',
      shortDescription: 'ELO matchmaker, Redis leaderboards, event sourcing replay, and Agones health checks.',
      context: 'Multiplayer game backend with ELO matchmaker, region routing, leaderboard service with Redis Sorted Sets, replay service with event sourcing, and health checks for Agones lifecycle.',
      phases: [
        { tool: 'intake', title: 'Spec from GDD', description: 'Normalizes Game Design Document and netcode RFC.', code: `intake init "Matchmaker Service v2" \\
  --source gdocs://gdd/multiplayer-shooter \\
  --source docs/netcode-rfc-tickrate.md \\
  --format architect` },
        { tool: 'architect', title: 'Matchmaker + services', description: 'Loop for matchmaker and parallel services.', code: `architect loop "Implement Matchmaker with ELO and region routing" \\
  --check "go test ./services/matchmaker/... -count=1 -race" \\
  --check "vigil scan services/matchmaker/" \\
  --max-iterations 15` },
        { tool: 'licit', title: 'Networking provenance', description: 'Networking code provenance for anti-cheat security.', code: `licit trace
licit connect vigil --sarif vigil-game.sarif
licit report --framework owasp-agentic` },
      ],
    },
  },
];

export function getUseCaseById(id: string): UseCase | undefined {
  return useCases.find((uc) => uc.id === id);
}

export function getUseCasesByCategory(category: Category): UseCase[] {
  return useCases.filter((uc) => uc.category === category);
}
