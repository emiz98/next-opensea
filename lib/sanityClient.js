import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'skTxSg7b1JZec5gYYN4yWZAfecU08ir4r90K9DpoHpWtXEBmcTrU4xQ75v60nwfqn6sZmvCliVVAB5gbMaUQqCyujzPAqKrIFMSxf7yBPhMrkzbvJnfU4gFX2yxLio3RyuDD9XfweKiYZr2etFHdP8MNpEUqZ1DwAYlKU56kbfAHuL0XdslY',
  useCdn: false,
})
