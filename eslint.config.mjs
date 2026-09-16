import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import prettierConfig from 'eslint-config-prettier'

const eslintConfig = [
  ...nextCoreWebVitals,
  prettierConfig,
  {
    rules: {
      // Allow the standard client-mount guard (useEffect + setState) used to
      // avoid SSR/CSR hydration mismatches, e.g. src/app/[locale]/curriculum/page.tsx
      'react-hooks/set-state-in-effect': 'off',
      // Allow refs read inside event handlers created during render (e.g.
      // form.handleSubmit(onSubmit) in contact-form.tsx), not just top-level
      // handler bodies.
      'react-hooks/refs': 'off',
    },
  },
]

export default eslintConfig
