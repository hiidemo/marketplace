import { memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import MagicIdenticon from 'components/MagicIdenticon'
import GradientButton from 'components/UI/Buttons/GradientButton'
import NFTTag from 'parts/NFTTag'
import { NQT_WEIGHT } from 'utils/constants/common'

const useStyles = makeStyles((theme) => ({
  name: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2)
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  quantity: {
    fontSize: 20,
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(3),
  },
  sellerLabelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  sellerLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: theme.spacing(2)
  },
  sellerRS: {
    fontSize: 14,
    fontWeight: 'bold',
    cursor: 'pointer',
    width: 'fit-content',
    padding: theme.spacing(0.5, 2),
    borderRadius: theme.spacing(0.5),
    border: `2px dotted ${theme.palette.primary.main}`,
    marginBottom: theme.spacing(3)
  }
}));

const NFTInformation = ({
  good
}) => {
  const classes = useStyles();
  const { accountRS } = useSelector(state => state.auth);

  return (
    <div>
      <Typography
        variant='h4'
        color='textPrimary'
        className={classes.name}
      >
        {good.name}
      </Typography>

      <div className={classes.infoContainer}>
        <Typography
          color='primary'
          className={classes.price}
        >
          {good.priceNQT / NQT_WEIGHT} JUP
        </Typography>
        <Typography
          color='textSecondary'
          className={classes.quantity}
        >
          {`x ${good.quantity}`}
        </Typography>
      </div>

      <div className={classes.tagContainer}>
        {good?.parsedTags?.map((tag, index) => (
          <NFTTag
            key={index}
            tag={tag}
          />
        ))}
      </div>

      <div className={classes.sellerLabelContainer}>
        <Typography
          color='textPrimary'
          className={classes.sellerLabel}
        >
          Seller
        </Typography>
        <MagicIdenticon value={good.sellerRS} />
      </div>
      <Typography
        color='primary'
        className={classes.sellerRS}
      >
        {accountRS === good.sellerRS ? 'MINE' : good.sellerRS}
      </Typography>

      {
        accountRS !== good.sellerRS &&
        <GradientButton
          type='submit'
          className={classes.button}
        >
          Purchase Now
        </GradientButton>
      }
    </div>
  )
}

export default memo(NFTInformation)