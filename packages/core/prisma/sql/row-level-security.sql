-- Enable Row Level Security
ALTER TABLE "shop" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "variant" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "option" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "option_value" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE variant_option_value ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE product_option ENABLE ROW LEVEL SECURITY;

-- Force Row Level Security for table owners
ALTER TABLE "shop" FORCE ROW LEVEL SECURITY;
ALTER TABLE "product" FORCE ROW LEVEL SECURITY;
ALTER TABLE "variant" FORCE ROW LEVEL SECURITY;
ALTER TABLE "option" FORCE ROW LEVEL SECURITY;
ALTER TABLE "option_value" FORCE ROW LEVEL SECURITY;

-- Create row security policies
CREATE POLICY shop_access_policy ON shop USING (id = current_setting('app.current_company_id', TRUE)::uuid);
CREATE POLICY product_access_policy ON product USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY variant_access_policy ON variant USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY option_access_policy ON option USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY option_value_access_policy ON option_value USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);


-- CREATE POLICY tenant_isolation_policy ON "Company" USING ("id" = current_setting('app.current_company_id', TRUE)::uuid);
-- CREATE POLICY tenant_isolation_policy ON "User" USING ("companyId" = current_setting('app.current_company_id', TRUE)::uuid);
-- CREATE POLICY tenant_isolation_policy ON "Project" USING ("companyId" = current_setting('app.current_company_id', TRUE)::uuid);
-- CREATE POLICY tenant_isolation_policy ON "Task" USING ("companyId" = current_setting('app.current_company_id', TRUE)::uuid);
