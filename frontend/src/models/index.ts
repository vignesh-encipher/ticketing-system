export interface Incident {
  account_id: number;
  description: string;
  account: {
    address_line1: string;
    address_line2: string;
    city: string;
    country_code: string;
    created_at: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    phone_number: string;
    postal_index_code: string;
    state_code: string;
    status: number;
  };
  id: string;
  image_included: boolean;
  image_url: string | null;
  incident_labels: { id: number; slug: string }[];
  incident_type: {
    id: number;
    name: string;
  };
  linked_ticket: string | null;
  origin: number | null;
  severity: number;
  status: string;
  title: string;
  total_incidents: number;
}

export interface DebitCardOverview {
  kyc: {
    failed: number;
    passed: number;
    started: number;
  };
  onboarding: {
    initiated_onboarding: number;
    waitlist_joins: number;
  };
  virtual_card: {
    virtual_card_issued: number;
    virtual_card_requested: number;
  };
  balances: {
    total_card_balances: number;
    deposits: number;
    withdrawls: number;
  };
  deposits: {
    cash_deposit: number;
    wallet: number;
    rewards: number;
  };
  purchases: {
    purchases_count: number;
    purchases_amt: number;
    returns_count: number;
    returns_amt: number;
  };
  data_profiling: {
    base_asset: number;
  };
}
export interface UserList {
  admins: {
    date_created: string;
    email: string;
    first_name: string;
    id: number;
    ip_address: string;
    is_superadmin: boolean;
    last_login_at: string;
    last_login_location: string;
    last_name: string;
    member_since: string;
    num_logins: number;
    permission_ids: any[];
    profile_image_uri: string;
    status: number;
    line_manager: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
    department: string;
    permission: string;
    delete_request: null;
  }[];
  total_admins: number;
}

export interface AdminProfile {
  date_created: string;
  email: string;
  first_name: string;
  id: number;
  ip_address: string;
  is_superadmin: boolean;
  last_login_at: string;
  last_login_location: string;
  last_name: string;
  member_since: string;
  num_logins: number;
  permission_ids: any[];
  profile_image_uri: string;
  status: number;
  line_manager: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  sessions_count: number;
  department: string;
  permission: string;
  delete_request: null;
  Last_login_at: string;
  Profile_image_uri: string;
  role: string;
  access_modules: string[];
  access_rights: string[];
  approver_level: string;
}

export interface UsersList {
  users: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    status: string;
    joined: string;
    membership_details: string;
  }[];
  total_users: number;
}

export interface UserDetails {
  user_details: {
    email: string;
    account_id: string;
    phone_number: number;
    nick_name: string;
    created_at: string;
    last_updated_at: string;
    cryptoback_email: string;
    language: string;
    verification_status: boolean;
    status: string;
    wallets: {
      member_wallet: string;
      stomrx_wallet: string;
    };
    signup_info: {
      created_at: string;
      udid: string;
      country: string;
      ip: string;
    };
    google: string | null;
    apple: string | null;
    sessions: string[];
    first_name: string;
    last_name: string;
  };
}

export interface ShoppingTrips {
  shopping_trip_details: {
    started_trips: number;
    pending_trips: number;
    total_trips: number;
    completed_trips: number;
  };
}
export interface Referrals {
  referral_details: {
    links_clicked: number;
    apps_downloaded: number;
    total_earned: number;
    referral_code: string;
  }[];
}

export interface MembershipDetails {
  membership_details: {
    level: string;
    joined: string;
    connected_wallet: string;
    balance_STMX: number;
    balance_ATH: number;
    balance_STMX_V2: number;
    usd_balance_STMX: number;
    usd_balance_ATH: number;
    usd_balance_STMX_V2: number;
  };

  graph_data: {
    "athens-token-sync-lambda": {
      monthYear: string;
      balance: number;
      level: string;
    }[];
    "stormx-token-sync-lambda": {
      monthYear: string;
      balance: number;
      level: string;
    }[];
    "stormx_v2-token-sync-lambda": {
      monthYear: string;
      balance: number;
      level: string;
    }[];
  };
}
export interface ConnectedWallets {
  connected_wallets: {
    wallet: string;
  };
}

export interface StatusHistory {
  status_history: {
    _id: {
      $oid: string;
    };
    accountId: string;
    caller: string;
    createdAt: string;
    data: {
      reason: string;
      linked_ticket: string;
      status: string;
    };
    field: string;
    notes: string;
  }[];
}

export interface ShoppingTrips {
  shopping_trip_details: {
    started_trips: number;
    pending_trips: number;
    total_trips: number;
    completed_trips: number;
  };
}
export interface Dashboard {
  admin_stats: {
    id: number;
    created_at: string;
    updated_at: string;
    daily_data: {
      account_credited: {
        value: number;
        amount: number;
      };
      app_crashes: { value: number; amount: number };
      login_erros: { value: number; amount: number };
      new_memberships: {
        bronze: number;
        diamond: number;
        gold: number;
        platinum: number;
        purple: number;
        silver: number;
        total: number;
        value: number;
      };
      shopping_trips: {
        pending: { count: number; value: number };
        started: { count: number; value: number };
        total: number;
      };
      summary: {
        active_users: { count: number; value: number };
        new_referrals: { count: number; value: number };
        new_users: { count: number; value: number };
      };
      support_tickets: {
        new: number;
        total: number;
        value: number;
        closed: number;
        in_progress: number;
      };
      total_value_locked: {
        ath: { total: number; value: number };
        stmx: { total: number; value: number };
      };
    };
    weekly_data: {
      account_credited: {
        value: number;
        amount: number;
      };
      app_crashes: { value: number; amount: number };
      login_erros: { value: number; amount: number };
      new_memberships: {
        bronze: number;
        diamond: number;
        gold: number;
        platinum: number;
        purple: number;
        silver: number;
        total: number;
        value: number;
      };
      shopping_trips: {
        pending: { count: number; value: number };
        started: { count: number; value: number };
        total: number;
      };
      summary: {
        active_users: { count: number; value: number };
        new_referrals: { count: number; value: number };
        new_users: { count: number; value: number };
      };
      support_tickets: {
        new: number;
        total: number;
        value: number;
        closed: number;
        in_progress: number;
      };
      total_value_locked: {
        ath: { total: number; value: number };
        stmx: { total: number; value: number };
      };
    };
    monthly_data: {
      account_credited: {
        value: number;
        amount: number;
      };
      app_crashes: { value: number; amount: number };
      login_erros: { value: number; amount: number };
      new_memberships: {
        bronze: number;
        diamond: number;
        gold: number;
        platinum: number;
        purple: number;
        silver: number;
        total: number;
        value: number;
      };
      shopping_trips: {
        pending: { count: number; value: number };
        started: { count: number; value: number };
        total: number;
      };
      summary: {
        active_users: { count: number; value: number };
        new_referrals: { count: number; value: number };
        new_users: { count: number; value: number };
      };
      support_tickets: {
        new: number;
        total: number;
        value: number;
        closed: number;
        in_progress: number;
      };
      total_value_locked: {
        ath: { total: number; value: number };
        stmx: { total: number; value: number };
      };
    };
  };
}

export interface AdminSummary {
  total_admins: number;
  number_of_logins: number;
  active_sessions: number;
}

export interface TripDetails {
  trip_details: {
    id: number;
    uuid: string;
    type: string;
    shopping_trip_id: string;
    shop: string;
    status: string;
    amount: number;
    date: string;
    expiration_date: string;
    order_id: string;
    shopping_cart_amount: number;
    cbr: number;
    expiration_timestamp: string;
    metadata: {
      baseRewardsInfo: {
        rewardUsd: 0;
      };
      shopInfo: {
        affiliate: string;
        currency: string;
        shoppingCartAmount: string;
        orderId: string;
        purchaseDate: string;
        quantity: string;
        skuNumber: string;
        advertiserId: number;
        cryptoBackRate: number;
        cryptoBackRevenueType: string;
        cryptoBackPayoutType: string;
        termsAndCondtions: string;
        cryptoBackRevenuePercentage: number;
        ts: {
          pending: string;
        };
      };
      level: 0;
      cryptoback_bonus: 0;
      expiration_time_multiplier: string;
    };
    level: number;
    cryptoback_bonus: number;
    expiration_time_multiplier: null | string;
  };
  offer_details: {
    advertiser: string;
    offers_exclusion: string;
    lockindays: number;
  };
}
export interface ShoppingList {
  shopping_trips: {
    amount: string;
    cbr: string;
    date: string;
    expiration_date: string;
    id: number;
    order_id: any;
    shop: string;
    shopping_cart_amount: any;
    shopping_trip_id: string;
    status: string;
    type: string;
    uuid: string;
  }[];
  total_users: number;
}

export interface IncidentsOverview {
  incident_labels: {
    UNCATEGORIZED: number;
    UNBANKED_REGISTER_FAILURE: number;
    UNBANKED_LOGIN_FAILURE: number;
    UNBANKED_KYC_CHECK_FAILURE: number;
    UNBANKED_VIRTUAL_CARD_REQUEST_FAILURE: number;
    UNBANKED_PHYSICAL_CARD_REQUEST_FAILURE: number;
    UNBANKED_DEPOSIT_FAILURE: number;
    UNBANKED_WITHDRAWAL_FAILURE: number;
    DEBIT_CARD_USER_REPORTED_INCIDENT: number;
    UNBANKED_WALLET_TOKEN_MISSING: number;
    UNBANKED_INVALID_LEDGER_ENTRY: number;
    UNBANKED_INVALID_DOCUMENT: number;
    UNBANKED_CARD_ENROLLMENT_FAILURE: number;
    UNBANKED_ROUTING_NUMBER_FAILURE: number;
    UNBANKED_ACCOUNT_NUMBER_FAILURE: number;
    UNBANKED_INVALID_WALLET_ADDRESS: number;
    UNBANKED_WALLET_TOKEN_EXPIRED: number;
    CARD_TRANSACTION_ERRORS: number;
    MANUAL_REVIEWS_ERRORS: number;
  };
  percent_account_creation: number;
  percent_kyc_errors: number;
  percent_card_errors: number;
  percent_money_errors: number;
  percent_transaction_errors: number;
  percent_manual_review_errors: number;
}

export interface IncidentManagementOverview {
  incident_by_status: {
    resolved: number;
    unresolved: number;
    mean_time_to_solved: number;
  };
  incident_by_type: {
    "Branch API": number;
    "DebitCard API": number;
    Default: number;
    "Unbanked API": number;
    "Unbanked Other": number;
    "Unbanked Webhook": number;
  };
  incident_grouped_by_date: any;
}

export interface IncidentManagementOverviewBarGraphConfig {
  data: {
    year: string;
    type: string;
    value: number;
  }[];
  isStack: boolean;
  xField: string;
  yField: string;
  yAxis: any;
  seriesField: string;
  label: {
    content: string;
  };
  color: string[];
  columnBackground: {
    style: {
      fill: string;
    };
  };
  legend: {
    position:
      | "top-left"
      | "top"
      | "top-right"
      | "right"
      | "right-top"
      | "right-bottom"
      | "left"
      | "left-top"
      | "left-bottom"
      | "bottom"
      | "bottom-left"
      | "bottom-right"
      | undefined;
  };
  animation: {
    appear: {
      animation: string;
      duration: number;
    };
  };
}

export interface AdminGroup {
  admin_groups: {
    id: number;
    name: string;
  }[];
}

export interface DepartmentLineManager {
  line_managers: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  }[];
}

export interface UserEditProfile {
  admin: {
    id: number;
    line_manager: number;
    permission: number[];
    type: string;
  };
}

export interface CreateAdmin {
  admin: {
    email: string;
    first_name: string;
    last_name: string;
    line_manager_id: number | null;
    permissions: number[];
    type: string;
  };
}

export interface IncidentDetails {
  id: number;
  title: string;
  description: string;
  status: string;
  severity: number;
  origin: number;
  details: {
    email: string;
    message: string;
    kyc_approved: boolean;
  };
  linked_ticket: any;
  incident_type: {
    id: number;
    name: string;
    default_severity: number;
  };
  created_at: string;
  updated_at: string;
  incident_labels: [
    {
      id: number;
      slug: string;
    }
  ];
  account: any;
}

export interface RewardsDetail {
  rewards_details: {
    balance_ath_rewards: number;
    balance_ath_rewards_usd: number;
    balance_bolt_rewards_in_usd: number;
    balance_bolt_rewards_stmx: number;
    balance_stormx_rewards: number;
    balance_stormx_rewards_in_usd: number;
    pending_bolt_rewards_in_usd: number;
    pending_bolt_rewards_stmx: number;
    pending_stormx_rewards: number;
    pending_stormx_rewards_in_usd: number;
    balance_withdraw_usd: number;
    balance_withdraw_stmx: number;
    ath_token_staked: number;
    stmx_token_staked: number;
    stmx_v2_token_staked: number;
    balance_stormx_v1_rewards: number;
    balance_stormx_v1_rewards_in_usd: number;
    balance_stormx_v2_rewards: number;
    balance_stormx_v2_rewards_in_usd: number;
  };
}

export interface IncidentByTypeBarGraphConfig {
  data: { year: string; Percentage: number }[];
  xField: string;
  yField: string;
  color: string;
  xAxis: any;
  label: any;
  yAxis: any;
  barStyle: {
    radius: number[];
  };
  barBackground: {
    style: {
      fill: string;
    };
  };
  interactions: [
    {
      type: string;
      enable: boolean;
    }
  ];
}

export interface TransactionFilter {
  currencies: {
    bolt: number;
    storm: number;
    bitcoin: number;
    ethereum: number;
    pendingBolt: number;
    dai: number;
    litecoin: number;
    xrp: number;
    eos: number;
    stormxRewards: number;
    stormx: number;
    yfi: number;
    cryptoBackUSD: number;
    referralUSD: number;
    stormxStaking: number;
    pendingCryptoBackUSD: number;
    pendingReferralUSD: number;
    pendingStormxStaking: number;
    athens: number;
    athensStaking: number;
    referralSTMX: number;
    referralATH: number;
    dogecoin: number;
  };
  types: {
    credit: number;
    withdraw: number;
    exchange: number;
    payment: number;
    transfer: number;
  };
  source_types: {
    customerService: number;
    offerReward: number;
    surveyReward: number;
    videoReward: number;
    withdrawRequest: number;
    stormPlayLegacy: number;
    fyber: number;
    referralProvider: number;
    referralConsumer: number;
    tapjoy: number;
    ironSource: number;
    peanutLabs: number;
    ayeTStudios: number;
    offerToro: number;
    pollFish: number;
    shopBaseReward: number;
    rakuten: number;
    stormShopReferralProvider: number;
    stormShopReferralConsumer: number;
    stormxRewards: number;
    shopMemberBonus: number;
    stormxStaking: number;
    cryptoBackRewardsPromotionBonus: number;
    athensStaking: number;
    cardDeposit: number;
    cardWithdrawal: number;
    cardReward: number;
    cardTransaction: number;
    cardForcePostedPositive: number;
    cardForcePostedNegative: number;
    cardConversionAdjustmentPositive: number;
    cardConversionAdjustmentNegative: number;
    cardMerchantCredit: number;
    stormxStakingV2: number;
  };
}

export interface TransactionList {
  transactions: {
    id: number;
    source_id: string;
    source_type: string;
    source_sub_id: string;
    type: string;
    amount: string;
    currency: string;
    date: number;
  }[];
  total_users: number;
}

export interface AccountList {
  accounts: {
    id: number;
    email: string;
    uuid: string;
    doc_id: string;
    progress: number;
    joined: string;
    card_type: string | null;
    status: string | null;
    balance: number | null;
  }[];
  total_accounts: number;
}

export interface CreditApproval {
  credit_approval: {
    id: number;
    account_id: string;
    credit_type: string;
    amount: number;
    requested_by: string;
    created_at: string;
    shopping_trip_id: string | null;
    approver: string | null;
  }[];
  total_admins: number;
}

export interface CreditRequest {
  id: number;
  admin_id: number;
  verification_status: string;
  amount: number;
  credit_type: string;
  shopping_trip_id: string | null;
  note: string | null;
  shopping_cart_amount: number | string | null;
  purchase_date: string | null;
  expiration_days: string | null;
  is_verified: boolean;
  created_at: string;
  shopping_trip_source_id: string | null;
  ticket_link: string;
  account_id: string;
  requested_by: string;
  approver: string | null;
  rejection_reason: string | null;
  verification_time: string | null;
}
export interface AccountOverview {
  id: number;
  uuid: string;
  doc_id: string;
  email: string;
  status: number;
  source_uuid: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state_code: string;
  country_code: string;
  postal_index_code: number;
  created_at: string;
  updated_at: string;
  transactions: number;
  incidents: number;
  card_balance: number;
  rewards: {
    payout_date: string;
    total_pending_rewards: number;
    pending_payout: number;
  };
  unbanked_debit_cards: {
    id: number;
    status: number;
    card_type: string;
    image_uri: string | null;
    kyc_passed_at: string | null;
    activated_at: string | null;
    created_at: string;
    updated_at: string;
  }[];
}

export interface CardTransaction {
  card_transactions: {
    id: number;
    uuid: string;
    account_id: number;
    source_type: string;
    merchant_id: string;
    merchant_category_code: string;
    merchant_description: string;
    status: string | null;
    reward_status: string;
    date: string;
    txn_amount: string;
    metadata: null | string;
    membership: null | string;
    reward_amount: null | string;
    reward_date: null | string;
  }[];
  total_transactions: number;
}

export interface CardDetails {
  transaction: {
    id: number;
    uuid: string;
    account_id: number;
    source_type: string;
    merchant_id: string;
    merchant_category_code: string;
    merchant_description: string;
    status: string;
    reward_status: string;
    date: string;
    txn_amount: string;
    metadata: null;
    membership: null | string;
    amount_in_stormx: number;
    created_at: string;
    formatted_date: string;
    reward_amount: number;
    reward_date: string;
  };
}

export interface getPrepaidCardOverviewDetails {
  card_details: {
    ids: string;
    account_id: number;
    email: string;
    source_ids: string;
    id: null;
  }[];
}

export interface UsersPayments {
  payments: {
    id: number;
    type: string;
    uuid: string;
    status: string;
    wallet_type: number;
    wallet_address: string;
    amount: string;
    currency: string;
    created_date: string;
    updated_date: string;
    transaction_id: string;
    ip: string;
    country: string;
    note: string;
  }[];
  total_users: number;
}

export interface PaymentsFilter {
  currencies: {
    bolt: number;
    storm: number;
    bitcoin: number;
    ethereum: number;
    pendingBolt: number;
    dai: number;
    litecoin: number;
    xrp: number;
    eos: number;
    stormxRewards: number;
    stormx: number;
    yfi: number;
    cryptoBackUSD: number;
    referralUSD: number;
    stormxStaking: number;
    pendingCryptoBackUSD: number;
    pendingReferralUSD: number;
    pendingStormxStaking: number;
    athens: number;
    athensStaking: number;
    referralSTMX: number;
    referralATH: number;
    dogecoin: number;
    stmxCard: number;
    stmxCardReward: number;
    stormxStakingV2: number;
    pendingStormxStakingV2: number;
  };
  types: {
    credit: number;
    withdraw: number;
    exchange: number;
    payment: number;
    transfer: number;
  };
  status: {
    started: number;
    pending: number;
    ready: number;
    processing: number;
    sent: number;
    failed: number;
    rejected: number;
    paused: number;
    notified: number;
    cancelled: number;
  };
}

export interface StmxV1 {
  staking: {
    token_type: string;
    total_earning: number;
    withdraw_earning: number;
    staking_rate: number;
    total_staked: number;
    total_balance: number;
    status: string;
  };
  history: {
    reward_history: {
      date: string;
      type: string;
      amount: number;
    }[];

    stmx_history: {
      date: string;
      type: string;
      unstaked_amount: number;
      recieved_amount: number;
      penalized_amount: number;
      wallet_address: string;
    }[];
  };
}

export interface StmxV2 {
  staking: {
    token_type: string;
    total_earning: number;
    withdraw_earning: number;
    staking_rate: number;
    total_staked: number;
    total_balance: number;
    status: string;
  };
  history: {
    reward_history: {
      date: string;
      type: string;
      amount: number;
    }[];

    stmxv2_history: {
      date: string;
      type: string;
      unstaked_amount: number;
      recieved_amount: number;
      penalized_amount: number;
      wallet_address: string;
    }[];
  };
}

export interface Ath {
  staking: {
    token_type: string;
    total_earning: number;
    withdraw_earning: number;
    staking_rate: number;
    total_staked: number;
    total_balance: number;
    status: string;
  };
  history: {
    ath_history: { date: string; type: string; amount: number }[];
    reward_history: {
      date: string;
      type: string;
      amount: number;
    }[];
  };
}

export interface UsersChangesList {
  audits: {
    id: string;
    action: string;
    field: string;
    data: {
      congratsRewardsMemberShown: boolean;
    };
    caller: string;
    ip: string;
    country: string;
    ua: string;
    note: string;
    date: string;
  }[];
  total_users: number;
}

export interface UsersChangesFilter {
  action: string[];
  caller: string[];
}
