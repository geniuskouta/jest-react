import { useContext, useEffect, useState } from 'react';
import {
  useNavigate,
  useLocation,
  UNSAFE_NavigationContext as NavigationContext,
  Navigator,
} from 'react-router-dom';
import { History } from 'history';

type ExtendNavigator = Navigator & Pick<History, "block">;

type Params = {
  confirm: () => Promise<boolean>;
  blockCondition?: boolean;
}

export default function useHistoryBlock({ confirm, blockCondition = true }: Params) {
  const [confirmed, setConfirm] = useState(false);
  const [to, setTo] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const { navigator } = useContext( NavigationContext);

  const confirmUnblock = async (to: string) => {
    const response = await confirm();
    setConfirm(response);
    setTo(to);
  }

  useEffect(() => {
    if(confirmed) {
      navigate(to);
    }

    const unblock = (navigator as ExtendNavigator).block((tx) => {
      const toPath = tx.location.pathname;
      if(toPath !== location.pathname && blockCondition) {
        confirmUnblock(toPath);
      }
      return true;
    });

    return () => {
      unblock();
    }
  
  }, [location, blockCondition, confirmed, to]);
}
