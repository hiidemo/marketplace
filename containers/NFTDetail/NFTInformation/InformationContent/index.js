import { memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import MagicIdenticon from 'components/MagicIdenticon'
// import NFTTag from 'parts/NFTTag'
import { NQT_WEIGHT } from 'utils/constants/common'

const useStyles = makeStyles((theme) => ({
  name: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2)
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
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
  },
}));

const InformationContent = ({
  good,
  assetInfo
}) => {
  const classes = useStyles();
  const { accountRS } = useSelector(state => state.auth);

  return (
    <>
      <Typography
        variant='h4'
        color='textPrimary'
        className={classes.name}
      >
        {good.description}
      </Typography>
      <Typography
        variant='h6'
        color='textSecondary'
        className={classes.description}
      >
        {assetInfo.description}
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
          {`x ${good.quantityQNT}`}
        </Typography>
      </div>

      {/* <div className={classes.tagContainer}>
        {good?.parsedTags?.map((tag, index) => (
          <NFTTag
            key={index}
            tag={tag}
          />
        ))}
      </div> */}

      <div className={classes.sellerLabelContainer}>
        <Typography
          color='textPrimary'
          className={classes.sellerLabel}
        >
          Creator:
        </Typography>
        <MagicIdenticon value={good.accountRS} />
      </div>
      <Typography
        color='primary'
        className={classes.sellerRS}
      >
        {accountRS === good.accountRS
          ? 'My Account'
          : good.accountRS
        }
      </Typography>
    </>
  )
}

export default memo(InformationContent)