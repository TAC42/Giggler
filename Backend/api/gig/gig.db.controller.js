import { gigService } from './gig.db.service.js'
import { logger } from '../../services/logger.service.js'

export async function getGigs(req, res) {
  try {
    const filterBy = {}
    const { user } = req.query
    if (user) {
      filterBy = { user }
    } else {
      const { search, cat, tag, time, level, min, max, page } = req.query
      filterBy = { search, cat, tag, time, level, min, max, page }
    }
    logger.debug('Getting Gigs', filterBy)
    const gigs = await gigService.query(filterBy)
    res.json(gigs)
  } catch (err) {
    logger.error('Failed to get gigs', err)
    res.status(500).send({ err: 'Failed to get gigs' })
  }
}

export async function getGigById(req, res) {
  try {
    const gigId = req.params.id
    const gig = await gigService.getById(gigId)
    res.json(gig)
  } catch (err) {
    logger.error('Failed to get gig', err)
    res.status(500).send({ err: 'Failed to get gig' })
  }
}

export async function addGig(req, res) {
  const { loggedinUser } = req

  try {
    const gig = req.body
    gig.ownerId = loggedinUser
    const addedGig = await gigService.add(gig)
    res.json(addedGig)
  } catch (err) {
    logger.error('Failed to add gig', err)
    res.status(500).send({ err: 'Failed to add gig' })
  }
}

export async function updateGig(req, res) {
  try {
    const gig = req.body
    const updatedGig = await gigService.update(gig)
    res.json(updatedGig)
  } catch (err) {
    logger.error('Failed to update gig', err)
    res.status(500).send({ err: 'Failed to update gig' })
  }
}

export async function removeGig(req, res) {
  try {
    const gigId = req.params.id
    await gigService.remove(gigId)
    res.send()
  } catch (err) {
    logger.error('Failed to remove gig', err)
    res.status(500).send({ err: 'Failed to remove gig' })
  }
}
