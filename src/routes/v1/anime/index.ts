import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { ServerResponse, IncomingMessage } from 'http'
import Senpai from '../../../scrapers/Senpai'
import Animawka from '../../../scrapers/Animawka'
import onanime from '../../../scrapers/onanime'

const animawka = new Animawka()
const senpai = new Senpai()

export default async (fastify: FastifyInstance, opts) => {
  fastify.get('/anime', opts, async (req: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    reply.header('Content-Type', 'application/json').code(200)
    try {
      let res
      switch (req.query.provider) {
        case 'animawka':
          res = {
            serviceId: animawka.serviceId,
            data: await animawka.getAnimeList(),
          }
          break
        case 'onanime':
          res = await onanime.getAnimes()
          break
        case 'senpai':
        default:
          res = {
            serviceId: senpai.serviceId,
            data: await senpai.getAnimeList(),
          }
      }
      return res
    } catch (err) {
      throw err
    }
  })
  fastify.get('/anime/:q', opts, async (req: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    reply.header('Content-Type', 'application/json').code(200)
    if (!req.params || !req.params.q) {
      throw new Error('Missing q param')
    } else {
      try {
        let res
        switch (req.query.provider) {
          case 'animawka':
            res = {
              serviceId: animawka.serviceId,
              data: await animawka.getAnime(req.params.q),
            }
            break
          case 'onanime':
            res = await onanime.getAnime(req.params.q)
            break
          case 'senpai':
          default:
            res = {
              serviceId: senpai.serviceId,
              data: await senpai.getAnime(req.params.q),
            }
        }
        return res
      } catch (err) {
        throw err
      }
    }
  })
  fastify.get('/anime/:q/:n', opts, async (req: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    reply.header('Content-Type', 'application/json').code(200)
    if (!req.params || !req.params.q || !req.params.n) {
      throw new Error('Missing q and n param')
    } else {
      try {
        let res
        switch (req.query.provider) {
          case 'animawka':
            res = {
              serviceId: animawka.serviceId,
              data: await animawka.getPlayers(req.params.q, req.params.n),
            }
            break
          case 'onanime':
            res = await onanime.getAnimePlayers(req.params.q, req.params.n)
            break
          case 'senpai':
          default:
            res = {
              serviceId: senpai.serviceId,
              data: await senpai.getPlayers(req.params.q, req.params.n),
            }
        }
        return res
      } catch (err) {
        throw err
      }
    }
  })
}