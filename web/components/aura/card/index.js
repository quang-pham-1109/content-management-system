export default {
  root: {
    class: [
      'flex flex-col',
      'rounded-[12px]',
      'shadow-md',
      'bg-surface-0 dark:bg-surface-900',
      'text-surface-700 dark:text-surface-0',
    ],
  },
  body: {
    class: ['flex flex-col', 'gap-4', 'p-6'],
  },
  caption: {
    class: ['flex flex-col', 'gap-2'],
  },
  title: {
    class: 'text-xl font-semibold mb-0',
  },
  subtitle: {
    class: ['font-normal', 'mb-0', 'text-surface-600 dark:text-surface-0/60'],
  },
  content: {
    class: 'p-0',
  },
  footer: {
    class: 'p-0',
  },
}
