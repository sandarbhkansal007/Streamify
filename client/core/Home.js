import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import MediaList from '../media/MediaList'
import { listPopular } from '../media/api-media'

const useStyles = makeStyles(theme => ({
  card: {
    margin: `${theme.spacing(5)}px 30px`,
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    fontSize: '2rem',
  },
}))

export default function Home() {
  const classes = useStyles()
  const [media, setMedia] = useState([])

  useEffect(() => {
    const fetchPopularMedia = async () => {
      try {
        const data = await listPopular()
        setMedia(data)
      } catch (error) {
        console.error('Error fetching popular media:', error)
      }
    }
    fetchPopularMedia()

    return () => {
      // Cleanup function
    }
  }, [])

  return (
    <Card className={classes.card}>
      <Typography variant="h2" className={classes.title}>
        Popular Videos
      </Typography>
      <MediaList media={media} />
    </Card>
  )
}
