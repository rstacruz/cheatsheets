import cx from 'clsx'

export const typeStyles = {
  manrope: 'font-manrope font-extrabold tracking-manrope'
}

export const homeStyles = {
  body: 'V2017Sheet__body max-w-home p-6 md:px-8 mx-auto',
  pagesList:
    'HomePage__pagesList pages-list grid grid-cols-2 gap-[16px] min-[481px]:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]',
  category:
    'HomePage__category col-span-full mt-8 mb-4 text-xl text-heading font-manrope font-extrabold tracking-manrope',
  snippetList: cx(
    'HomePage__snippetList',
    'col-span-full grid grid-cols-[minmax(0,1fr)] gap-x-[24px] border-t border-t-border',
    'min-[769px]:grid-cols-[repeat(2,minmax(0,1fr))]'
  ),
  snippetMore: cx(
    'HomePage__snippetMore',
    'col-span-full text-center text-sm text-muted-foreground'
  ),
  missingMessage: cx(
    'HomePage__missingMessage',
    'col-span-full',
    'my-[32px] flex items-center border-t border-t-border-strong pt-[16px] text-center',
    'min-[769px]:pt-[32px] max-[481px]:flex-wrap'
  ),
  missingTitle: cx(
    'HomePage__missingTitle',
    'm-0 flex-[1_0_auto] p-0 text-left text-base font-normal text-foreground',
    "before:mr-[16px] before:inline-block before:size-[24px] before:content-[''] before:bg-current before:align-middle before:text-primary",
    'before:[mask:var(--icon-md-arrow-forward)_center/24px_24px_no-repeat]',
    'before:[-webkit-mask:var(--icon-md-arrow-forward)_center/24px_24px_no-repeat]'
  ),
  missingBody:
    'HomePage__missingBody m-0 flex-[0_0_auto] p-0 text-muted-foreground max-[481px]:mt-[16px]',
  pushButton: cx(
    'HomePage__pushButton',
    'inline-block rounded-xs px-[16px] py-[8px] no-underline',
    'text-primary-foreground visited:text-primary-foreground',
    'bg-[image:var(--brand-gradient)]',
    'hover:bg-none hover:bg-primary-active focus:bg-none focus:bg-primary-active',
    'hover:[box-shadow:none] focus:[box-shadow:none]'
  )
}

export const headingStyles = {
  root: cx('SiteHeading__root', 'my-12 text-center'),
  h1: cx('SiteHeading__h1', typeStyles.manrope, 'text-5xl text-heading'),
  tagline: cx('SiteHeading__tagline', 'text-xl', 'mt-4')
}
