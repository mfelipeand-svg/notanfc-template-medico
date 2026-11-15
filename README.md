# NotaNFC+ — Template Médico

Template estático e reutilizável para sites institucionais de profissionais e clínicas da área da saúde.

## Estrutura preservada
- Hero com carrossel de imagens
- Diferenciais e apresentação profissional
- Filosofia de atendimento
- Áreas de atuação
- Comparadores fotográficos antes/depois
- Galeria de ambientes e retratos com marquee e lightbox
- Seção de atendimento e contato
- Menu mobile acessível
- Efeitos de rolagem e suporte a prefers-reduced-motion

## Personalização
1. Substitua os textos entre colchetes pelos dados validados do novo cliente.
2. Insira a identidade visual aprovada (logo, cores e tipografia).
3. Substitua os placeholders SVG pelas imagens autorizadas, otimizadas em WebP/AVIF.
4. Configure os links reais de WhatsApp, endereço e redes sociais.
5. Revise títulos, descrição SEO, Open Graph e dados estruturados.
6. Valide informações profissionais, consentimento de uso de imagens e regras de publicidade aplicáveis à profissão.

## Imagens
Nenhuma fotografia, logo ou arquivo de identidade visual de cliente anterior foi incluído. Todas as imagens visíveis são placeholders genéricos. Para produção, prefira WebP/AVIF, dimensões adequadas, lazy-loading e dimensões explícitas para reduzir CLS.

## Desenvolvimento e build
Requer Node.js 20 ou superior.

```bash
npm run build
```

A saída estática é gerada em `dist-static/`. A configuração `vercel.json` já aponta para essa pasta.

## Importante
Este repositório é um template. Não publique enquanto houver campos entre colchetes, links de contato não configurados ou imagens de demonstração.
