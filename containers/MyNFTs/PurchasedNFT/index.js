
import { memo, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import * as jupiterAPI from 'services/api-jupiter'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import TabPanel from '../Shared/TabPanel'
import NoNFT from '../Shared/NoNFT'
import NFTSaleItem from './NFTSaleItem'
import { isEmpty } from 'utils/helpers/utility'
import { showErrorToast } from 'utils/helpers/toast'
import MESSAGES from 'utils/constants/messages'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const PAGE_COUNT = 8;

const PurchasedNFT = ({
  index,
  value
}) => {
  const classes = useStyles();

  const { currentUser } = useSelector(state => state.auth);
  const [purchases, setPurchases] = useState([])
  const [first, setFirst] = useState(0);
  const [isLast, setIsLast] = useState(false)

  useEffect(() => {
    if (!isEmpty(currentUser)) {
      getDGSPurchasesByBuyer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  const getDGSPurchasesByBuyer = async () => {
    if (!isLast) {
      const params = {
        first,
        last: first + PAGE_COUNT - 1,
        buyer: currentUser.account
      }

      const response = await jupiterAPI.getDGSPurchasesByBuyer(params);
      if (response?.errorCode) {
        showErrorToast(MESSAGES.GET_NFT_ERROR)
        return;
      }

      const { purchases = [] } = response;
      setPurchases((prev) => [...prev, ...purchases]);
      setFirst((prev) => prev + purchases.length);
      setIsLast(purchases.length < PAGE_COUNT);
    }
  }

  return (
    <TabPanel value={value} index={index}>
      {isEmpty(purchases)
        ? (
          <NoNFT />
        ) : (
          <div className={classes.container}>
            {purchases.map((item) => (
              <NFTSaleItem
                key={item.purchase}
                item={item}
              />
            ))}
            {
              !isLast &&
              <ContainedButton
                onClick={getDGSPurchasesByBuyer}
                className={classes.loadButton}
              >
                Load More
              </ContainedButton>
            }
          </div>
        )
      }
    </TabPanel>
  )
}

export default memo(PurchasedNFT)